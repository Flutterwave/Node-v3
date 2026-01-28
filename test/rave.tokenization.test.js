var tokenization = require('../lib/rave.tokenized');
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


describe('#Rave Tokenization Coverage', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let tokenInstance;

  beforeEach(() => {
    tokenInstance = new tokenization(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a tokenzied charge', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: "success",
        message: "Charge successful",
        data: {
          id: 277036749,
          tx_ref: "new-live-test",
          flw_ref: "FLW253481676",
          redirect_url: "http://127.0.0",
          device_fingerprint: "N/A",
          amount: 300,
          charged_amount: 300,
          app_fee: 4.2,
          merchant_fee: 0,
          processor_response: "APPROVED",
          auth_model: "noauth",
          currency: "NGN",
          ip: "123.456.543",
          narration: "pstmn charge",
          status: "successful",
          payment_type: "card",
          created_at: "2020-06-01T01:31:59.000Z",
          account_id: 17321,
        }
      }
    })

    const payload = {
      token: "flw-t1nf-f9b3bf384cd30d6fca42b6df9d27bd2f-m03k",
      email: "user@example.com",
      currency: "NGN",
      country: "NG",
      amount: 2000,
      narration: "For Testing Purpose",
      tx_ref: "tokenized-c-001"
    }
    const resp = await tokenInstance.charge(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge successful');

  });

  it('should retrieve the status of a tokenzied charge', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: "success",
        message: "Bulk charge fetched",
        data: [
          {
            id: 1017001,
            tx_ref: "akhlm-pstmn-blkchrge-xx6",
            flw_ref: "FLW-M03K-bbd148a9569b709882da8437e123ba61",
            device_fingerprint: "N/A",
            amount: 3000,
            currency: "NGN",
            charged_amount: 3042,
            app_fee: 42,
            merchant_fee: 0,
            processor_response: "Approved",
            auth_model: "noauth",
            ip: "pstmn",
            narration: "Earth Gang",
            status: "successful",
            payment_type: "card",
            created_at: "2020-01-19T21:46:30.000Z",
            customer_name: "Yemi Desola",
            customer_email: "user@example.com",
            account_id: 73362,
            batch_id: 131,
            amount_settled: 3000
          }
        ]
      }
    })

    const payload = {
      bulk_id: "1017001"
    }

    const resp = await tokenInstance.fetch_bulk(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Bulk charge fetched');
    expect(resp.data[0]).to.have.property('status', 'successful');
  });

  it('should create a bulk tokenzied charge', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: "success",
        message: "Bulk charge successful",
        data: {
          id: 130,
          created_at: "2020-01-19T21:43:39.000Z",
          approver: "N/A"
        }
      }
    })

    const payload = {
      retry_strategy: {
        retry_interval: 120,
        retry_amount_variable: 60,
        retry_attempt_variable: 2,
        last_attempt_variable: 50
      },
      bulk_data: [{
        currency: "NGN",
        token: "flw-t1nf-53e91845cddd82c9f7113e6529e23ab7-m03w",
        country: "NG",
        amount: 2000,
        tx_ref: "tokenized-c-001",
        email: "user@example.com",
        ip: "190.233.222.1"
      }],
      title: "Staff salary for June"
    }
    const resp = await tokenInstance.bulk(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Bulk charge successful');
    expect(resp.data).to.have.property('id', 130);


  });

  it('should retrieve the charge transactions of a bulk tokenzied charge', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: "success",
        message: "Bulk charge transactions fetched",
        data: [
          {
            tx_ref: "akhlm-pstmn-blkchrg-xx6",
            id: "1017000",
            flw_ref: "FLW-M03K-7544dc8d157ca763bbcf864a24906f93",
            device_fingerprint: "N/A",
            amount: 3500,
            currency: "NGN",
            charged_amount: 3549,
            app_fee: 49,
            merchant_fee: 0,
            processor_response: "Approved",
            auth_model: "noauth",
            ip: "pstmn",
            narration: "Kizito Akhilome",
            status: "successful",
            payment_type: "card",
            created_at: "2020-01-19T21:46:29.000Z",
            account_id: "73362",
            amount_settled: 3450,
            card: {
              expiry: "09/22",
              type: "MASTERCARD",
              country: "NIGERIA NG",
              issuer: "MASTERCARD  CREDIT",
              first_6digits: "553188",
              last_4digits: "2950"
            },
            customer: {
              id: "252759",
              email: "user@example.com",
              phone_number: "0813XXXXXXX",
              name: "Kizito Akhilome",
              created_at: "2020-01-15T13:26:24.000Z"
            }
          }
        ]
      }
    })

    const payload = {
      bulk_id: "1017001"
    }

    const resp = await tokenInstance.fetch_charge_transactions(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Bulk charge transactions fetched');
    expect(resp.data[0]).to.have.property('status', 'successful');
  });
  
  it('should update a card token', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: "success",
        message: "Token details updated",
        data: {
          email: "ken@example.com",
          fullname: "Kendrick Graham",
          phone_number: "0813XXXXXX22",
          created_at: "2020-06-11T16:25:44.000Z"
        }
      }
    });

    const payload = {
      email: "user@example.com",
      full_name: "Kendrick Graham",
      token: "flw-t1nf-f9b3bf384cd30d6fca42b6df9d27bd2f-xxxx",
      phone_number: "0800000000"
    };
    const resp = await tokenInstance.update_token(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Token details updated');

  });

  it('should validate phone number when updating a card token', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: "success",
        message: "Token details updated",
        data: {
          email: "ken@example.com",
          fullname: "Kendrick Graham",
          phone_number: "ddffddffddf2",
          created_at: "2020-06-11T16:25:44.000Z"
        }
      }
    });

    const payload = {
      email: "user@example.com",
      full_name: "Kendrick Graham",
      token: "flw-t1nf-f9b3bf384cd30d6fca42b6df9d27bd2f-xxxx",
      phone_number: "dfddfffdf"
    };
    await expect(tokenInstance.update_token(payload)).to.be.rejectedWith('phone number should be digits');
    expect(requestStub).to.not.have.been.called;

  });

});