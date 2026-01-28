var misc = require('../lib/rave.misc');
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

describe('#Rave Misc Coverage', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;

  let ravebase;
  let miscInstance;

  beforeEach(() => {
    // Fresh instantiation to ensure clean coverage metrics
    ravebase = new base(public_key, secret_key);
    miscInstance = new misc(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });


  it('should successfully resolve bank account (Covers rave.verify.account.js)', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        data: { account_name: 'Pastor Bright' }
      }
    });

    const payload = { account_number: '0690000032', account_bank: '044' };
    const resp = await miscInstance.verify_Account(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.data.account_name).to.equal('Pastor Bright');
  });

  it('should successfully fetch balance by currency (Covers rave.bal.currency.js)', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        data: { currency: 'NGN', available_balance: 1000 }
      }
    });

    const payload = { currency: 'NGN' };
    const resp = await miscInstance.bal_currency(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.status).to.equal('success');
  });

  it('should successfully verify BVN consent (Covers rave.verifybvn.js)', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Bvn details fetched',
        data: { reference: 'FLW71DC60942' }
      }
    });

    const payload = {
      reference: "FLW71DC60942"
    };

    const resp = await miscInstance.verifybvn(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
  });

  it('should successfully fetch all wallet balances (Covers rave.bal.js)', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        data: [{ currency: 'NGN', available_balance: 2000 }]
      }
    });

    // Passing an empty object to satisfy handleEmptyFetch(data, ...)
    const resp = await miscInstance.bal({});

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.data[0]).to.have.property('currency', 'NGN');
  });
  
  it('should successfully initiate BVN consent (Covers 100% of rave.bvn.js)', async function () {
    this.timeout(10000);

    const initiateBVNStub = sinon.stub(ravebase, 'request').resolves({
      // CRITICAL: The service destructures { body }, so the stub MUST have it
      body: {
        status: 'success',
        message: 'Bvn verification initiated',
        data: {
          url: 'https://nibss-bvn-consent.flutterwave.com/cms/BvnConsent?session=MWNkNDI4ZWY',
          reference: 'FLW71DC60942BAD76D2BD5B4E'
        }
      }
    });

    // Ensure payload matches initiateBVNSchema requirements
    const payload = {
      bvn: "12347832211",
      firstname: "Lyra",
      lastname: "Balacqua",
      redirect_url: "https://example-url.company.com"
    };

    const resp = await miscInstance.bvn(payload);

    expect(initiateBVNStub).to.have.been.calledOnce;

    // Asserting on resp directly proves the code reached the 'return response' line
    expect(resp).to.have.property('status', 'success');
    expect(resp.data).to.have.property('reference');
  });
});
