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

describe('#Rave Misc', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let miscInstance;
  let miscStub;

  beforeEach(() => {
    miscInstance = new misc(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return NGN balance', async function () {
    this.timeout(10000);

    const fetchSingleBalanceSuccessStub = sinon
      .stub(miscInstance, 'bal_currency')
      .resolves({
        body: {
          status: 'success',
          message: 'Wallet balance fetched',
          data: {
            currency: 'NGN',
            available_balance: 2168880,
            ledger_balance: 253125.82,
          },
        },
      });

    var payload = {
      currency: 'NGN',
    };

    var resp = await miscInstance.bal_currency(payload);

    expect(fetchSingleBalanceSuccessStub).to.have.been.calledOnce;
    expect(fetchSingleBalanceSuccessStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data).to.have.property('currency');
    expect(resp.body.data).to.have.property('available_balance');
    expect(resp.body.data).to.have.property('ledger_balance');
  });

  it('should return all wallet balances', async function () {
    this.timeout(10000);

    const fetchBalanceSuccessStub = sinon.stub(miscInstance, 'bal').resolves({
      body: {
        status: 'success',
        message: 'Wallet balances fetched',
        data: [
          {
            currency: 'NGN',
            available_balance: 2367840,
            ledger_balance: 253125.82,
          },
          {
            currency: 'KES',
            available_balance: 0,
            ledger_balance: 1226.72,
          },
          {
            currency: 'GHS',
            available_balance: 0,
            ledger_balance: 0,
          },
          {
            currency: 'USD',
            available_balance: 0,
            ledger_balance: 472.08,
          },
          {
            currency: 'EUR',
            available_balance: 0,
            ledger_balance: 0,
          },
          {
            currency: 'ZAR',
            available_balance: 0,
            ledger_balance: 0,
          },
          {
            currency: 'GBP',
            available_balance: 0,
            ledger_balance: 0,
          },
          {
            currency: 'TZS',
            available_balance: 0,
            ledger_balance: 0,
          },
          {
            currency: 'UGX',
            available_balance: 0,
            ledger_balance: 0,
          },
          {
            currency: 'RWF',
            available_balance: 0,
            ledger_balance: 5000,
          },
          {
            currency: 'ZMW',
            available_balance: 0,
            ledger_balance: 0,
          },
          {
            currency: 'INR',
            available_balance: 0,
            ledger_balance: 0,
          },
          {
            currency: 'XOF',
            available_balance: 0,
            ledger_balance: 0,
          },
          {
            currency: 'MUR',
            available_balance: 0,
            ledger_balance: 0,
          },
          {
            currency: 'ETB',
            available_balance: 0,
            ledger_balance: 0,
          },
        ],
      },
    });

    var resp = await miscInstance.bal();

    expect(fetchBalanceSuccessStub).to.have.been.calledOnce;

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data[0]).to.have.property('currency');
    expect(resp.body.data[0]).to.have.property('available_balance');
    expect(resp.body.data[0]).to.have.property('ledger_balance');
  });

  it('should initiate BVN consent and return success message', async function () {
    this.timeout(10000);

    const resolveInitBVNSuccessStub = sinon.stub(miscInstance, 'bvn').resolves({
      body: {
        status: 'success',
        message: 'Bvn verification initiated',
        data: {
          url: 'https://nibss-bvn-consent-management.dev-flutterwave.com/cms/BvnConsent?session=MWNkNDI4ZWYtMjgwNy00ZjA1LWE5NzUtNzUyZGUyZDRjZWQz',
          reference: 'FLW71DC60942BAD76D2BD5B4E'
        }
      },
    });

    var payload = {
      bvn: "12347832211",
      firstname: "Lyra",
      lastname: "Balacqua",
      redirect_url: "https://example-url.company.com"
    };

    var resp = await miscInstance.bvn(payload);

    expect(resolveInitBVNSuccessStub).to.have.been.calledOnce;
    expect(resolveInitBVNSuccessStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('message', 'Bvn verification initiated');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data).to.have.property('reference');
    expect(resp.body.data).to.have.property('url');
  });

  it('should verify BVN consent and return success message', async function () {
    this.timeout(10000);

    const resolveVerifyBVNSuccessStub = sinon.stub(miscInstance, 'verifybvn').resolves({
      body: {
        status: 'success',
        message: 'Bvn details fetched',
        data: {
          first_name: 'Lyra',
          last_name: 'Balacqua',
          status: 'INITIATED',
          reference: 'FLW71DC60942BAD76D2BD5B4E',
          callback_url: null,
          bvn_data: null,
          created_at: '2024-02-16T08:28:10.000Z'
        }
      },
    });

    var payload = {
      reference: "FLW71DC60942BAD76D2BD5B4E"
    };

    var resp = await miscInstance.verifybvn(payload);

    expect(resolveVerifyBVNSuccessStub).to.have.been.calledOnce;
    expect(resolveVerifyBVNSuccessStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('message', 'Bvn details fetched');
    expect(resp.body).to.have.property('data');
  });

  it('should verify resolve bank account details', async function () {
    this.timeout(10000);

    const resolveAccountSuccessStub = sinon
      .stub(miscInstance, 'verify_Account')
      .resolves({
        body: {
          status: 'success',
          message: 'Account details fetched',
          data: {
            account_number: '0690000032',
            account_name: 'Pastor Bright',
          },
        },
      });

    var payload = {
      account_number: '0690000032',
      account_bank: '044',
    };

    var resp = await miscInstance.verify_Account(payload);
    // console.log(resp);

    expect(resolveAccountSuccessStub).to.have.been.calledOnce;
    expect(resolveAccountSuccessStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data).to.have.property('account_number');
    expect(resp.body.data).to.have.property('account_name');
  });
});
