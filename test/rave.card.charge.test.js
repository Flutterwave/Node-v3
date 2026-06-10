const test = require('node:test');
const assert = require('node:assert/strict');
const { mock } = require('node:test');

const Charge = require('../lib/rave.charge');
const Base = require('../lib/rave.base');

require('dotenv').config();

const publicKey = process.env.PUBLIC_KEY;
const secretKey = process.env.SECRET_KEY;
const encryptionKey = process.env.ENCRYPTION_KEY;

test('invalid expiry month should throw', async () => {
  const ravebase = new Base(publicKey, secretKey);

  const requestMock = mock.method(ravebase, 'request', async () => ({
    body: { status: 'success' },
  }));

  const chargeInstance = new Charge(ravebase);

  const cardPayload = {
    enckey: encryptionKey,
    card_number: '5531886652142950',
    cvv: '564',
    expiry_month: '13',
    expiry_year: '32',
    currency: 'NGN',
    amount: '5000',
    email: 'user@example.com',
    tx_ref: 'MC-12345',
    phone_number: '12332232322',
  };

  await assert.rejects(
    () => chargeInstance.card(cardPayload),
    /Invalid expiry month/,
  );

  assert.equal(requestMock.mock.callCount(), 0);

  requestMock.mock.restore();
});

test('card should be successfully charged', async () => {
  const ravebase = new Base(publicKey, secretKey);

  const requestMock = mock.method(ravebase, 'request', async () => ({
    body: { status: 'success' },
  }));

  const chargeInstance = new Charge(ravebase);

  const cardPayload = {
    enckey: encryptionKey,
    card_number: '5531886652142950',
    cvv: '564',
    expiry_month: '11',
    expiry_year: '32',
    currency: 'NGN',
    amount: '5000',
    email: 'user@example.com',
    tx_ref: 'MC-12345',
    phone_number: '12332232322',
  };

  const resp = await chargeInstance.card(cardPayload);

  assert.equal(requestMock.mock.callCount(), 1);
  assert.equal(resp.status, 'success');

  requestMock.mock.restore();
});

test('invalid phone number should throw', async () => {
  const ravebase = new Base(publicKey, secretKey);

  const requestMock = mock.method(ravebase, 'request', async () => ({
    body: { status: 'success' },
  }));

  const chargeInstance = new Charge(ravebase);

  const cardPayload = {
    enckey: encryptionKey,
    card_number: '5531886652142950',
    cvv: '564',
    expiry_month: '11',
    expiry_year: '32',
    currency: 'NGN',
    amount: '5000',
    email: 'user@example.com',
    tx_ref: 'MC-12345',
    phone_number: 'fretrttrtrtgt',
  };

  await assert.rejects(
    () => chargeInstance.card(cardPayload),
    /phone number should be digits/,
  );

  assert.equal(requestMock.mock.callCount(), 0);

  requestMock.mock.restore();
});
