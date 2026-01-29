const PaymentPlan = require('../lib/rave.payment_plan');
var base = require('../lib/rave.base');

// var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

var dotenv = require('dotenv').config();

const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('#Rave Payment-plan Coverage', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;

  let ravebase;
  let paymentPlanInstance;

  beforeEach(() => {
    ravebase = new base(public_key, secret_key);
    paymentPlanInstance = new PaymentPlan(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a payment plan (Covers rave.create.js)', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: { // SDK services destructure { body }
        status: 'success',
        message: 'Payment plan created',
        data: { id: 52045, status: 'active' }
      }
    });

    const payload = {
      amount: "100",
      name: "SDK test Plan",
      interval: "monthly"
    };

    const resp = await paymentPlanInstance.create(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.status).to.equal('success');
  });

  it('should update a payment plan (Covers rave.update.js)', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Payment plan updated',
        data: { id: 34185, status: 'active' }
      }
    });

    const payload = {
      id: "34185",
      name: "Updated Plan Name",
      status: "active"
    };

    const resp = await paymentPlanInstance.update(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.data).to.have.property('status', 'active');
  });

  it('should cancel a payment plan (Covers rave.cancel.js)', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Payment plan cancelled',
        data: { id: 34185, status: 'cancelled' }
      }
    });

    const payload = { id: "34185" };
    const resp = await paymentPlanInstance.cancel(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.message).to.equal('Payment plan cancelled');
  });
  
  it('should get a single payment plan (Covers rave.retrieve.js)', async function () {
    this.timeout(10000);

    const getAPaymentPlanStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Payment plan fetched',
        data: {
          id: 52045,
          name: 'SDK test Plan',
          status: 'active'
        }
      }
    });

    const payload = {
      id: "52045"
    };

    const resp = await paymentPlanInstance.get_plan(payload);

    expect(getAPaymentPlanStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp.data).to.have.property('id', 52045);
  });
  
  it('should get all payment plans (Covers rave.retrieve-all.js)', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Payment plans fetched',
        data: [{ id: 37829 }]
      }
    });

    const resp = await paymentPlanInstance.get_all({});
    expect(resp.status).to.equal('success');
  });
});