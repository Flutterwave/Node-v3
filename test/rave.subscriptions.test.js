const Subscriptions = require('../lib/rave.subscriptions');
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

describe('#Rave Subscriptions Coverage', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;

  let ravebase;
  let subscriptionInstance;

  beforeEach(() => {
    // Fresh instantiation to ensure clean coverage state
    ravebase = new base(public_key, secret_key);
    subscriptionInstance = new Subscriptions(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should successfully retrieve all subscriptions', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Subscriptions fetched',
        data: [{ id: 11343, status: 'active' }]
      }
    });

    const resp = await subscriptionInstance.fetch_all();

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.status).to.equal('success');
  });

  it('should successfully retrieve a single subscription', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        data: [{ id: 11343, email: 'test@flutterwavego.com' }]
      }
    });

    const payload = { email: 'test@flutterwavego.com' };
    const resp = await subscriptionInstance.get(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.status).to.equal('success');
  });
  
  it('should successfully cancel a subscription', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Subscription cancelled'
      }
    });

    const payload = { id: '11343' }; 
    const resp = await subscriptionInstance.cancel(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.message).to.equal('Subscription cancelled');
  });

  it('should successfully activate a subscription', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Subscription activated'
      }
    });

    const payload = { id: '11343' };
    const resp = await subscriptionInstance.activate(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.status).to.equal('success');
  });
});

