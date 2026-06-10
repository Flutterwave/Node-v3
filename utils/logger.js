'use strict';

/**
 * SDK Telemetry Logger
 *
 * Sends structured events to the SigNoz ingestion service using Node's built-in
 * `https` module — no third-party HTTP dependency required.
 *
 * Event lifecycle:
 *   1. init(publicKey, libraryVersion)  → registers the integration, resolves app_id
 *   2. logRequest(method, path)         → fires `request.sent`
 *   3. logError(code, message)          → fires `app.error`
 *   4. logTransaction(ref, currency, amount, fee, method, status) → fires `app.transaction`
 *      — only in production, only for successful transactions, deduplicated by tx_ref
 */

const https = require('https');
const packageJson = require('../package.json');

// ─── Config ───────────────────────────────────────────────────────────────────

const INGESTION_HOST = 'signozservice-prod.f4b-flutterwave.com';
const INGESTION_PATH = '/events';
const API_KEY =
  process.env.SIGNOZ_API_KEY || 'IuUnO5cwI6Ta1JO/LEFUsMyz1AH3FNzW';
const LIBRARY = 'Node.js';
const DEFAULT_LIBRARY_VERSION = packageJson.version || '1.0.0';

// ─── Internal state ───────────────────────────────────────────────────────────

let _appId = null;
let _initPromise = null;
let _environment = 'sandbox';
const _loggedTransactions = new Set();

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

function _generateRef() {
  try {
    const { randomUUID } = require('crypto');
    return randomUUID();
  } catch {
    return `ref-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

function init(publicKey, libraryVersion = DEFAULT_LIBRARY_VERSION) {
  if (_initPromise) return _initPromise;

  _environment = _resolveEnvironment(publicKey);

  _initPromise = _post({
    name: 'app.created',
    data: {
      client_id: null,
      public_key: publicKey,
      library: LIBRARY,
      library_version: libraryVersion,
    },
    timestamp: new Date().toISOString(),
  }).then((responseData) => {
    if (responseData && responseData.app_id) {
      _appId = responseData.app_id;
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
