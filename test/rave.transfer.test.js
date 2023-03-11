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
      reference: 'akhlm-pstmnpyt-rfxxgjlsioens007_PMCKDU_1',
      callback_url: 'https://www.flutterwave.com/ng/',
      debit_currency: 'NGN',
    };

    var resp = await transferInstance.initiate(payload);

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

    // const createEUTransferStub = sinon
    //   .stub(transferInstance, 'initiate')
    //   .resolves({
    //     body: {
    //       status: 'success',
    //       message: 'Transfer Queued Successfully',
    //       data: {
    //         id: 396433,
    //         account_number: 'FOREIGN-ACCOUNT',
    //         bank_code: 'FOREIGN-BANK',
    //         full_name: 'Flutterwave Developers',
    //         created_at: '2023-03-11T01:14:26.000Z',
    //         currency: 'EUR',
    //         amount: 50,
    //         fee: 35,
    //         status: 'NEW',
    //         reference: 'new-intl-eu-test-transferlmworj',
    //         meta: [[Object]],
    //         narration: "Test EU Int'l bank transfers",
    //         complete_message: '',
    //         requires_approval: 0,
    //         is_approved: 1,
    //         bank_name: 'FA-BANK',
    //       },
    //     },
    //   });

    // var payload = {
    //   amount: 50,
    //   narration: "Test EU Int'l bank transfers",
    //   currency: 'EUR',
    //   reference: 'new-intl-eu-test-transferlmworj',
    //   beneficiary_name: 'Flutterwave Developers',
    //   meta: [
    //     {
    //       AccountNumber: 'DA091983888373BGH',
    //       RoutingNumber: 'BECFDE7HKKX',
    //       SwiftCode: 'BECFDE7HKKX',
    //       BankName: 'LLOYDS BANK',
    //       BeneficiaryName: 'Flutterwave Developers',
    //       BeneficiaryCountry: 'DE',
    //       PostalCode: '80489',
    //       StreetNumber: '31',
    //       StreetName: 'Handelsbank Elsenheimer Str.',
    //       City: 'München',
    //     },
    //   ],
    // };

    // var payload = {
    //   amount: 50,
    //   narration: "Test EU Int'l bank transfers",
    //   currency: 'EUR',
    //   reference: 'new-intl-eu-terl09hufj',
    //   beneficiary_name: 'Flutterwave Developers',
    //   meta: {},
    // };

    var payload = {
      amount: 50,
      narration: "Test EU Int'l bank transfers",
      currency: 'EUR',
      reference: 'new-intl-eu-test-transferlmworj097046510',
      beneficiary_name: 'Flutterwave Developers',
      meta: [
        {
          AccountNumber: 'DA091983888373BGH',
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

    // expect(createEUTransferStub).to.have.been.calledOnce;
    // expect(createEUTransferStub).to.have.been.calledOnceWith(payload);

    // expect(resp.body).to.have.property('status', 'success');

    // expect(resp.body.data).to.have.property('reference');
    // expect(resp.body.data.reference).to.eq('new-intl-eu-test-transferlmworj');

    console.log(resp);
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
});
