var transactions = require('../lib/rave.transactions');
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


describe('#Rave Transactions Coverage', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let trxInstance;

  beforeEach(() => {
    trxInstance = new transactions(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should successfully verify a payment', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: { // SDK service files often destructure { body }
        status: 'success',
        message: 'Transaction fetched successfully',
        data: { id: 4186265, status: 'successful' }
      }
    });

    const payload = { id: 4186265 };
    const resp = await trxInstance.verify(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Transaction fetched successfully');
});
  
  it('should successfully verify a payment by tx_ref (Covers 100% of rave.verify-by-txref.js)', async function () {
    this.timeout(10000);

    const verifyTransactionbyTxStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Transaction fetched successfully',
        data: {
          id: 8415006,
          tx_ref: 'txref-DI0NzMx13',
          status: 'successful'
        }
      }
    });

    const payload = {
      tx_ref: 'txref-DI0NzMx13',
    };

    const resp = await trxInstance.verify_by_tx(payload);

    expect(verifyTransactionbyTxStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp.data).to.have.property('tx_ref', "txref-DI0NzMx13");
  });

  it('should successfully return transaction events', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Transaction events fetched',
        data: [{ note: 'Transaction Completed!', action: 'completion' }]
      }
    });

    const payload = { id: 4417681 };
    const resp = await trxInstance.event(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.data[0]).to.have.property('note');
  });

  it('should successfully return transaction fee', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charged fee',
        data: { charge_amount: 1000, fee: 14 }
      }
    });

    const payload = { amount: 1000, currency: "NGN" };
    const resp = await trxInstance.fee(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.data).to.have.property('fee', 14);
  });
  
  it('should successfully initiate a refund (Covers rave.refund.js)', async function () {
    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Refund processed',
        data: { id: '12345', amount: 1000, status: 'completed' }
      }
    });

    const payload = {
      id: '4186265',
      amount: 1000
    };

    const resp = await trxInstance.refund(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
  });

  it('should successfully resend webhooks (Covers rave.resend-hooks.js)', async function () {
    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Hook resent successfully'
      }
    });

    const payload = { id: 4186265 };
    const resp = await trxInstance.resend_hooks(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Hook resent successfully');

  });

  it('should successfully retrieve all transactions (Covers rave.retrieve.js)', async function () {
    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Transactions fetched',
        data: [{ id: 1 }, { id: 2 }],
        meta: { page_info: { total: 2 } }
      }
    });

    const payload = {
      from: '2023-01-01',
      to: '2023-01-31',
      page: '1'
    };

    const resp = await trxInstance.fetch(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Transactions fetched');


  });
});