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

  beforeEach(() => {
    transferInstance = new transfer(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create NGN bank transfer', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Transfer Queued Successfully',
        data: { id: 396432, reference: 'akhlm-123', status: 'NEW' },
      },
    });

    var payload = {
      "account_bank": "044",
      "account_number": "0690000040",
      "amount": 5500,
      "narration": "Akhlm Pstmn Trnsfr xx007",
      "currency": "NGN",
      "reference": "akhlm-pstmnpyt-r02ens007_PMCKDU_1",
    };

    var resp = await transferInstance.initiate(payload);

    expect(requestStub).to.have.been.calledOnceWith(sinon.match.string, sinon.match(payload));

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Transfer Queued Successfully');

  });

  it('should validate phone number for KES bank transfer', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Transfer Queued Successfully',
        data: { id: 396432, reference: 'akhlm-123', status: 'NEW' },
      },
    });

    var payload = {
      "amount": 400,
      "currency": "KES",
      "account_bank": "11",
      "account_number": "2332128829",
      "otherwise": [
        {
          "sender": "JAMES JOHN",
          "sender_country": "GH",
          "mobile_number": "erer"
        }
      ]
    };

    await expect(transferInstance.initiate(payload)).to.be.rejectedWith('phone number should be digits');
    expect(requestStub).to.not.have.been.called;
  });
  

  it('should validate phone number and go through with KES bank transfer', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Transfer Queued Successfully',
        data: { id: 396432, reference: 'akhlm-123', status: 'NEW' },
      },
    });

    var payload = {
      "amount": 400,
      "currency": "KES",
      "account_bank": "11",
      "account_number": "2332128829",
      "otherwise": [
        {
          "sender": "JAMES JOHN",
          "sender_country": "GH",
          "mobile_number": "344343434"
        }
      ]
    };
    var resp = await transferInstance.initiate(payload);

    expect(requestStub).to.have.been.calledOnceWith(sinon.match.string, sinon.match(payload));
    expect(resp).to.have.property('status', 'success');
  });

  it('should create bulk transfers (Covers rave.bulk.js)', async function () {
    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Bulk transfer queued',
        data: {
          id: 2013,
          created_at: "2020-01-20T16:36:29.000Z",
          approver: "N/A"
        }
      }
    });

    const payload = {
      title: 'Staff Salary',
      bulk_data: [
        { account_bank: '044', account_number: '0690000040', amount: 5000, currency: 'ZAR' }
      ]
    };

    const resp = await transferInstance.bulk(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Bulk transfer queued');

  });

  it('should fetch transfer fee (Covers rave.fee.js)', async function () {
    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Transfer fee fetched',
        data: [{ fee: 26.875 }]
      }
    });

    const payload = { amount: 5000, currency: 'NGN' };
    const resp = await transferInstance.fee(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.data[0]).to.have.property('fee');
  });

  it('should retrieve all transfers (Covers rave.retrieve.transfers.js)', async function () {
    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Transfers fetched',
        data: [{ id: 396432, status: 'SUCCESSFUL' }]
      }
    });

    const payload = { status: 'successful' };
    const resp = await transferInstance.fetch(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Transfers fetched');

  });


  it('should successfully initiate interwallet transfers (Covers 100% of rave.wallet.js)', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      // We must wrap the result in 'body' so the destructuring succeeds
      body: {
        status: 'success',
        message: 'Transfer Queued Successfully',
        data: { id: 403047 }
      }
    });

    // This payload matches the walletTransferSchema exactly
    const payload = {
      amount: 1000,                      
      currency: 'NGN',                  
      account_bank: 'flutterwave',          
      account_number: '99992069',        
      narration: 'Internal wallet trf', 
      reference: 'ref-' + Date.now(),  
      debit_currency: 'NGN'             
    };

    const resp = await transferInstance.wallet_to_wallet(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
  });

  it('should fetch transfer detail', async function () {
    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: { status: 'success', data: { id: 396478, reference: 'new-intl-eu-104' } },
    });

    var payload = { id: '396478' };
    var resp = await transferInstance.get_a_transfer(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.data.reference).to.eq('new-intl-eu-104');
  });
});