'use strict';

/**
 * SDK Telemetry Logger
 *
 * Sends structured events to the SigNoz ingestion service using Node's built-in
 * `https` module — no third-party HTTP dependency required.
 *
 * Identity resolution order:
 *   1. In-memory cache (_appId already set)
 *   2. Disk cache (.flw_sdk.json keyed by hashed public key)
 *   3. Flutterwave mercinfo endpoint → resolves merchant name as client_id
 *   4. app.created POST → ingestion service returns app_id
 *
 * Event lifecycle:
 *   1. init(publicKey, libraryVersion)  → resolves identity then fires app.created once
 *   2. logRequest(method, path)         → fires request.sent
 *   3. logError(code, message)          → fires app.error
 *   4. logTransaction(ref, currency, amount, fee, method, status)
 *      → fires app.transaction — production only, deduplicated by tx_ref
 */

const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const os = require('os');
const path = require('path');
const packageJson = require('../package.json');

// ─── Config ───────────────────────────────────────────────────────────────────

const INGESTION_HOST = 'signozservice-prod.f4b-flutterwave.com';
const INGESTION_PATH = '/events';
const MERCINFO_HOST = 'api.ravepay.co';
const MERCINFO_PATH = '/flwv3-pug/getpaidx/api/mercinfo';
const API_KEY =
  process.env.SIGNOZ_API_KEY || 'IuUnO5cwI6Ta1JO/LEFUsMyz1AH3FNzW';
const LIBRARY = 'Node.js';
const DEFAULT_LIBRARY_VERSION = packageJson.version || '1.0.0';
const STORE_PATH =
  process.env.FLW_SDK_STATE_PATH || path.join(os.tmpdir(), '.flw_sdk.json');

// ─── Internal state ───────────────────────────────────────────────────────────

let _appId = null;
let _initPromise = null;
let _environment = 'sandbox';
const _loggedTransactions = new Set();

// ─── Disk cache ───────────────────────────────────────────────────────────────

function _keyHash(publicKey) {
  return crypto
    .createHash('sha256')
    .update(publicKey)
    .digest('hex')
    .slice(0, 16);
}

function _readStore() {
  try {
    return JSON.parse(fs.readFileSync(STORE_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function _writeStore(store) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
  } catch {
    // Non-fatal — SDK still works without disk persistence
  }
}

function _loadAppId(publicKey) {
  const store = _readStore();
  return store[_keyHash(publicKey)]?.app_id || null;
}

function _saveAppId(publicKey, appId) {
  const store = _readStore();
  store[_keyHash(publicKey)] = {
    app_id: appId,
    saved_at: new Date().toISOString(),
  };
  _writeStore(store);
}

// ─── Mercinfo identity resolution ─────────────────────────────────────────────

/**
 * Fetch the merchant name from the Flutterwave mercinfo endpoint.
 * Used as client_id in the app.created payload so SigNoz can associate
 * the integration with a human-readable account name.
 *
 * Returns null on any failure — the app.created call proceeds without it.
 */
function _fetchMerchantName(publicKey) {
  return new Promise((resolve) => {
    const query = `PBFPubKey=${encodeURIComponent(publicKey)}`;
    const options = {
      hostname: MERCINFO_HOST,
      path: `${MERCINFO_PATH}?${query}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', (chunk) => (raw += chunk));
      res.on('end', () => {
        try {
          const data = JSON.parse(raw);
          // console.log(
          //   '[telemetry] mercinfo response:',
          //   JSON.stringify(data, null, 2),
          // );
          const name = data?.mn || null;
          resolve(name ? _sanitiseIdentifier(String(name)) : null);
        } catch {
          // console.log('[telemetry] mercinfo failed to parse response:', raw);
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(null);
    });
    req.end();
  });
}

// ─── Core HTTP sender ─────────────────────────────────────────────────────────

function _post(eventPayload) {
  return new Promise((resolve) => {
    const body = JSON.stringify(eventPayload);

    const options = {
      hostname: INGESTION_HOST,
      path: INGESTION_PATH,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'x-api-key': API_KEY,
      },
    };

    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', (chunk) => (raw += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(raw));
        } catch {
          resolve({});
        }
      });
    });

    req.on('error', () => resolve({}));
    req.write(body);
    req.end();
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function _resolveEnvironment(publicKey) {
  if (!publicKey) return 'sandbox';
  return publicKey.startsWith('FLWPUBK_TEST-') ? 'sandbox' : 'production';
}

function _sanitiseIdentifier(value) {
  if (!value) return null;
  return value
    .trim()
    .replace(/\s+/g, '_') // whitespace runs → underscore
    .replace(/[^a-zA-Z0-9_-]/g, '_') // anything non-safe → underscore
    .replace(/^_+|_+$/g, ''); // strip leading/trailing underscores
}

function _generateRef() {
  try {
    return crypto.randomUUID();
  } catch {
    return `ref-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

function init(publicKey, libraryVersion = DEFAULT_LIBRARY_VERSION) {
  // Guard 1: already initialised in this process
  if (_initPromise) return _initPromise;

  _environment = _resolveEnvironment(publicKey);

  // Guard 2: app_id already cached on disk for this public key
  const stored = _loadAppId(publicKey);
  if (stored) {
    _appId = stored;
    _initPromise = Promise.resolve();
    return _initPromise;
  }

  // Resolve merchant name from mercinfo then fire app.created
  _initPromise = _fetchMerchantName(publicKey)
    .then((merchantName) => {
      return _post({
        name: 'app.created',
        data: {
          client_id: null, // human-readable account name, null if mercinfo fails
          public_key: merchantName,
          library: LIBRARY,
          library_version: libraryVersion,
        },
        timestamp: new Date().toISOString(),
      });
    })
    .then((responseData) => {
      if (responseData && responseData.app_id) {
        _appId = responseData.app_id;
        _saveAppId(publicKey, responseData.app_id);
      }
    });

  return _initPromise;
}

async function logRequest(
  method,
  path,
  apiVersion = 'v3',
  libraryVersion = DEFAULT_LIBRARY_VERSION,
) {
  await _initPromise;
  if (!_appId) return;

  await _post({
    name: 'request.sent',
    data: {
      app_id: _appId,
      environment: _environment,
      api_version: apiVersion,
      library_version: libraryVersion,
      method,
      reference: _generateRef(),
      path,
    },
    timestamp: new Date().toISOString(),
  });
}

async function logError(
  errorCode,
  errorMessage,
  libraryVersion = DEFAULT_LIBRARY_VERSION,
) {
  await _initPromise;
  if (!_appId) return;

  await _post({
    name: 'app.error',
    data: {
      app_id: _appId,
      library: LIBRARY,
      library_version: libraryVersion,
      error_code: String(errorCode),
      error_message: String(errorMessage),
    },
    timestamp: new Date().toISOString(),
  });
}

async function logTransaction(
  reference,
  currency,
  amount,
  fee,
  method,
  status,
) {
  // Environment and status guards fire before any async work
  if (_environment !== 'production') return;
  if (!status || status.toLowerCase() !== 'success') return;
  if (!reference || _loggedTransactions.has(reference)) return;

  _loggedTransactions.add(reference);

  await _initPromise;
  if (!_appId) return;

  await _post({
    name: 'app.transaction',
    data: {
      app_id: _appId,
      reference,
      currency,
      amount,
      fee,
      method,
    },
    timestamp: new Date().toISOString(),
  });
}

module.exports = { init, logRequest, logError, logTransaction };
