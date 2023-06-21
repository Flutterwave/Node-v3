var transfer = require('../lib/rave.transfers');
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

describe('#Rave transfers', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let transferInstance;
  let transferStub;

  beforeEach(() => {
    transferInstance = new transfer(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create NGN bank transfer', async function () {
    this.timeout(10000);

    const createNGTransferStub = sinon
      .stub(transferInstance, 'initiate')
      .resolves({
        body: {
          status: 'success',
          message: 'Transfer Queued Successfully',
          data: {
            id: 396432,
            account_number: '0690000040',
            bank_code: '044',
            full_name: 'Alexis Sanchez',
            created_at: '2023-03-11T01:14:21.000Z',
            currency: 'NGN',
            debit_currency: 'NGN',
            amount: 5500,
            fee: 26.875,
            status: 'NEW',
            reference: 'akhlm-pstmnpyt-rfxxgjlsioens007_PMCKDU_1',
            meta: null,
            narration: 'Akhlm Pstmn Trnsfr xx007',
            complete_message: '',
            requires_approval: 0,
            is_approved: 1,
            bank_name: 'ACCESS BANK NIGERIA',
          },
        },
      });

    var payload = {
      account_bank: '044',
      account_number: '0690000040',
      amount: 5500,
      narration: 'Akhlm Pstmn Trnsfr xx007',
      currency: 'NGN',
      reference: 'akhlm-pstmnpyt-r02ens007_PMCKDU_1',
      callback_url: 'https://www.flutterwave.com/ng/',
      debit_currency: 'NGN',
    };

    var resp = await transferInstance.initiate(payload);
    // console.log(resp);

    expect(createNGTransferStub).to.have.been.calledOnce;
    expect(createNGTransferStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');

    expect(resp.body.data).to.have.property('reference');
    expect(resp.body.data.reference).to.eq(
      'akhlm-pstmnpyt-rfxxgjlsioens007_PMCKDU_1',
    );
  });

  it('should create EUR/GBP bank transfer', async function () {
    this.timeout(10000);

    const createEUTransferStub = sinon
      .stub(transferInstance, 'initiate')
      .resolves({
        body: {
          status: 'success',
          message: 'Transfer Queued Successfully',
          data: {
            id: 396433,
            account_number: 'FOREIGN-ACCOUNT',
            bank_code: 'FOREIGN-BANK',
            full_name: 'Flutterwave Developers',
            created_at: '2023-03-11T01:14:26.000Z',
            currency: 'EUR',
            amount: 50,
            fee: 35,
            status: 'NEW',
            reference: 'new-intl-eu-test-transferlmworj',
            meta: [[Object]],
            narration: "Test EU Int'l bank transfers",
            complete_message: '',
            requires_approval: 0,
            is_approved: 1,
            bank_name: 'FA-BANK',
          },
        },
      });

    var payload = {
      amount: 50,
      narration: "Test EU Int'l bank transfers",
      currency: 'EUR',
      reference: 'new-intl-eu-test-transferlmworj',
      beneficiary_name: 'Flutterwave Developers',
      meta: [
        {
          AccountNumber: 'DA091983888373BGH',
          RoutingNumber: 'BECFDE7HKKX',
          SwiftCode: 'BECFDE7HKKX',
          BankName: 'LLOYDS BANK',
          BeneficiaryName: 'Flutterwave Developers',
          BeneficiaryCountry: 'DE',
          PostalCode: '80489',
          StreetNumber: '31',
          StreetName: 'Handelsbank Elsenheimer Str.',
          City: 'München',
        },
      ],
    };

    var resp = await transferInstance.initiate(payload);

    expect(createEUTransferStub).to.have.been.calledOnce;
    expect(createEUTransferStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');

    expect(resp.body.data).to.have.property('reference');
    expect(resp.body.data.reference).to.eq('new-intl-eu-test-transferlmworj');
  });

  it('should create USD bank transfer', async function () {
    this.timeout(10000);

    const createUSTransferStub = sinon
      .stub(transferInstance, 'initiate')
      .resolves({
        body: {
          status: 'success',
          message: 'Transfer Queued Successfully',
          data: {
            id: 396434,
            account_number: 'FOREIGN-ACCOUNT',
            bank_code: 'FOREIGN-BANK',
            full_name: 'Flutterwave Developers',
            created_at: '2023-03-11T01:14:30.000Z',
            currency: 'USD',
            amount: 50,
            fee: 40,
            status: 'NEW',
            reference: 'new-intl-test-transfer1374uq',
            meta: [[Object]],
            narration: "Test Int'l bank transfers",
            complete_message: '',
            requires_approval: 0,
            is_approved: 1,
            bank_name: 'FA-BANK',
          },
        },
      });

    var payload = {
      amount: 50,
      narration: "Test Int'l bank transfers",
      currency: 'USD',
      reference: 'new-intl-test-transfer1374uq',
      beneficiary_name: 'Flutterwave Developers',
      meta: [
        {
          AccountNumber: '09182972BH',
          RoutingNumber: '0000000002993',
          SwiftCode: 'ABJG190',
          BankName: 'BANK OF AMERICA, N.A., SAN FRANCISCO, CA',
          BeneficiaryName: 'Flutterwave Developers',
          BeneficiaryAddress: 'San Francisco, 4 Newton',
          BeneficiaryCountry: 'US',
        },
      ],
    };

    var resp = await transferInstance.initiate(payload);

    expect(createUSTransferStub).to.have.been.calledOnce;
    expect(createUSTransferStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');

    expect(resp.body.data).to.have.property('reference');
    expect(resp.body.data.reference).to.eq('new-intl-test-transfer1374uq');
  });

  it('should create KES transfer', async function () {
    this.timeout(10000);

    const createKETransferStub = sinon
      .stub(transferInstance, 'initiate')
      .resolves({
        body: {
          status: 'success',
          message: 'Transfer Queued Successfully',
          data: {
            id: 396435,
            account_number: '2540700000000',
            bank_code: 'MPS',
            full_name: 'Flutterwave Developers',
            created_at: '2023-03-11T01:14:35.000Z',
            currency: 'KES',
            debit_currency: 'NGN',
            amount: 50,
            fee: 45,
            status: 'NEW',
            reference: 'mk-902837-jk555',
            meta: [[Object]],
            narration: 'New transfer',
            complete_message: '',
            requires_approval: 0,
            is_approved: 1,
            bank_name: 'FA-BANK',
          },
        },
      });

    var payload = {
      account_bank: 'MPS',
      account_number: '2540700000000',
      amount: 50,
      narration: 'New transfer',
      currency: 'KES',
      reference: 'mk-902837-jk555',
      beneficiary_name: 'Flutterwave Developers',
      meta: {
        sender: 'Obembe Mark',
        sender_country: 'US',
        mobile_number: '12313131231231',
      },
    };

    var resp = await transferInstance.initiate(payload);

    expect(createKETransferStub).to.have.been.calledOnce;
    expect(createKETransferStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');

    expect(resp.body.data).to.have.property('reference');
    expect(resp.body.data.reference).to.eq('mk-902837-jk555');
  });

  it('should fetch transfer details', async function () {
    this.timeout(10000);

    const fetchTransferStub = sinon
      .stub(transferInstance, 'get_a_transfer')
      .resolves({
        body: {
          status: 'success',
          message: 'Transfer fetched',
          data: {
            id: 396478,
            account_number: 'FOREIGN-ACCOUNT',
            bank_code: 'FOREIGN-BANK',
            full_name: 'Flutterwave Developers',
            created_at: '2023-03-12T00:42:44.000Z',
            currency: 'EUR',
            debit_currency: null,
            amount: 50,
            fee: 35,
            status: 'NEW',
            reference: 'new-intl-eu-104',
            meta: [[Object]],
            narration: "Test EU Int'l bank transfers",
            approver: null,
            complete_message: '',
            requires_approval: 0,
            is_approved: 1,
            bank_name: 'FA-BANK',
          },
        },
      });

    var payload = {
      id: '396478',
    };

    var resp = await transferInstance.get_a_transfer(payload);

    expect(fetchTransferStub).to.have.been.calledOnce;
    expect(fetchTransferStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');

    expect(resp.body.data).to.have.property('reference');
    expect(resp.body.data.reference).to.eq('new-intl-eu-104');
  });

  it('should fetch all transfers', async function () {
    this.timeout(10000);

    const listTransferStub = sinon.stub(transferInstance, 'fetch').resolves({
      body: {
        status: 'success',
        message: 'Transfers fetched',
        meta: { page_info: { total: 39, current_page: 1, total_pages: 4 } },
        data: [
          {
            id: 396456,
            account_number: 'FOREIGN-ACCOUNT',
            bank_code: 'FOREIGN-BANK',
            full_name: 'N/A',
            created_at: '2023-03-11T18:16:55.000Z',
            currency: 'EUR',
            debit_currency: null,
            amount: 50,
            fee: 35,
            status: 'FAILED',
            reference: 'new-intl-eu-test-transferlmworj0970450',
            meta: [Array],
            narration: "Test EU Int'l bank transfers",
            approver: null,
            complete_message: 'beneficiary_name is required',
            requires_approval: 0,
            is_approved: 1,
            bank_name: 'N/A',
          },
          {
            id: 395470,
            account_number: '0690000031',
            bank_code: '044',
            full_name: 'Forrest Green',
            created_at: '2023-02-27T21:02:45.000Z',
            currency: 'NGN',
            debit_currency: null,
            amount: 100,
            fee: 10.75,
            status: 'FAILED',
            reference: 'mk-6u54i-jp',
            meta: null,
            narration: null,
            approver: null,
            complete_message:
              'DISBURSE FAILED: wallet currently restricted. please contact administrator',
            requires_approval: 0,
            is_approved: 1,
            bank_name: 'ACCESS BANK NIGERIA',
          },
          {
            id: 352500,
            account_number: '28647590',
            bank_code: 'wallet',
            full_name: 'strait sahara limited',
            created_at: '2022-07-15T13:06:03.000Z',
            currency: 'XOF',
            debit_currency: null,
            amount: 100000,
            fee: 0,
            status: 'FAILED',
            reference: 'RAEN1377687267',
            meta: [Object],
            narration: 'Top Up',
            approver: null,
            complete_message:
              'DISBURSE FAILED: Transfers to this currency is currently unavailable',
            requires_approval: 0,
            is_approved: 1,
            bank_name: 'wallet',
          },
          {
            id: 352494,
            account_number: '28647590',
            bank_code: 'wallet',
            full_name: 'strait sahara limited',
            created_at: '2022-07-15T13:02:06.000Z',
            currency: 'XOF',
            debit_currency: null,
            amount: 100000,
            fee: 0,
            status: 'FAILED',
            reference: 'RAEN6276263866',
            meta: [Object],
            narration: 'Top Up',
            approver: null,
            complete_message:
              'DISBURSE FAILED: Transfers to this currency is currently unavailable',
            requires_approval: 0,
            is_approved: 1,
            bank_name: 'wallet',
          },
          {
            id: 352493,
            account_number: '28647595',
            bank_code: 'wallet',
            full_name: 'strait sahara limited',
            created_at: '2022-07-15T13:00:23.000Z',
            currency: 'XAF',
            debit_currency: null,
            amount: 100000,
            fee: 0,
            status: 'FAILED',
            reference: 'RAEN1787389097',
            meta: [Object],
            narration: 'Top Up',
            approver: null,
            complete_message:
              'DISBURSE FAILED: Transfers to this currency is currently unavailable',
            requires_approval: 0,
            is_approved: 1,
            bank_name: 'wallet',
          },
          {
            id: 352482,
            account_number: '28647595',
            bank_code: 'wallet',
            full_name: 'strait sahara limited',
            created_at: '2022-07-15T12:14:34.000Z',
            currency: 'XAF',
            debit_currency: 'XAF',
            amount: 100000,
            fee: 0,
            status: 'FAILED',
            reference: 'RAEN3904459953',
            meta: [Object],
            narration: 'Top Up',
            approver: null,
            complete_message:
              'DISBURSE FAILED: Transfers to this currency is currently unavailable',
            requires_approval: 0,
            is_approved: 1,
            bank_name: 'wallet',
          },
          {
            id: 352481,
            account_number: '28647590',
            bank_code: 'wallet',
            full_name: 'strait sahara limited',
            created_at: '2022-07-15T12:14:20.000Z',
            currency: 'XOF',
            debit_currency: 'XOF',
            amount: 100000,
            fee: 0,
            status: 'FAILED',
            reference: 'RAEN1623682840',
            meta: [Object],
            narration: 'Top Up',
            approver: null,
            complete_message:
              'DISBURSE FAILED: Transfers to this currency is currently unavailable',
            requires_approval: 0,
            is_approved: 1,
            bank_name: 'wallet',
          },
          {
            id: 351257,
            account_number: '10930567',
            bank_code: 'wallet',
            full_name: 'Alanressler Limited',
            created_at: '2022-07-04T12:58:23.000Z',
            currency: 'ZAR',
            debit_currency: 'USD',
            amount: 1000,
            fee: 0,
            status: 'FAILED',
            reference: 'TRF-195911556265',
            meta: [Object],
            narration: null,
            approver: null,
            complete_message:
              'DISBURSE FAILED: A fatal error occured while proccesing your request.',
            requires_approval: 0,
            is_approved: 1,
            bank_name: 'wallet',
          },
          {
            id: 351256,
            account_number: '10930567',
            bank_code: 'wallet',
            full_name: 'Alanressler Limited',
            created_at: '2022-07-04T12:53:37.000Z',
            currency: 'ZAR',
            debit_currency: 'USD',
            amount: 10000,
            fee: 0,
            status: 'FAILED',
            reference: 'TRF-396916656963',
            meta: [Object],
            narration: null,
            approver: null,
            complete_message:
              'DISBURSE FAILED: A fatal error occured while proccesing your request.',
            requires_approval: 0,
            is_approved: 1,
            bank_name: 'wallet',
          },
          {
            id: 351253,
            account_number: '10930567',
            bank_code: 'wallet',
            full_name: 'Alanressler Limited',
            created_at: '2022-07-04T12:52:39.000Z',
            currency: 'ZAR',
            debit_currency: 'USD',
            amount: 10000,
            fee: 0,
            status: 'FAILED',
            reference: 'TRF-896596669695',
            meta: [Object],
            narration: null,
            approver: null,
            complete_message:
              'DISBURSE FAILED: A fatal error occured while proccesing your request.',
            requires_approval: 0,
            is_approved: 1,
            bank_name: 'wallet',
          },
        ],
      },
    });

    var payload = { status: 'failed' };

    var resp = await transferInstance.fetch(payload);
    expect(listTransferStub).to.have.been.calledOnce;
    expect(listTransferStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');

    expect(resp.body.data[0]).to.have.property('reference');
    expect(resp.body.data[0].status).to.eq('FAILED');
  });

  it('should fetch transfer fees', async function () {
    this.timeout(10000);

    const fetchFeeStub = sinon.stub(transferInstance, 'fee').resolves({
      body: {
        status: 'success',
        message: 'Transfer fee fetched',
        data: [{ currency: 'NGN', fee_type: 'value', fee: 26.875 }],
      },
    });

    var payload = {
      amount: '12500',
      currency: 'NGN',
    };

    var resp = await transferInstance.fee(payload);
    // console.log(resp);

    expect(fetchFeeStub).to.have.been.calledOnce;
    expect(fetchFeeStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');

    expect(resp.body.data[0]).to.have.property('fee_type');
    expect(resp.body.data[0]).to.have.property('fee');
  });

  it('should fetch single transfer details', async function () {
    this.timeout(10000);

    const fetchTransferStub = sinon
      .stub(transferInstance, 'get_a_transfer')
      .resolves({
        body: {
          status: 'success',
          message: 'Transfer fee fetched',
          data: [{ currency: 'NGN', fee_type: 'value', fee: 26.875 }],
        },
      });

    var payload = {
      id: '396456',
    };

    var resp = await transferInstance.get_a_transfer(payload);
    // console.log(resp);

    expect(fetchTransferStub).to.have.been.calledOnce;
    expect(fetchTransferStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');

    expect(resp.body.data[0]).to.have.property('fee_type');
    expect(resp.body.data[0]).to.have.property('fee');
  });
});
