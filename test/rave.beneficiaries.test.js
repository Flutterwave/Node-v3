var beneficiaries = require('../lib/rave.beneficiaries');
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

describe('#Rave Beneficiaries', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let beneficiariesInstance;
  let beneficiariesStub;

  beforeEach(() => {
    beneficiariesInstance = new beneficiaries(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a Beneficiary', async function () {
    this.timeout(10000);

    const createBeneficiariesSuccessStub = sinon
      .stub(beneficiariesInstance, 'create')
      .resolves({
        body: {
          status: 'success',
          message: 'Banks fetched successfully',
          data: {
            id: 3644,
            account_number: '0690000034',
            bank_code: '044',
            full_name: 'Ade Bond',
            created_at: '2020-01-16T18:01:28.000Z',
            bank_name: 'ACCESS BANK NIGERIA',
          },
        },
      });

    var payload = {
      account_number: '0690000034',
      account_bank: '044',
    };

    var resp = await beneficiariesInstance.create(payload);
    // console.log(resp);

    // success case
    expect(createBeneficiariesSuccessStub).to.have.been.calledOnce;
    expect(createBeneficiariesSuccessStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data).to.have.property('id');
    expect(resp.body.data).to.have.property('account_number');
    expect(resp.body.data).to.have.property('bank_code');
    expect(resp.body.data).to.have.property('full_name');
    expect(resp.body.data).to.have.property('bank_name');
  });

  it('should return Account resolve error', async function () {
    this.timeout(10000);

    const createBeneficiariesFailedStub = sinon
      .stub(beneficiariesInstance, 'create')
      .resolves({
        body: {
          status: 'error',
          message: 'Account resolve failed',
          data: null,
        },
      });

    var payload = {
      account_number: '0690000034',
      account_bank: '044',
    };

    var resp = await beneficiariesInstance.create(payload);

    // failed case
    expect(createBeneficiariesFailedStub).to.have.been.calledOnce;
    expect(createBeneficiariesFailedStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'error');
    expect(resp.body.message).to.eq('Account resolve failed');
  });

  it('should return a single beneficiary ', async function () {
    this.timeout(10000);

    const fetchBeneficiariesStub = sinon
      .stub(beneficiariesInstance, 'fetch')
      .resolves({
        body: {
          status: 'success',
          message: 'Payout beneficiary fetched',
          data: {
            id: 2923,
            account_number: '0690000032',
            bank_code: '044',
            full_name: 'Pastor Bright',
            meta: null,
            created_at: '2019-11-28T08:15:29.000Z',
            bank_name: 'ACCESS BANK NIGERIA',
          },
        },
      });

    var payload = {
      id: '2923',
    };

    var resp = await beneficiariesInstance.fetch(payload);

    // success case
    expect(fetchBeneficiariesStub).to.have.been.calledOnce;
    expect(fetchBeneficiariesStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data).to.have.property('id');
    expect(resp.body.data).to.have.property('account_number');
    expect(resp.body.data).to.have.property('bank_code');
    expect(resp.body.data).to.have.property('full_name');
    expect(resp.body.data).to.have.property('bank_name');

    expect(resp.body.data.id).to.eq(2923);
  });

  it('should successfully delete beneficiary ', async function () {
    this.timeout(10000);

    const deleteBeneficiariesStub = sinon
      .stub(beneficiariesInstance, 'delete')
      .resolves({
        body: {
          status: 'success',
          message: 'Beneficiary deleted',
          data: 'Deleted',
        },
      });

    var payload = {
      id: '3644',
    };

    var resp = await beneficiariesInstance.delete(payload);

    expect(deleteBeneficiariesStub).to.have.been.calledOnce;
    expect(deleteBeneficiariesStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body.message).to.eq('Beneficiary deleted');
  });
});
