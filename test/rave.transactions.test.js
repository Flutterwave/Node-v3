var transactions = require('../lib/rave.transactions');
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

describe('#Rave Transactions', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

    let trxInstance;
  //   let momoStub;

  beforeEach(() => {
    trxInstance = new transactions(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should successfully verify a payment', async function () {
    this.timeout(10000);

    const verifyTransactionStub = sinon
      .stub(trxInstance, 'verify')
      .resolves({
        status: 'success',
        message: 'Transaction fetched successfully',
        data: {
          id: 4186265,
          tx_ref: '64020445daeec1677853765',
          flw_ref: '5014276956431677853766795',
          device_fingerprint: 'N/A',
          amount: 2000,
          currency: 'NGN',
          charged_amount: 2000,
          app_fee: 28,
          merchant_fee: 0,
          processor_response: 'success',
          auth_model: 'AUTH',
          ip: '52.209.154.143',
          narration: 'Flutterwave Developers',
          status: 'successful',
          payment_type: 'bank_transfer',
          created_at: '2023-03-03T14:29:33.000Z',
          account_id: 20937,
          meta: {
            originatoraccountnumber: '123*******90',
            originatorname: 'JOHN DOE',
            bankname: 'Access Bank',
            originatoramount: 'N/A'
          },
          amount_settled: 1972,
          customer: {
            id: 1882300,
            name: 'Olaobaju Jesulayomi',
            phone_number: '+2349067985011',
            email: 'developers@flutterwavego.com',
            created_at: '2022-11-08T13:38:03.000Z'
          }
        }
      })

    var payload = {
      id: '4186265',
    };

    var resp = await trxInstance.verify(payload);
    expect(verifyTransactionStub).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('data');
    expect(resp).to.have.property('message', 'Transaction fetched successfully');

    expect(resp.data).to.have.property('id', 4186265);
    expect(resp.data).to.have.property('status');
    expect(resp.data).to.have.property('customer');
  });

  it('should successfully verify a payment by tx_ref', async function () {
    this.timeout(10000);

    const verifyTransactionbyTxStub = sinon
      .stub(trxInstance, 'verify_by_tx')
      .resolves({
        status: 'success',
        message: 'Transaction fetched successfully',
        data: {
          id: 8415006,
          tx_ref: 'txref-DI0NzMx13',
          flw_ref: 'FLW-MOCK-3b10a512c4dae649e580a7e5747cfd2c',
          device_fingerprint: '2a4bf5d669b2a0cd4b684ffba8caaae8',
          amount: 2500,
          currency: 'NGN',
          charged_amount: 2500,
          app_fee: 35,
          merchant_fee: 0,
          processor_response: 'Please enter the OTP sent to your mobile number 080****** and email te**@rave**.com',
          auth_model: 'NOAUTH',
          ip: '54.75.161.64',
          narration: 'CARD Transaction ',
          status: 'successful',
          payment_type: 'card',
          created_at: '2025-02-27T18:29:34.000Z',
          account_id: 20937,
          card: {
            first_6digits: '418742',
            last_4digits: '4246',
            issuer: 'ACCESS BANK PLC DEBIT CLASSIC',
            country: 'NIGERIA NG',
            type: 'VISA',
            token: 'flw-t1nf-937086f0365b7334de60da246def40df-m03k',
            expiry: '09/32'
          },
          meta: {
            __CheckoutInitAddress: 'https://cdpn.io/FlutterwaveEng/fullembedgrid/PoVpKqb?animations=run&forceRefresh=1740680880044&type=embed',
            source: 'docs-inline-test',
            consumer_mac: '92a3-912ba-1192a'
          },
          amount_settled: 2462.37,
          customer: {
            id: 2362222,
            name: 'Ayomide Jimi-Oni',
            phone_number: '08100000000',
            email: 'test@mailinator.com',
            created_at: '2024-02-28T09:51:09.000Z'
          }
        }
      })

    var payload = {
      tx_ref: 'txref-DI0NzMx13',
    };

    var resp = await trxInstance.verify_by_tx(payload);
    expect(verifyTransactionbyTxStub).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('data');
    expect(resp).to.have.property('message', 'Transaction fetched successfully');

    expect(resp.data).to.have.property('tx_ref', "txref-DI0NzMx13");
    expect(resp.data).to.have.property('status');
    expect(resp.data).to.have.property('customer');
  });

  it('should successfully return transaction events', async function () {
    this.timeout(10000);

    const getTransactionEventStub = sinon
      .stub(trxInstance, 'event')
      .resolves({
        status: 'success',
        message: 'Transaction events fetched',
        data: [
          {
            note: 'Launched Mobile Money as initial payment option',
            actor: 'customer@customer.com',
            object: 'modal',
            action: 'launched',
            context: 'mobile',
            created_at: '2023-06-23T12:24:12.004Z'
          },
          {
            note: 'Initiated Checkout from https://ravemodal-dev.herokuapp.com/v3/hosted/pay',
            actor: 'customer@customer.com',
            object: 'modal',
            action: 'loaded',
            context: 'mobile',
            created_at: '2023-06-23T12:24:11.816Z'
          },
          {
            note: 'Charge request successful - Pending verification',
            actor: 'customer@customer.com',
            object: 'modal',
            action: 'charge request',
            context: 'mobile',
            created_at: '2023-06-23T12:24:27.880Z'
          },
          {
            note: 'Transaction Completed!',
            actor: 'customer@customer.com',
            object: 'TRANSACTION',
            action: 'completion',
            context: 'mobile',
            created_at: '2023-06-23T12:24:41.034Z'
          }
        ]
      })

    var payload = {
      id: '4417681',
    };

    var resp = await trxInstance.event(payload);
    expect(getTransactionEventStub).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('data');
    expect(resp).to.have.property('message', 'Transaction events fetched');

    expect(resp.data[0]).to.have.property('note');
    expect(resp.data[0]).to.have.property('actor');
  });

  it('should successfully return transaction fee', async function () {
    this.timeout(10000);

    const getTransactionFeeStub = sinon
      .stub(trxInstance, 'fee')
      .resolves({
        status: 'success',
        message: 'Charged fee',
        data: {
          charge_amount: 1000,
          fee: 14,
          merchant_fee: 0,
          flutterwave_fee: 14,
          stamp_duty_fee: 0,
          currency: 'NGN'
        }
      })

    var payload = {
      amount: 1000,
      currency: "NGN"
    };

    var resp = await trxInstance.fee(payload);
    expect(getTransactionFeeStub).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('data');
    expect(resp).to.have.property('message', 'Charged fee');

    expect(resp.data).to.have.property('charge_amount');
    expect(resp.data).to.have.property('fee');
  });
});
