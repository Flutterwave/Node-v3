var charge = require('../lib/rave.charge');
var base = require('../lib/rave.base');

var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

var dotenv = require('dotenv').config();

const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('#Rave charge', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const encryption_key = process.env.ENCRYPTION_KEY;

  const ravebase = new base(public_key, secret_key);

  let chargeInstance;
  let chargeStub;

  beforeEach(() => {
    chargeInstance = new charge(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Test To Check Expiry Monnth', async function () {
    const requestStub = sinon.stub(ravebase, 'request').resolves({ body: { status: 'success' } });
    const cardPayload = {
      enckey: encryption_key,
      card_number: '5531886652142950',
      cvv: '564',
      expiry_month: '13',
      expiry_year: '32',
      currency: 'NGN',
      amount: '5000',
      email: 'user@example.com',
      tx_ref: 'MC-12345'
    };
    await expect(chargeInstance.card(cardPayload)).to.be.rejectedWith("Invalid expiry month");
    expect(requestStub).to.not.have.been.called;
  });

  it('card charge should successfully reach the return statement with valid digits', async function () {
    const requestStub = sinon.stub(ravebase, 'request').resolves({ body: { status: 'success' } });
    const cardPayload = {
      enckey: encryption_key,
      card_number: '5531886652142950',
      cvv: '564',
      expiry_month: '11',
      expiry_year: '32',
      currency: 'NGN',
      amount: '5000',
      email: 'user@example.com',
      tx_ref: 'MC-12345',
      phone_number: "12332232322"
    };
    const resp = await chargeInstance.card(cardPayload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
  });
  
  it('Test To ensure phone number is a digit', async function () {
    const requestStub = sinon.stub(ravebase, 'request').resolves({ body: { status: 'success' } });
    const cardPayload = {
      enckey: encryption_key,
      card_number: '5531886652142950',
      cvv: '564',
      expiry_month: '11',
      expiry_year: '32',
      currency: 'NGN',
      amount: '5000',
      email: 'user@example.com',
      tx_ref: 'MC-12345',
      phone_number: "fretrttrtrtgt"
    };
    await expect(chargeInstance.card(cardPayload)).to.be.rejectedWith("phone number should be digits");
    expect(requestStub).to.not.have.been.called;
  });

  it('should successfully encrypt and charge a card', async function () {
    this.timeout(10000);

    // We stub the request engine
    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        meta: { authorization: { mode: 'pin' } }
      }
    });

    //Raw card data (not encrypted yet)
    const cardPayload = {
      enckey: 'FLWSECK_TEST742327c04be9',
      card_number: '5531886652142950',
      cvv: '564',
      expiry_month: '09',
      expiry_year: '32',
      currency: 'NGN',
      amount: '5000',
      email: 'user@example.com',
      tx_ref: 'MC-12345'
    };

    const resp = await chargeInstance.card(cardPayload);

    // THE SECURITY VERIFICATION:
    // We check that the stub was called with an encrypted "client" string
    // instead of the raw card number.
    expect(requestStub).to.have.been.calledOnce;

    const callArgs = requestStub.firstCall.args[1];
    expect(callArgs).to.have.property('client');
    expect(callArgs.client).to.be.a('string');
    
    // If it's encrypted, it shouldn't contain the raw card number
    expect(callArgs.client).to.not.contain(cardPayload.card_number);

    expect(resp.status).to.equal('success');
  });
});