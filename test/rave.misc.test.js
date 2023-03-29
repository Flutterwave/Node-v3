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

  it('should verify BVN and return success message', async function () {
    this.timeout(10000);

    const resolveBVNSuccessStub = sinon.stub(miscInstance, 'bvn').resolves({
      body: {
        status: 'success',
        message: 'BVN details fetched',
        data: {
          bvn: '123456789',
          first_name: 'Wendy',
          middle_name: 'Chucky',
          last_name: 'Rhoades',
          date_of_birth: '01-01-1905',
          phone_number: '08012345678',
          registration_date: '01-01-1921',
          enrollment_bank: '044',
          enrollment_branch: 'Idejo',
          image_base_64: null,
          address: null,
          gender: 'Male',
          email: null,
          watch_listed: null,
          nationality: 'Nigerian',
          marital_status: null,
          state_of_residence: null,
          lga_of_residence: null,
          image: null,
        },
      },
    });

    var payload = {
      bvn: '12345678901',
    };

    var resp = await miscInstance.bvn(payload);

    expect(resolveBVNSuccessStub).to.have.been.calledOnce;
    expect(resolveBVNSuccessStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data).to.have.property('bvn');
    expect(resp.body.data).to.have.property('first_name');
    expect(resp.body.data).to.have.property('date_of_birth');
    expect(resp.body.data).to.have.property('phone_number');
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
