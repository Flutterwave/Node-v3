'use strict';

/**
 * Telemetry test suite
 *
 * Because the logger module holds singleton state (_appId, _initPromise,
 * _environment, _loggedTransactions), every test that exercises the logger
 * directly must flush the module cache before and after to prevent state
 * leaking between tests.
 *
 * Tests that only mock telemetry.logTransaction at the service level (verify
 * tests) do not need cache busting because they never touch logger internals.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { mock } = require('node:test');
const EventEmitter = require('node:events');

const Base = require('../lib/rave.base');
const Transactions = require('../lib/rave.transactions');

require('dotenv').config();

const TEST_PUBLIC_KEY = process.env.PUBLIC_KEY || 'FLWPUBK_TEST-xxxxxxxxxxxx-X';
const LIVE_PUBLIC_KEY = process.env.LIVE_PUBLIC_KEY || 'FLWPUBK-xxxxxxxxxxxx-X';
const SECRET_KEY = process.env.SECRET_KEY || 'FLWSECK_TEST-xxxxxxxxxxxx-X';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const LOGGER_PATH = require.resolve('../utils/logger');
const VERIFY_PATH = require.resolve('../services/transactions/rave.verify');
const VERIFY_TX_PATH = require.resolve(
  '../services/transactions/rave.verify-by-txref',
);
const TRANSACTIONS_PATH = require.resolve('../lib/rave.transactions');

function freshLogger() {
  delete require.cache[LOGGER_PATH];
  return require('../utils/logger');
}

function flushLogger() {
  delete require.cache[LOGGER_PATH];
}

/**
 * Builds a minimal https.request mock that simulates a successful ingestion
 * response. Returns { mock: mockRef, calls: [] } so tests can inspect
 * how many times _post was called and with what payloads.
 *
 * The mock satisfies the response stream contract that _post relies on:
 *   res.on('data', ...) and res.on('end', ...).
 */
function makeHttpsMock(
  t,
  responseBody = { status: 'event received', app_id: 'mock-app-id' },
) {
  const https = require('https');
  const calls = [];

  const httpsMock = t.mock.method(https, 'request', (options, cb) => {
    calls.push({ options, body: '' });

    const res = new EventEmitter();
    res.statusCode = 200;

    // Defer emissions so req.write/req.end complete first
    setTimeout(() => {
      res.emit('data', JSON.stringify(responseBody));
      res.emit('end');
    }, 0);

    if (cb) cb(res);

    const req = new EventEmitter();
    req.write = (chunk) => {
      calls[calls.length - 1].body = chunk;
    };
    req.end = () => {};
    return req;
  });

  return { httpsMock, calls };
}

/**
 * Shared verify response factory.
 * txStatus controls response.data.status ('successful' | 'pending' | 'failed').
 */
function buildVerifyResponse(txStatus = 'successful') {
  return {
    status: 'success',
    message: 'Transaction fetched',
    data: {
      id: 123456,
      tx_ref: 'MC-1585230950508',
      flw_ref: 'FLW-MOCK-REF',
      status: txStatus,
      amount: 1500,
      currency: 'NGN',
      app_fee: 43.05,
      payment_type: 'card',
    },
  };
}

// ─── Logger: init ─────────────────────────────────────────────────────────────

test('logger/init: resolves app_id from ingestion service response', async (t) => {
  const telemetry = freshLogger();
  const { httpsMock, calls } = makeHttpsMock(t);

  await telemetry.init(TEST_PUBLIC_KEY);

  // init must have fired exactly one POST
  assert.equal(httpsMock.mock.callCount(), 1);

  // The posted payload must be app.created
  const posted = JSON.parse(calls[0].body);
  assert.equal(posted.name, 'app.created');
  assert.equal(posted.data.public_key, TEST_PUBLIC_KEY);

  flushLogger();
});

test('logger/init: calling init twice only fires one POST', async (t) => {
  const telemetry = freshLogger();
  const { httpsMock } = makeHttpsMock(t);

  await telemetry.init(TEST_PUBLIC_KEY);
  await telemetry.init(TEST_PUBLIC_KEY); // second call — should be a no-op

  assert.equal(httpsMock.mock.callCount(), 1);

  flushLogger();
});

test('logger/init: sets environment to sandbox for test key', async (t) => {
  const telemetry = freshLogger();
  makeHttpsMock(t);

  await telemetry.init('FLWPUBK_TEST-abc123-X');

  // Confirm sandbox by attempting logTransaction — should not fire
  const https = require('https');
  const postMock = t.mock.method(https, 'request', () => {
    assert.fail('logTransaction should not POST in sandbox');
  });

  await telemetry.logTransaction('REF-001', 'NGN', 1000, 30, 'card', 'success');

  assert.equal(postMock.mock.callCount(), 0);
  flushLogger();
});

test('logger/init: sets environment to production for live key', async (t) => {
  const telemetry = freshLogger();
  const { httpsMock } = makeHttpsMock(t);

  await telemetry.init('FLWPUBK-abc123-X');

  // One POST for init. logTransaction will add another if env is production.
  await telemetry.logTransaction(
    'REF-PROD-001',
    'NGN',
    1000,
    30,
    'card',
    'success',
  );

  // init (1) + logTransaction (1) = 2
  assert.equal(httpsMock.mock.callCount(), 2);
  flushLogger();
});

// ─── Logger: logTransaction guards ───────────────────────────────────────────

test('logger/logTransaction: does not POST in sandbox environment', async (t) => {
  const telemetry = freshLogger();
  const { httpsMock } = makeHttpsMock(t);

  await telemetry.init(TEST_PUBLIC_KEY); // test key → sandbox
  const countAfterInit = httpsMock.mock.callCount(); // should be 1

  await telemetry.logTransaction(
    'REF-001',
    'NGN',
    1500,
    43.05,
    'card',
    'success',
  );

  // Count must not have increased beyond the init call
  assert.equal(httpsMock.mock.callCount(), countAfterInit);
  flushLogger();
});

test('logger/logTransaction: does not POST when status is error', async (t) => {
  const telemetry = freshLogger();
  const { httpsMock } = makeHttpsMock(t);

  await telemetry.init(LIVE_PUBLIC_KEY); // production
  const countAfterInit = httpsMock.mock.callCount();

  await telemetry.logTransaction(
    'REF-002',
    'NGN',
    1500,
    43.05,
    'card',
    'error',
  );

  assert.equal(httpsMock.mock.callCount(), countAfterInit);
  flushLogger();
});

test('logger/logTransaction: does not POST when status is pending', async (t) => {
  const telemetry = freshLogger();
  const { httpsMock } = makeHttpsMock(t);

  await telemetry.init(LIVE_PUBLIC_KEY);
  const countAfterInit = httpsMock.mock.callCount();

  await telemetry.logTransaction(
    'REF-003',
    'NGN',
    1500,
    43.05,
    'card',
    'pending',
  );

  assert.equal(httpsMock.mock.callCount(), countAfterInit);
  flushLogger();
});

test('logger/logTransaction: does not POST when status is omitted', async (t) => {
  const telemetry = freshLogger();
  const { httpsMock } = makeHttpsMock(t);

  await telemetry.init(LIVE_PUBLIC_KEY);
  const countAfterInit = httpsMock.mock.callCount();

  await telemetry.logTransaction('REF-004', 'NGN', 1500, 43.05, 'card', null);

  assert.equal(httpsMock.mock.callCount(), countAfterInit);
  flushLogger();
});

test('logger/logTransaction: POSTs correct payload in production with success status', async (t) => {
  const telemetry = freshLogger();
  const { httpsMock, calls } = makeHttpsMock(t);

  await telemetry.init(LIVE_PUBLIC_KEY);
  await telemetry.logTransaction(
    'REF-005',
    'NGN',
    1500,
    43.05,
    'card',
    'success',
  );

  // calls[0] = init POST, calls[1] = logTransaction POST
  assert.equal(httpsMock.mock.callCount(), 2);

  const posted = JSON.parse(calls[1].body);
  assert.equal(posted.name, 'app.transaction');
  assert.equal(posted.data.reference, 'REF-005');
  assert.equal(posted.data.currency, 'NGN');
  assert.equal(posted.data.amount, 1500);
  assert.equal(posted.data.fee, 43.05);
  assert.equal(posted.data.method, 'card');
  assert.equal(posted.data.app_id, 'mock-app-id');

  flushLogger();
});

test('logger/logTransaction: deduplicates — same tx_ref only POSTs once', async (t) => {
  const telemetry = freshLogger();
  const { httpsMock } = makeHttpsMock(t);

  await telemetry.init(LIVE_PUBLIC_KEY);
  const countAfterInit = httpsMock.mock.callCount();

  await telemetry.logTransaction(
    'DEDUP-REF',
    'NGN',
    1500,
    43.05,
    'card',
    'success',
  );
  await telemetry.logTransaction(
    'DEDUP-REF',
    'NGN',
    1500,
    43.05,
    'card',
    'success',
  );

  // Only one logTransaction POST despite two calls
  assert.equal(httpsMock.mock.callCount(), countAfterInit + 1);
  flushLogger();
});

test('logger/logTransaction: different tx_refs each POST independently', async (t) => {
  const telemetry = freshLogger();
  const { httpsMock } = makeHttpsMock(t);

  await telemetry.init(LIVE_PUBLIC_KEY);
  const countAfterInit = httpsMock.mock.callCount();

  await telemetry.logTransaction(
    'REF-A',
    'NGN',
    1500,
    43.05,
    'card',
    'success',
  );
  await telemetry.logTransaction(
    'REF-B',
    'GHS',
    200,
    6.0,
    'mobilemoney',
    'success',
  );

  assert.equal(httpsMock.mock.callCount(), countAfterInit + 2);
  flushLogger();
});

// ─── Logger: logRequest ───────────────────────────────────────────────────────

test('logger/logRequest: does not POST when app_id is unresolved', async (t) => {
  const telemetry = freshLogger();

  // Mock returns no app_id — simulates unreachable ingestion service
  makeHttpsMock(t, { status: 'event received' });

  await telemetry.init(LIVE_PUBLIC_KEY);

  const https = require('https');
  const postMock = t.mock.method(https, 'request', () => {
    assert.fail('logRequest should not POST without a resolved app_id');
  });

  await telemetry.logRequest('POST', 'v3/charges?type=card');

  assert.equal(postMock.mock.callCount(), 0);
  flushLogger();
});

test('logger/logRequest: POSTs correct payload when app_id is resolved', async (t) => {
  const telemetry = freshLogger();
  const { httpsMock, calls } = makeHttpsMock(t);

  await telemetry.init(LIVE_PUBLIC_KEY);
  await telemetry.logRequest('POST', 'v3/charges?type=card');

  assert.equal(httpsMock.mock.callCount(), 2);

  const posted = JSON.parse(calls[1].body);
  assert.equal(posted.name, 'request.sent');
  assert.equal(posted.data.method, 'POST');
  assert.equal(posted.data.path, 'v3/charges?type=card');
  assert.equal(posted.data.app_id, 'mock-app-id');
  assert.ok(posted.data.reference); // generated reference must be present
  assert.ok(posted.timestamp);

  flushLogger();
});

// ─── Logger: logError ─────────────────────────────────────────────────────────

test('logger/logError: POSTs correct payload when app_id is resolved', async (t) => {
  const telemetry = freshLogger();
  const { httpsMock, calls } = makeHttpsMock(t);

  await telemetry.init(LIVE_PUBLIC_KEY);
  await telemetry.logError('INVALID_CARD', 'Card number is invalid');

  assert.equal(httpsMock.mock.callCount(), 2);

  const posted = JSON.parse(calls[1].body);
  assert.equal(posted.name, 'app.error');
  assert.equal(posted.data.error_code, 'INVALID_CARD');
  assert.equal(posted.data.error_message, 'Card number is invalid');
  assert.equal(posted.data.app_id, 'mock-app-id');

  flushLogger();
});

test('logger/logError: does not POST when app_id is unresolved', async (t) => {
  const telemetry = freshLogger();
  makeHttpsMock(t, { status: 'event received' }); // no app_id in response

  await telemetry.init(LIVE_PUBLIC_KEY);

  const https = require('https');
  const postMock = t.mock.method(https, 'request', () => {
    assert.fail('logError should not POST without a resolved app_id');
  });

  await telemetry.logError('ERR_CODE', 'Something went wrong');

  assert.equal(postMock.mock.callCount(), 0);
  flushLogger();
});

// ─── Verify service ───────────────────────────────────────────────────────────

test('verify: calls correct endpoint with transaction id', async () => {
  const ravebase = new Base(TEST_PUBLIC_KEY, SECRET_KEY);

  const requestMock = mock.method(ravebase, 'request', async () => ({
    body: buildVerifyResponse('successful'),
  }));

  const txInstance = new Transactions(ravebase);
  const resp = await txInstance.verify({ id: 123456 });

  assert.equal(requestMock.mock.callCount(), 1);
  const [path] = requestMock.mock.calls[0].arguments;
  assert.match(path, /v3\/transactions\/123456\/verify/);
  assert.equal(resp.status, 'success');

  requestMock.mock.restore();
});

test('verify: throws when id is missing', async () => {
  const ravebase = new Base(TEST_PUBLIC_KEY, SECRET_KEY);

  const requestMock = mock.method(ravebase, 'request', async () => ({
    body: buildVerifyResponse(),
  }));

  const txInstance = new Transactions(ravebase);

  await assert.rejects(() => txInstance.verify({}), /id/);

  assert.equal(requestMock.mock.callCount(), 0);
  requestMock.mock.restore();
});

test('verify: calls logTransaction with correct args when transaction is successful', async (t) => {
  // Flush the entire require chain so all three modules share the same logger instance
  delete require.cache[TRANSACTIONS_PATH];
  delete require.cache[VERIFY_PATH];
  delete require.cache[LOGGER_PATH];

  const telemetry = require('../utils/logger');
  const logTxMock = t.mock.method(telemetry, 'logTransaction', async () => {});

  const FreshTransactions = require('../lib/rave.transactions');
  const ravebase = new Base(TEST_PUBLIC_KEY, SECRET_KEY);
  const requestMock = mock.method(ravebase, 'request', async () => ({
    body: buildVerifyResponse('successful'),
  }));

  const txInstance = new FreshTransactions(ravebase);
  await txInstance.verify({ id: 123456 });

  assert.equal(logTxMock.mock.callCount(), 1);

  const [ref, currency, amount, fee, paymentType, status] =
    logTxMock.mock.calls[0].arguments;

  assert.equal(ref, 'MC-1585230950508');
  assert.equal(currency, 'NGN');
  assert.equal(amount, 1500);
  assert.equal(fee, 43.05);
  assert.equal(paymentType, 'card');
  assert.equal(status, 'success');

  requestMock.mock.restore();

  // Restore cache state so subsequent tests get clean modules
  delete require.cache[TRANSACTIONS_PATH];
  delete require.cache[VERIFY_PATH];
  delete require.cache[LOGGER_PATH];
});

test('verify: does not call logTransaction when data.status is pending', async (t) => {
  const telemetry = require('../utils/logger');
  const logTxMock = t.mock.method(telemetry, 'logTransaction', async () => {});

  const ravebase = new Base(TEST_PUBLIC_KEY, SECRET_KEY);
  const requestMock = mock.method(ravebase, 'request', async () => ({
    body: buildVerifyResponse('pending'),
  }));

  const txInstance = new Transactions(ravebase);
  const resp = await txInstance.verify({ id: 123456 });

  assert.equal(resp.data.status, 'pending');
  assert.equal(logTxMock.mock.callCount(), 0);

  requestMock.mock.restore();
});

test('verify: does not call logTransaction when data.status is failed', async (t) => {
  const telemetry = require('../utils/logger');
  const logTxMock = t.mock.method(telemetry, 'logTransaction', async () => {});

  const ravebase = new Base(TEST_PUBLIC_KEY, SECRET_KEY);
  const requestMock = mock.method(ravebase, 'request', async () => ({
    body: buildVerifyResponse('failed'),
  }));

  const txInstance = new Transactions(ravebase);
  await txInstance.verify({ id: 123456 });

  assert.equal(logTxMock.mock.callCount(), 0);

  requestMock.mock.restore();
});

// ─── Verify by tx_ref service ─────────────────────────────────────────────────

test('verify_by_tx: calls correct endpoint with tx_ref', async () => {
  const ravebase = new Base(TEST_PUBLIC_KEY, SECRET_KEY);

  const requestMock = mock.method(ravebase, 'request', async () => ({
    body: buildVerifyResponse('successful'),
  }));

  const txInstance = new Transactions(ravebase);
  await txInstance.verify_by_tx({ tx_ref: 'MC-1585230950508' });

  assert.equal(requestMock.mock.callCount(), 1);
  const [path] = requestMock.mock.calls[0].arguments;
  assert.match(path, /verify_by_reference/);
  assert.match(path, /MC-1585230950508/);

  requestMock.mock.restore();
});

test('verify_by_tx: calls logTransaction with correct args when transaction is successful', async (t) => {
  delete require.cache[TRANSACTIONS_PATH];
  delete require.cache[VERIFY_TX_PATH];
  delete require.cache[LOGGER_PATH];

  const telemetry = require('../utils/logger');
  const logTxMock = t.mock.method(telemetry, 'logTransaction', async () => {});

  const FreshTransactions = require('../lib/rave.transactions');
  const ravebase = new Base(TEST_PUBLIC_KEY, SECRET_KEY);
  const requestMock = mock.method(ravebase, 'request', async () => ({
    body: buildVerifyResponse('successful'),
  }));

  const txInstance = new FreshTransactions(ravebase);
  await txInstance.verify_by_tx({ tx_ref: 'MC-1585230950508' });

  assert.equal(logTxMock.mock.callCount(), 1);

  const [ref, currency, amount, fee, paymentType, status] =
    logTxMock.mock.calls[0].arguments;

  assert.equal(ref, 'MC-1585230950508');
  assert.equal(currency, 'NGN');
  assert.equal(amount, 1500);
  assert.equal(fee, 43.05);
  assert.equal(paymentType, 'card');
  assert.equal(status, 'success');

  requestMock.mock.restore();

  delete require.cache[TRANSACTIONS_PATH];
  delete require.cache[VERIFY_TX_PATH];
  delete require.cache[LOGGER_PATH];
});

test('verify_by_tx: does not call logTransaction when data.status is pending', async (t) => {
  const telemetry = require('../utils/logger');
  const logTxMock = t.mock.method(telemetry, 'logTransaction', async () => {});

  const ravebase = new Base(TEST_PUBLIC_KEY, SECRET_KEY);
  const requestMock = mock.method(ravebase, 'request', async () => ({
    body: buildVerifyResponse('pending'),
  }));

  const txInstance = new Transactions(ravebase);
  await txInstance.verify_by_tx({ tx_ref: 'MC-1585230950508' });

  assert.equal(logTxMock.mock.callCount(), 0);

  requestMock.mock.restore();
});

test('verify_by_tx: does not call logTransaction when data.status is failed', async (t) => {
  const telemetry = require('../utils/logger');
  const logTxMock = t.mock.method(telemetry, 'logTransaction', async () => {});

  const ravebase = new Base(TEST_PUBLIC_KEY, SECRET_KEY);
  const requestMock = mock.method(ravebase, 'request', async () => ({
    body: buildVerifyResponse('failed'),
  }));

  const txInstance = new Transactions(ravebase);
  await txInstance.verify_by_tx({ tx_ref: 'MC-1585230950508' });

  assert.equal(logTxMock.mock.callCount(), 0);

  requestMock.mock.restore();
});
