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
      "account_bank": "044",
      "account_number": "0690000040",
      "amount": 5500,
      "narration": "Akhlm Pstmn Trnsfr xx007",
      "currency": "NGN",
      "reference": "akhlm-pstmnpyt-r02ens007_PMCKDU_1",
      "callback_url": "https://www.flutterwave.com/ng/",
      "debit_currency": "NGN"
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
        "status": "success",
        "message": "Transfers fetched",
        "meta": {
           "page_info": {
              "total": 47,
              "current_page": 1,
              "total_pages": 5
           }
        },
        "data": [
           {
              "id": 403318,
              "account_number": "256782033409",
              "bank_code": "MPS",
              "full_name": "N/A",
              "created_at": "2023-05-22T16:34:49.000Z",
              "currency": "UGX",
              "debit_currency": null,
              "amount": 20,
              "fee": 500,
              "status": "FAILED",
              "reference": "6b76aa8f93bd765c",
              "meta": [
                 {
                    "mobile_number": "08109328188"
                 }
              ],
              "narration": "Mobile money payout",
              "approver": null,
              "complete_message": "beneficiary_name is required",
              "requires_approval": 0,
              "is_approved": 1,
              "bank_name": "N/A"
           },
           {
              "id": 403317,
              "account_number": "256782033409",
              "bank_code": "MPS",
              "full_name": "N/A",
              "created_at": "2023-05-22T16:33:13.000Z",
              "currency": "UGX",
              "debit_currency": null,
              "amount": 20,
              "fee": 500,
              "status": "FAILED",
              "reference": "6b3269daa45fa640",
              "meta": [
                 {
                    "mobile_number": "08109328188"
                 }
              ],
              "narration": "Mobile money payout",
              "approver": null,
              "complete_message": "beneficiary_name is required",
              "requires_approval": 0,
              "is_approved": 1,
              "bank_name": "N/A"
           },
           {
              "id": 403047,
              "account_number": "1295124",
              "bank_code": "wallet",
              "full_name": "Michael Onyeforo Jnr",
              "created_at": "2023-05-19T12:56:13.000Z",
              "currency": "EUR",
              "debit_currency": "EUR",
              "amount": 1000,
              "fee": 0,
              "status": "FAILED",
              "reference": "TRF-555600071008",
              "meta": {
                 "AccountId": 37782,
                 "merchant_id": "5758113"
              },
              "narration": null,
              "approver": null,
              "complete_message": "DISBURSE FAILED: You can only spend EUR 100.00 at once",
              "requires_approval": 0,
              "is_approved": 1,
              "bank_name": "wallet"
           },
           {
              "id": 401090,
              "account_number": "28581375",
              "bank_code": "wallet",
              "full_name": "Trulipay technologies ",
              "created_at": "2023-04-26T22:30:12.000Z",
              "currency": "UGX",
              "debit_currency": "UGX",
              "amount": 1000,
              "fee": 0,
              "status": "FAILED",
              "reference": "TRF-282263183180",
              "meta": {
                 "AccountId": 1758777,
                 "merchant_id": "100756902"
              },
              "narration": null,
              "approver": null,
              "complete_message": "DISBURSE FAILED: You can only spend UGX 100.00 at once",
              "requires_approval": 0,
              "is_approved": 1,
              "bank_name": "wallet"
           },
           {
              "id": 401083,
              "account_number": "28581369",
              "bank_code": "wallet",
              "full_name": "Trulipay technologies ",
              "created_at": "2023-04-26T22:10:27.000Z",
              "currency": "GHS",
              "debit_currency": "GHS",
              "amount": 20000,
              "fee": 0,
              "status": "FAILED",
              "reference": "TRF-546614104664",
              "meta": {
                 "AccountId": 1758777,
                 "merchant_id": "100756902"
              },
              "narration": null,
              "approver": null,
              "complete_message": "DISBURSE FAILED: You can only spend GHS 1000.00 at once",
              "requires_approval": 0,
              "is_approved": 1,
              "bank_name": "wallet"
           },
           {
              "id": 398682,
              "account_number": "32000713",
              "bank_code": "wallet",
              "full_name": "Olivier Staff",
              "created_at": "2023-03-31T11:52:06.000Z",
              "currency": "XAF",
              "debit_currency": "XAF",
              "amount": 1000000,
              "fee": 0,
              "status": "FAILED",
              "reference": "TRF-180822210828",
              "meta": {
                 "AccountId": 1895433,
                 "merchant_id": "100872524"
              },
              "narration": null,
              "approver": null,
              "complete_message": "DISBURSE FAILED: A fatal error occured while proccesing your request.",
              "requires_approval": 0,
              "is_approved": 1,
              "bank_name": "wallet"
           },
           {
              "id": 396933,
              "account_number": "0690000032",
              "bank_code": "044",
              "full_name": "Pastor Bright",
              "created_at": "2023-03-15T17:22:57.000Z",
              "currency": "NGN",
              "debit_currency": "NGN",
              "amount": 1222,
              "fee": 10.75,
              "status": "FAILED",
              "reference": "17f18932-5ee8-4c48-a435-3194e2836d0o",
              "meta": {
                 "iWithdrawId": 346,
                 "iUserId": "63e1f7f0d4cba4854b5fec1b"
              },
              "narration": "Kudi Fantasy Withdraw",
              "approver": null,
              "complete_message": "DISBURSE FAILED: You can only spend XAF 100000000.00 at once",
              "requires_approval": 0,
              "is_approved": 1,
              "bank_name": "ACCESS BANK NIGERIA"
           },
           {
              "id": 396456,
              "account_number": "FOREIGN-ACCOUNT",
              "bank_code": "FOREIGN-BANK",
              "full_name": "N/A",
              "created_at": "2023-03-11T18:16:55.000Z",
              "currency": "EUR",
              "debit_currency": null,
              "amount": 50,
              "fee": 35,
              "status": "FAILED",
              "reference": "new-intl-eu-test-transferlmworj0970450",
              "meta": [
                 {
                    "account_number": "FOREIGN-ACCOUNT",
                    "routing_number": "FOREIGN-BANK",
                    "sender": "Flutterwave Developers",
                    "mobile_number": "23480000000000"
                 }
              ],
              "narration": "Test EU Int'l bank transfers",
              "approver": null,
              "complete_message": "beneficiary_name is required",
              "requires_approval": 0,
              "is_approved": 1,
              "bank_name": "N/A"
           },
           {
              "id": 396435,
              "account_number": "2540700000000",
              "bank_code": "MPS",
              "full_name": "Flutterwave Developers",
              "created_at": "2023-03-11T01:14:35.000Z",
              "currency": "KES",
              "debit_currency": "NGN",
              "amount": 50,
              "fee": 45,
              "status": "FAILED",
              "reference": "mk-902837-jk555",
              "meta": [
                 {
                    "sender": "Obembe Mark",
                    "mobile_number": "12313131231231"
                 }
              ],
              "narration": "New transfer",
              "approver": null,
              "complete_message": "DISBURSE FAILED: Unable to obtain user details",
              "requires_approval": 0,
              "is_approved": 1,
              "bank_name": "FA-BANK"
           },
           {
              "id": 395470,
              "account_number": "0690000031",
              "bank_code": "044",
              "full_name": "Forrest Green",
              "created_at": "2023-02-27T21:02:45.000Z",
              "currency": "NGN",
              "debit_currency": null,
              "amount": 100,
              "fee": 10.75,
              "status": "FAILED",
              "reference": "mk-6u54i-jp",
              "meta": null,
              "narration": null,
              "approver": null,
              "complete_message": "DISBURSE FAILED: wallet currently restricted. please contact administrator",
              "requires_approval": 0,
              "is_approved": 1,
              "bank_name": "ACCESS BANK NIGERIA"
           }
        ]
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
      "amount": "12500",
      "currency": "NGN"
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
