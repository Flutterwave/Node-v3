var charge = require('../lib/rave.charge');
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

describe('#Rave charge', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let chargeInstance;
  let chargeStub;

  beforeEach(() => {
    chargeInstance = new charge(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should charge Nigerian bank accounts', async function () {
    this.timeout(10000);

    const createNGCharge = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 4475057,
          tx_ref: 'MC-1585230ew9v5050e0',
          flw_ref: '1689845911540-FLW-MOCK-REF',
          device_fingerprint: 'N/A',
          amount: 300,
          charged_amount: 300,
          app_fee: 4.2,
          merchant_fee: 0,
          processor_response: 'Pending validation',
          auth_model: 'INTERNET_BANKING',
          currency: 'NGN',
          ip: '54.75.161.64',
          narration: 'Flutterwave Developers',
          status: 'pending',
          auth_url:
            'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaid/api/short-url/aqp45TtNl',
          payment_type: 'account',
          fraud_status: 'ok',
          created_at: '2023-07-20T09:38:31.000Z',
          account_id: 20937,
          customer: {
            id: 2151369,
            phone_number: '08074568890',
            name: 'john doe',
            email: 'johndoe@gmail.com',
            created_at: '2023-07-20T09:37:34.000Z',
          },
          meta: {
            authorization: {
              mode: 'redirect',
              redirect:
                'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaid/api/short-url/aqp45TtNl',
              validate_instructions: '',
            },
          },
        },
      }
    });

    var payload = {
      tx_ref: 'MC-1585230ew9v5050e0',
      amount: '300',
      currency: 'NGN',
      email: 'johndoe@gmail.com',
      phone_number: '08074568890',
      fullname: 'john doe',
    };
    var resp = await chargeInstance.ng(payload);
    expect(createNGCharge).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge initiated');

    expect(resp.data).to.have.property('id', 4475057);
    expect(resp.data.meta.authorization).to.have.property('mode', 'redirect');
  });

  it('testing phone number validation for bank account charge', async function () {
    // This forces execution into the 'catch' logic
    requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 4475057,
          tx_ref: 'MC-1585230ew9v5050e0',
          flw_ref: '1689845911540-FLW-MOCK-REF',
          device_fingerprint: 'N/A',
          amount: 300,
          charged_amount: 300,
          app_fee: 4.2,
          merchant_fee: 0,
          processor_response: 'Pending validation',
          auth_model: 'INTERNET_BANKING',
          currency: 'NGN',
          ip: '54.75.161.64',
          narration: 'Flutterwave Developers',
          status: 'pending',
          auth_url:
            'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaid/api/short-url/aqp45TtNl',
          payment_type: 'account',
          fraud_status: 'ok',
          created_at: '2023-07-20T09:38:31.000Z',
          account_id: 20937,
          customer: {
            id: 2151369,
            phone_number: '08074568890',
            name: 'john doe',
            email: 'johndoe@gmail.com',
            created_at: '2023-07-20T09:37:34.000Z',
          },
          meta: {
            authorization: {
              mode: 'redirect',
              redirect:
                'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaid/api/short-url/aqp45TtNl',
              validate_instructions: '',
            },
          },
        },
      }
    });

    var payload = {
      tx_ref: 'MC-1585230ew9v5050e0',
      amount: '300',
      currency: 'NGN',
      email: 'johndoe@gmail.com',
      phone_number: 'assaasasasasas',
      fullname: 'john doe',
    };

    await expect(chargeInstance.ng(payload))
      .to.be.rejectedWith('phone number should be digits');
    expect(requestStub).to.not.have.been.called;

  });

  it('should return charge with bank transfer', async function () {
    this.timeout(10000);

    const createPWBTCharge = sinon
      .stub(ravebase, 'request')
      .resolves({
        body: {
          status: 'success',
          message: 'Charge initiated',
          meta: {
            authorization: {
              transfer_reference: 'MockFLWRef-1689847855598',
              transfer_account: '0067100155',
              transfer_bank: 'Mock Bank',
              account_expiration: 1689847855598,
              transfer_note: 'Mock note',
              transfer_amount: '1500.00',
              mode: 'banktransfer',
            },
          },
        }
      });

    var payload = {
      tx_ref: 'MC-1585230950508',
      amount: '1500',
      email: 'johnmadakin@gmail.com',
      phone_number: '054709929220',
      currency: 'NGN',
      client_ip: '154.123.220.1',
      device_fingerprint: '62wd23423rq324323qew1',
      expires: 3600,
    };
    var resp = await chargeInstance.bank_transfer(payload);
    expect(createPWBTCharge).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge initiated');

    expect(resp.meta.authorization).to.have.property('transfer_account');
    expect(resp.meta.authorization).to.have.property('transfer_bank');
    expect(resp.meta.authorization).to.have.property('mode', 'banktransfer');
  });
  
  it('should validate phone number for bank transfer charge', async function () {
    this.timeout(10000);

    const createPWBTCharge = sinon
      .stub(ravebase, 'request')
      .resolves({
        body: {
          status: 'success',
          message: 'Charge initiated',
          meta: {
            authorization: {
              transfer_reference: 'MockFLWRef-1689847855598',
              transfer_account: '0067100155',
              transfer_bank: 'Mock Bank',
              account_expiration: 1689847855598,
              transfer_note: 'Mock note',
              transfer_amount: '1500.00',
              mode: 'banktransfer',
            },
          },
        }
      });

    var payload = {
      tx_ref: 'MC-1585230950508',
      amount: '1500',
      email: 'johnmadakin@gmail.com',
      phone_number: 'fddfdfdfddfdf',
      currency: 'NGN',
      client_ip: '154.123.220.1',
      device_fingerprint: '62wd23423rq324323qew1',
      expires: 3600,
    };
    await expect(chargeInstance.bank_transfer(payload))
      .to.be.rejectedWith('phone number should be digits');
    expect(createPWBTCharge).to.not.have.been.called;
  });
  
  it('should return USSD charge', async function () {
    this.timeout(10000);

    const createUssdCharge = sinon
      .stub(ravebase, 'request')
      .resolves({
        body: {
          "status": "success",
          "message": "Charge initiated",
          "data": {
            "id": 9956412,
            "tx_ref": "MC-15852309v5050e8",
            "flw_ref": "flwm3s4m0c1769004659672",
            "device_fingerprint": "62wd23423rq324323qew1",
            "amount": 5000,
            "charged_amount": 5000,
            "app_fee": 170,
            "merchant_fee": 0,
            "processor_response": "Transaction in progress",
            "auth_model": "USSD",
            "currency": "NGN",
            "ip": "you",
            "narration": "Dotuns Fashion Limited",
            "status": "pending",
            "payment_type": "ussd",
            "fraud_status": "ok",
            "charge_type": "normal",
            "created_at": "2026-01-21T14:10:59.000Z",
            "account_id": 92319,
            "customer": {
              "id": 3451768,
              "phone_number": "07054748747",
              "name": "Dotuns Fashion Limited",
              "email": "ravesb_f5196adeedf522b7d710_dcracker.dt@gmail.com",
              "created_at": "2026-01-21T14:10:59.000Z"
            },
            "payment_code": "9956412"
          },
          "meta": {
            "authorization": {
              "mode": "ussd",
              "note": "*566*002*9956412#"
            }
          }
        }
      });

    var payload = {
      tx_ref: "MC-15852309v5050e8",
      account_bank: "044",
      amount: "5000",
      currency: "NGN",
      email: "dcracker.dt@gmail.com",
      phone_number: "07054748747",
      fullname: "James Bond",
      client_ip: "192.168.1.1",
      device_fingerprint: "62wd23423rq324323qew1"
    };
    
    var resp = await chargeInstance.ussd(payload);
    expect(createUssdCharge).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge initiated');

    expect(resp.meta.authorization).to.have.property('mode');
    expect(resp.meta.authorization).to.have.property('note');
    expect(resp.meta.authorization).to.have.property('mode', 'ussd');
  });

  it('should validate phone number for USSD charge', async function () {
    this.timeout(10000);

    const createUssdCharge = sinon
      .stub(ravebase, 'request')
      .resolves({
        body: {
          "status": "success",
          "message": "Charge initiated",
          "data": {
            "id": 9956412,
            "tx_ref": "MC-15852309v5050e8",
            "flw_ref": "flwm3s4m0c1769004659672",
            "device_fingerprint": "62wd23423rq324323qew1",
            "amount": 5000,
            "charged_amount": 5000,
            "app_fee": 170,
            "merchant_fee": 0,
            "processor_response": "Transaction in progress",
            "auth_model": "USSD",
            "currency": "NGN",
            "ip": "you",
            "narration": "Dotuns Fashion Limited",
            "status": "pending",
            "payment_type": "ussd",
            "fraud_status": "ok",
            "charge_type": "normal",
            "created_at": "2026-01-21T14:10:59.000Z",
            "account_id": 92319,
            "customer": {
              "id": 3451768,
              "phone_number": "07054748747",
              "name": "Dotuns Fashion Limited",
              "email": "ravesb_f5196adeedf522b7d710_dcracker.dt@gmail.com",
              "created_at": "2026-01-21T14:10:59.000Z"
            },
            "payment_code": "9956412"
          },
          "meta": {
            "authorization": {
              "mode": "ussd",
              "note": "*566*002*9956412#"
            }
          }
        }
      });

    var payload = {
      tx_ref: "MC-15852309v5050e8",
      account_bank: "044",
      amount: "5000",
      currency: "NGN",
      email: "dcracker.dt@gmail.com",
      phone_number: "ereererererer",
      fullname: "James Bond",
      client_ip: "192.168.1.1",
      device_fingerprint: "62wd23423rq324323qew1"
    };
    await expect(chargeInstance.ussd(payload)).to.be.rejectedWith('phone number should be digits');
    expect(createUssdCharge).to.not.have.been.called;
  });

  it('should validate a card charge', async function () {
    this.timeout(10000);

    const validateCharge = sinon
      .stub(ravebase, 'request')
      .resolves({
        body: {
          "status": "success",
          "message": "Charge validated",
          "data": {
            "id": 288200108,
            "tx_ref": "LiveCardTest",
            "flw_ref": "FLW275407301",
            "device_fingerprint": "N/A",
            "amount": 100,
            "charged_amount": 100,
            "app_fee": 1.4,
            "merchant_fee": 0,
            "processor_response": "Approved by Financial Institution",
            "auth_model": "PIN",
            "currency": "NGN",
            "ip": "::ffff:10.5.179.3",
            "narration": "CARD Transaction ",
            "status": "successful",
            "auth_url": "N/A",
            "payment_type": "card",
            "fraud_status": "ok",
            "charge_type": "normal",
            "created_at": "2020-07-15T14:31:16.000Z",
            "account_id": 17321,
            "customer": {
              "id": 216519823,
              "phone_number": null,
              "name": "Yemi Desola",
              "email": "user@gmail.com",
              "created_at": "2020-07-15T14:31:15.000Z"
            },
            "card": {
              "first_6digits": "232343",
              "last_4digits": "4567",
              "issuer": "VERVE FIRST CITY MONUMENT BANK PLC",
              "country": "NG",
              "type": "VERVE",
              "expiry": "03/23"
            }
          }
        }
      });

    var payload = {
      otp: "1234567",
      flw_ref: "FLW247999960",
      type: "card"
    };
    var resp = await chargeInstance.validate(payload);
    expect(validateCharge).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge validated');

    expect(resp.data).to.have.property('status');
    expect(resp.data).to.have.property('status', 'successful');
  });

  it('should return Charge UK & EU bank accounts', async function () {
    this.timeout(10000);

    const createUKCharge = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 4474995,
          tx_ref: 'MC-1585230ew9v5050e8',
          flw_ref: 'LFTT5300124270590',
          device_fingerprint: 'N/A',
          amount: 10,
          charged_amount: 10,
          app_fee: 0.14,
          merchant_fee: 0,
          processor_response: 'Transaction is pending authentication',
          auth_model: 'TOKEN',
          currency: 'GBP',
          ip: '52.209.154.143',
          narration: 'Flutterwave Developers',
          status: 'pending',
          payment_type: 'account-ach-uk',
          fraud_status: 'ok',
          charge_type: 'normal',
          created_at: '2023-07-20T09:22:11.000Z',
          account_id: 20937,
          customer: {
            id: 2151343,
            phone_number: '07086234518',
            name: 'Olufemi Obafunmiso',
            email: 'olufemi@flw.com',
            created_at: '2023-07-20T09:22:11.000Z',
          },
        },
        meta: {
          authorization: {
            mode: 'redirect',
            redirect:
              'https://token-io-fe.dev-flutterwave.com/transactions?reference=LFTT5300124270590',
          },
        },
      }
    });

    var payload = {
      tx_ref: 'MC-1585230ew9v5050e8',
      amount: '10',
      currency: 'GBP',
      email: 'olufemi@flw.com',
      phone_number: '0902620185',
      fullname: 'Olufemi Obafunmiso',
      redirect_url: 'https://flutterwave.ng',
      is_token_io: 1,
    };
    var resp = await chargeInstance.uk(payload);
    expect(createUKCharge).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge initiated');

    expect(resp.data).to.have.property('auth_model', 'TOKEN');
    expect(resp.meta.authorization).to.have.property('mode', 'redirect');
  });

  it('should return Unauthorized Googlepay charge', async function () {
    this.timeout(10000);

    const createGooglePayCharge = sinon
      .stub(ravebase, 'request')
      .resolves({
        body: {
          status: 'error',
          message: 'Merchant is not enabled to accept googlepay transactions.',
          data: null,
        }
      });

    var payload = {
      tx_ref: 'MC-TEST-1234568_success_mock',
      amount: '10',
      currency: 'USD',
      email: 'user@example.com',
      fullname: 'Yolande Aglaé Colbert',
      redirect_url: 'https://flutterwave.ng',
      client_ip: '192.168.0.1',
      device_fingerprint: 'gdgdhdh738bhshsjs',
      billing_zip: '15101',
      billing_city: 'allison park',
      billing_address: '3563 Huntertown Rd',
      billing_state: 'Pennsylvania',
      billing_country: 'US',
      meta: {
        metaname: 'testmeta',
        metavalue: 'testvalue',
      },
    };
    var resp = await chargeInstance.googlepay(payload);
    expect(createGooglePayCharge).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'error');
    expect(resp).to.have.property(
      'message',
      'Merchant is not enabled to accept googlepay transactions.',
    );
    expect(resp).to.have.property('data', null);
  });

  it('should return Googlepay charge', async function () {
    this.timeout(10000);

    const createGooglePayCharge = sinon
      .stub(ravebase, 'request')
      .resolves({
        body: {
          status: 'success',
          message: 'Charge initiated',
          data: {
            id: 2615403,
            tx_ref: 'MC-TEST-1234568_success_mock',
            flw_ref: 'RQFA6549001367743',
            device_fingerprint: 'gdgdhdh738bhshsjs',
            amount: 10,
            charged_amount: 10,
            app_fee: 0.38,
            merchant_fee: 0,
            processor_response: 'Payment token retrieval has been initiated',
            auth_model: 'GOOGLEPAY_NOAUTH',
            currency: 'USD',
            ip: '54.75.56.55',
            narration: 'Test Google Pay charge',
            status: 'pending',
            auth_url:
              'https://rave-api-v2.herokuapp.com/flwv3-pug/getpaid/api/short-url/XPtNw-WkQ',
            payment_type: 'googlepay',
            fraud_status: 'ok',
            charge_type: 'normal',
            created_at: '2022-05-11T20:36:15.000Z',
            account_id: 20937,
            customer: {
              id: 955307,
              phone_number: null,
              name: 'Yolande Aglaé Colbert',
              email: 'user@example.com',
              created_at: '2022-05-11T20:36:14.000Z',
            },
            meta: {
              authorization: {
                mode: 'redirect',
                redirect:
                  'https://rave-api-v2.herokuapp.com/flwv3-pug/getpaid/api/short-url/XPtNw-WkQ',
              },
            },
          },
        }
      });

    var payload = {
      tx_ref: 'MC-TEST-1234568_success_mock',
      amount: '10',
      currency: 'USD',
      email: 'user@example.com',
      fullname: 'Yolande Aglaé Colbert',
      redirect_url: 'https://flutterwave.ng',
      client_ip: '192.168.0.1',
      device_fingerprint: 'gdgdhdh738bhshsjs',
      billing_zip: '15101',
      billing_city: 'allison park',
      billing_address: '3563 Huntertown Rd',
      billing_state: 'Pennsylvania',
      billing_country: 'US',
      meta: {
        metaname: 'testmeta',
        metavalue: 'testvalue',
      },
    };
    var resp = await chargeInstance.googlepay(payload);
    expect(createGooglePayCharge).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge initiated');

    expect(resp.data).to.have.property('auth_model', 'GOOGLEPAY_NOAUTH');
    expect(resp.data.meta.authorization).to.have.property('mode', 'redirect');
  });

  it('should validate phone number for Googlepay charge', async function () {
    this.timeout(10000);

    const createGooglePayCharge = sinon
      .stub(ravebase, 'request')
      .resolves({
        body: {
          status: 'success',
          message: 'Charge initiated',
          data: {
            id: 2615403,
            tx_ref: 'MC-TEST-1234568_success_mock',
            flw_ref: 'RQFA6549001367743',
            device_fingerprint: 'gdgdhdh738bhshsjs',
            amount: 10,
            charged_amount: 10,
            app_fee: 0.38,
            merchant_fee: 0,
            processor_response: 'Payment token retrieval has been initiated',
            auth_model: 'GOOGLEPAY_NOAUTH',
            currency: 'USD',
            ip: '54.75.56.55',
            narration: 'Test Google Pay charge',
            status: 'pending',
            auth_url:
              'https://rave-api-v2.herokuapp.com/flwv3-pug/getpaid/api/short-url/XPtNw-WkQ',
            payment_type: 'googlepay',
            fraud_status: 'ok',
            charge_type: 'normal',
            created_at: '2022-05-11T20:36:15.000Z',
            account_id: 20937,
            customer: {
              id: 955307,
              phone_number: null,
              name: 'Yolande Aglaé Colbert',
              email: 'user@example.com',
              created_at: '2022-05-11T20:36:14.000Z',
            },
            meta: {
              authorization: {
                mode: 'redirect',
                redirect:
                  'https://rave-api-v2.herokuapp.com/flwv3-pug/getpaid/api/short-url/XPtNw-WkQ',
              },
            },
          },
        }
      });

    var payload = {
      tx_ref: 'MC-TEST-1234568_success_mock',
      amount: '10',
      phone_number: "ferfeefrerrefrefre",
      currency: 'USD',
      email: 'user@example.com',
      fullname: 'Yolande Aglaé Colbert',
      redirect_url: 'https://flutterwave.ng',
      client_ip: '192.168.0.1',
      device_fingerprint: 'gdgdhdh738bhshsjs',
      billing_zip: '15101',
      billing_city: 'allison park',
      billing_address: '3563 Huntertown Rd',
      billing_state: 'Pennsylvania',
      billing_country: 'US',
      meta: {
        metaname: 'testmeta',
        metavalue: 'testvalue',
      },
    };

    await expect(chargeInstance.googlepay(payload)).to.be.rejectedWith('phone number should be digits');

    expect(createGooglePayCharge).to.not.have.been.called;
  });

  it('should return ValidationError for Googlepay charge', async function () {
    this.timeout(10000);

    var payload = {
      tx_ref: 'MC-TEST-1234568_success_mock',
      amount: '10',
      email: 'user@example.com',
      fullname: 'Yolande Aglaé Colbert',
      redirect_url: 'https://flutterwave.ng',
      client_ip: '192.168.0.1',
      device_fingerprint: 'gdgdhdh738bhshsjs',
      billing_zip: '15101',
      billing_city: 'allison park',
      billing_address: '3563 Huntertown Rd',
      billing_state: 'Pennsylvania',
      billing_country: 'US',
      meta: {
        metaname: 'testmeta',
        metavalue: 'testvalue',
      },
    };

    try {
      var resp = await chargeInstance.googlepay(payload);
    } catch (err) {
      expect(err).to.be.returned;
      expect(err.message).to.include('"currency" is required');
    }
  });

  it('should return Unauthorized applepay charge', async function () {
    this.timeout(10000);

    const createApplePayCharge = sinon
      .stub(ravebase, 'request')
      .resolves({
        body: {
          status: 'error',
          message: 'Merchant is not enabled for ApplePay collections.',
          data: null,
        }
      });

    var payload = {
      tx_ref: 'MC-TEST-123456',
      amount: '10',
      currency: 'USD',
      email: 'user@example.com',
      fullname: 'Yolande Aglaé Colbert',
      redirect_url: 'https://flutterwave.ng',
      client_ip: '192.168.0.1',
      device_fingerprint: 'gdgdhdh738bhshsjs',
      billing_zip: '15101',
      billing_city: 'allison park',
      billing_address: '3563 Huntertown Rd',
      billing_state: 'Pennsylvania',
      billing_country: 'US',
      phone_number: '09012345678',
      meta: {
        metaname: 'testmeta',
        metavalue: 'testvalue',
      },
    };
    var resp = await chargeInstance.applepay(payload);
    expect(createApplePayCharge).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'error');
    expect(resp).to.have.property(
      'message',
      'Merchant is not enabled for ApplePay collections.',
    );
    expect(resp).to.have.property('data', null);
  });

  it('should return Applepay charge', async function () {
    this.timeout(10000);

    const createApplePayCharge = sinon
      .stub(ravebase, 'request')
      .resolves({
        body: {
          status: 'success',
          message: 'Charge initiated',
          data: {
            id: 645498756,
            tx_ref: 'MC-TEST-1234523',
            flw_ref: 'TKVH48681032738026',
            device_fingerprint: 'gdgdhdh738bhshsjs',
            amount: 1,
            charged_amount: 1.04,
            app_fee: 0.04,
            merchant_fee: 0,
            processor_response: 'Pending validation',
            auth_model: 'APPLEPAY',
            currency: 'GBP',
            ip: '192.168.0.1',
            narration: 'Test payment',
            status: 'pending',
            auth_url:
              'https://applepay.aq2-flutterwave.com?reference=TKVH48681032738026',
            payment_type: 'applepay',
            fraud_status: 'ok',
            charge_type: 'normal',
            created_at: '2022-06-11T12:18:11.000Z',
            account_id: 3442,
            customer: {
              id: 379560157,
              phone_number: '09012345678',
              name: 'Flutterwave Developers',
              email: 'developers@flutterwavego.com',
              created_at: '2022-06-11T12:18:11.000Z',
            },
            meta: {
              authorization: {
                mode: 'redirect',
                redirect:
                  'https://applepay.aq2-flutterwave.com?reference=TKVH48681032738026',
              },
            },
          },
        }
      });

    var payload = {
      tx_ref: 'MC-TEST-123456',
      amount: '10',
      currency: 'USD',
      email: 'user@example.com',
      fullname: 'Yolande Aglaé Colbert',
      redirect_url: 'https://flutterwave.ng',
      client_ip: '192.168.0.1',
      device_fingerprint: 'gdgdhdh738bhshsjs',
      billing_zip: '15101',
      billing_city: 'allison park',
      billing_address: '3563 Huntertown Rd',
      billing_state: 'Pennsylvania',
      billing_country: 'US',
      phone_number: '09012345678',
      meta: {
        metaname: 'testmeta',
        metavalue: 'testvalue',
      },
    };
    var resp = await chargeInstance.applepay(payload);
    expect(createApplePayCharge).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge initiated');

    expect(resp.data).to.have.property('auth_model', 'APPLEPAY');
    expect(resp.data.meta.authorization).to.have.property('mode', 'redirect');
  });

  it('should validate phone number for Applepay charge', async function () {
    this.timeout(10000);

    const createApplePayCharge = sinon
      .stub(ravebase, 'request')
      .resolves({
        body: {
          status: 'success',
          message: 'Charge initiated',
          data: {
            id: 645498756,
            tx_ref: 'MC-TEST-1234523',
            flw_ref: 'TKVH48681032738026',
            device_fingerprint: 'gdgdhdh738bhshsjs',
            amount: 1,
            charged_amount: 1.04,
            app_fee: 0.04,
            merchant_fee: 0,
            processor_response: 'Pending validation',
            auth_model: 'APPLEPAY',
            currency: 'GBP',
            ip: '192.168.0.1',
            narration: 'Test payment',
            status: 'pending',
            auth_url:
              'https://applepay.aq2-flutterwave.com?reference=TKVH48681032738026',
            payment_type: 'applepay',
            fraud_status: 'ok',
            charge_type: 'normal',
            created_at: '2022-06-11T12:18:11.000Z',
            account_id: 3442,
            customer: {
              id: 379560157,
              phone_number: '09012345678',
              name: 'Flutterwave Developers',
              email: 'developers@flutterwavego.com',
              created_at: '2022-06-11T12:18:11.000Z',
            },
            meta: {
              authorization: {
                mode: 'redirect',
                redirect:
                  'https://applepay.aq2-flutterwave.com?reference=TKVH48681032738026',
              },
            },
          },
        }
      });

    var payload = {
      tx_ref: 'MC-TEST-123456',
      amount: '10',
      currency: 'USD',
      email: 'user@example.com',
      fullname: 'Yolande Aglaé Colbert',
      redirect_url: 'https://flutterwave.ng',
      client_ip: '192.168.0.1',
      device_fingerprint: 'gdgdhdh738bhshsjs',
      billing_zip: '15101',
      billing_city: 'allison park',
      billing_address: '3563 Huntertown Rd',
      billing_state: 'Pennsylvania',
      billing_country: 'US',
      phone_number: 'erreferfrereerr',
      meta: {
        metaname: 'testmeta',
        metavalue: 'testvalue',
      },
    };

    await expect(chargeInstance.applepay(payload)).to.be.rejectedWith('phone number should be digits');

    expect(createApplePayCharge).to.not.have.been.called;
  });

  it('should return ValidationError for Applepay charge', async function () {
    this.timeout(10000);

    var payload = {
      tx_ref: 'MC-TEST-123456',
      amount: '10',
      email: 'user@example.com',
      fullname: 'Yolande Aglaé Colbert',
      redirect_url: 'https://flutterwave.ng',
      client_ip: '192.168.0.1',
      device_fingerprint: 'gdgdhdh738bhshsjs',
      billing_zip: '15101',
      billing_city: 'allison park',
      billing_address: '3563 Huntertown Rd',
      billing_state: 'Pennsylvania',
      billing_country: 'US',
      phone_number: '09012345678',
      meta: {
        metaname: 'testmeta',
        metavalue: 'testvalue',
      },
    };

    try {
      var resp = await chargeInstance.applepay(payload);
    } catch (err) {
      expect(err).to.be.returned;
      expect(err.message).to.include('"currency" is required');
    }
  });

  it('should return Unauthorized eNaira charge', async function () {
    this.timeout(10000);

    const createeNairaCharge = sinon.stub(ravebase, 'request').resolves({
      body:
      {
        status: 'error',
        message: 'Merchant is not enabled for eNaira collections.',
        data: null,
      }
    });

    var payload = {
      tx_ref: 'MC-TEST-123456',
      amount: '100',
      currency: 'NGN',
      email: 'user@example.com',
      fullname: 'Yemi Desola',
      phone_number: '09000000000',
      redirect_url: 'https://flutterwave.ng',
    };
    var resp = await chargeInstance.enaira(payload);
    expect(createeNairaCharge).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'error');
    expect(resp).to.have.property(
      'message',
      'Merchant is not enabled for eNaira collections.',
    );
    expect(resp).to.have.property('data', null);
  });

  it('should return eNaira charge', async function () {
    this.timeout(10000);

    const createeNairaCharge = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 4197118,
          tx_ref: '12345test_05',
          flw_ref: 'ZZYO0021678723801871881',
          device_fingerprint: 'N/A',
          amount: 200,
          charged_amount: 200,
          app_fee: 2.8,
          merchant_fee: 0,
          processor_response: 'pending',
          auth_model: 'ENAIRA',
          currency: 'NGN',
          ip: '54.75.161.64',
          narration: 'Flutterwave Developers',
          status: 'pending',
          payment_type: 'enaira',
          fraud_status: 'ok',
          charge_type: 'normal',
          created_at: '2023-03-13T16:10:00.000Z',
          account_id: 20937,
          customer: {
            id: 1953337,
            phone_number: '08092269174',
            name: 'Wisdom Joshua',
            email: 'wsdmjsh@gmail.com',
            created_at: '2023-01-18T13:22:14.000Z',
          },
          meta: {
            authorization: {
              mode: 'redirect',
              redirect:
                'https://camltest.azurewebsites.net/enairapay/?invoiceId=01GVDVRTG80MVSRJJQQYRFTZK3&amount=200&token=438890',
            },
          },
        },
      }
    });

    var payload = {
      tx_ref: 'MC-TEST-123456',
      amount: '100',
      currency: 'NGN',
      email: 'user@example.com',
      fullname: 'Yemi Desola',
      phone_number: '09000000000',
      redirect_url: 'https://flutterwave.ng',
    };
    var resp = await chargeInstance.enaira(payload);
    expect(createeNairaCharge).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge initiated');

    expect(resp.data).to.have.property('auth_model', 'ENAIRA');
    expect(resp.data.meta.authorization).to.have.property('mode', 'redirect');
  });

  it('should validate phone number for eNaira charge', async function () {
    this.timeout(10000);

    const createeNairaCharge = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 4197118,
          tx_ref: '12345test_05',
          flw_ref: 'ZZYO0021678723801871881',
          device_fingerprint: 'N/A',
          amount: 200,
          charged_amount: 200,
          app_fee: 2.8,
          merchant_fee: 0,
          processor_response: 'pending',
          auth_model: 'ENAIRA',
          currency: 'NGN',
          ip: '54.75.161.64',
          narration: 'Flutterwave Developers',
          status: 'pending',
          payment_type: 'enaira',
          fraud_status: 'ok',
          charge_type: 'normal',
          created_at: '2023-03-13T16:10:00.000Z',
          account_id: 20937,
          customer: {
            id: 1953337,
            phone_number: '08092269174',
            name: 'Wisdom Joshua',
            email: 'wsdmjsh@gmail.com',
            created_at: '2023-01-18T13:22:14.000Z',
          },
          meta: {
            authorization: {
              mode: 'redirect',
              redirect:
                'https://camltest.azurewebsites.net/enairapay/?invoiceId=01GVDVRTG80MVSRJJQQYRFTZK3&amount=200&token=438890',
            },
          },
        },
      }
    });

    var payload = {
      tx_ref: 'MC-TEST-123456',
      amount: '100',
      currency: 'NGN',
      email: 'user@example.com',
      fullname: 'Yemi Desola',
      phone_number: 'fdfdfdfdfdfdf',
      redirect_url: 'https://flutterwave.ng',
    };
    await expect(chargeInstance.enaira(payload)).to.be.rejectedWith('phone number should be digits');
    expect(createeNairaCharge).to.not.have.been.called;
  });

  it('should return ValidationError for eNaira charge', async function () {
    this.timeout(10000);

    var payload = {
      tx_ref: 'MC-TEST-123456',
      amount: '100',
      email: 'user@example.com',
      fullname: 'Yemi Desola',
      phone_number: '09000000000',
      redirect_url: 'https://flutterwave.ng',
    };

    try {
      var resp = await chargeInstance.enaira(payload);
    } catch (err) {
      expect(err).to.be.returned;
      expect(err.message).to.include('"currency" is required');
    }
  });

  it('should return Fawrypay charge', async function () {
    this.timeout(10000);

    const createFawryPayCharge = sinon
      .stub(ravebase, 'request')
      .resolves({
        body: {
          status: 'success',
          message: 'Charge initiated',
          data: {
            id: 4511926,
            tx_ref: 'fawrySample1',
            order_ref: 'URF_FAWRY_1691396932978_2086335',
            flw_ref: '9263673349',
            device_fingerprint: 'N/A',
            amount: 10,
            charged_amount: 10,
            app_fee: 0.23,
            merchant_fee: 0,
            processor_response: 'Request is pending',
            currency: 'EGP',
            narration: 'Flutterwave Developers',
            status: 'pending',
            auth_url: 'N/A',
            payment_type: 'fawry_pay',
            fraud_status: 'ok',
            charge_type: 'normal',
            created_at: '2023-08-07T08:28:52.000Z',
            account_id: 20937,
            customer: {
              id: 1869436,
              phone_number: '09012345678',
              name: 'Anonymous customer',
              email: 'user@flw.com',
              created_at: '2022-10-30T22:25:31.000Z',
            },
          },
          meta: {
            authorization: {
              mode: 'fawry_pay',
              instruction:
                'Please make payment with the flw_ref returned in the response which should be the same as the reference sent via SMS',
            },
          },
        }
      });

    var payload = {
      tx_ref: 'fawrySample1',
      amount: '10',
      email: 'user@flw.com',
      currency: 'EGP',
      phone_number: '09012345678',
      redirect_url: 'https://www.flutterwave.com',
      meta: {
        name: 'Cornelius',
      },
    };
    var resp = await chargeInstance.fawrypay(payload);
    expect(createFawryPayCharge).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge initiated');

    expect(resp.data).to.have.property('payment_type', 'fawry_pay');
    expect(resp.meta.authorization).to.have.property('mode', 'fawry_pay');
  });

  it('should return Unauthorized Fawrypay charge', async function () {
    this.timeout(10000);

    const createFawryPayCharge = sinon
      .stub(ravebase, 'request')
      .resolves({
        body: {
          status: 'error',
          message: 'Merchant is not enabled for Fawry Pay collections.',
          data: null,
        }
      });

    var payload = {
      tx_ref: 'fawrySample1',
      amount: '10',
      email: 'user@flw.com',
      currency: 'EGP',
      phone_number: '09012345678',
      redirect_url: 'https://www.flutterwave.com',
      meta: {
        name: 'Cornelius',
      },
    };
    var resp = await chargeInstance.fawrypay(payload);
    expect(createFawryPayCharge).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'error');
    expect(resp).to.have.property(
      'message',
      'Merchant is not enabled for Fawry Pay collections.',
    );
    expect(resp).to.have.property('data', null);
  });

  it('should return ValidationError for Fawrypay charge', async function () {
    this.timeout(10000);

    var payload = {
      tx_ref: 'fawrySample1',
      amount: '10',
      email: 'user@flw.com',
      phone_number: '09012345678',
      redirect_url: 'https://www.flutterwave.com',
      meta: {
        name: 'Cornelius',
      },
    };

    try {
      var resp = await chargeInstance.fawrypay(payload);
    } catch (err) {
      expect(err).to.be.returned;
      expect(err.message).to.include('"currency" is required');
    }
  });

  it('should return charge into collection subaccounts', async function () {
    this.timeout(10000);

    const createCardChargeStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Successful',
        data: {
          id: 4918672,
          tx_ref: 'MC-3243e000',
          flw_ref: 'FLW-MOCK-365702bdb12af7938bdd02860caf2bc2',
          device_fingerprint: 'N/A',
          amount: 100,
          charged_amount: 100,
          app_fee: 1.4,
          merchant_fee: 0,
          processor_response:
            'Please enter the OTP sent to your mobile number 080****** and email te**@rave**.com',
          auth_model: 'NOAUTH',
          currency: 'NGN',
          ip: '54.75.161.64',
          narration: 'CARD Transaction ',
          status: 'successful',
          auth_url:
            'https://ravesandboxapi.flutterwave.com/mockvbvpage?ref=FLW-MOCK-365702bdb12af7938bdd02860caf2bc2&code=00&message=Approved.%20Successful&receiptno=RN1708329200239',
          payment_type: 'card',
          plan: null,
          fraud_status: 'ok',
          charge_type: 'normal',
          created_at: '2024-02-19T07:53:20.000Z',
          account_id: 20937,
          customer: {
            id: 2356420,
            phone_number: null,
            name: 'Yolande Aglaé',
            email: 'user@example.com',
            created_at: '2024-02-19T07:53:20.000Z',
          },
          card: {
            first_6digits: '553188',
            last_4digits: '2950',
            issuer: 'MASTERCARD  CREDIT',
            country: 'NG',
            type: 'MASTERCARD',
            expiry: '09/32',
          },
        },
      },
    });

    var payload = {
      card_number: '5531886652142950',
      cvv: '564',
      expiry_month: '09',
      expiry_year: '32',
      currency: 'NGN',
      amount: '100',
      fullname: 'Yolande Aglaé Colbert',
      email: 'user@example.com',
      tx_ref: 'MC-3243e000',
      redirect_url: 'https://www,flutterwave.ng',
      enckey: process.env.ENCRYPTION_KEY,
      subaccounts: [
        {
          id: 'RS_93667D2B73110DFFEF8449A8A0A32415',
          transaction_split_ratio: 2,
          transaction_charge_type: 'flat',
          transaction_charge: 100,
        }
      ],
    };
    var resp = await chargeInstance.card(payload);
    expect(createCardChargeStub).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');

    expect(resp.data).to.have.property('status', 'successful');
  });

  it('should create an ACH charge', async function () {
    this.timeout(10000);

    const createACHCharge = sinon.stub(ravebase, 'request').resolves({
      body:
      {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 8473445,
          tx_ref: 'YOUR_UNIQUE_REFERENCE_001',
          flw_ref: '1743062863530-FLW-MOCK-REF',
          device_fingerprint: 'N/A',
          amount: 100,
          charged_amount: 100,
          app_fee: null,
          merchant_fee: 0,
          processor_response: 'Pending validation',
          auth_model: 'AUTH',
          currency: 'ZAR',
          ip: '52.209.154.143',
          narration: 'Flutterwave Developers',
          status: 'pending',
          auth_url:
            'https://ravesandboxapi.flutterwave.com/ozow_page?transactionIdentifier=1743062863530-FLW-MOCK-REF&responsecode=00&responsemessage=Successful&transactionreference=1743062863530-FLW-MOCK-REF',
          payment_type: 'account',
          fraud_status: 'ok',
          created_at: '2025-03-27T08:07:43.000Z',
          account_id: 20937,
          customer: {
            id: 2611309,
            phone_number: '08056789051',
            name: 'John Doe',
            email: 'user@example.com',
            created_at: '2025-03-27T08:05:00.000Z',
          },
          account: {
            account_number: '0000000000',
            bank_code: '000',
            first_name: 'John',
            last_name: 'Doe',
          },
          meta: {
            authorization: {
              mode: 'redirect',
              redirect:
                'https://ravesandboxapi.flutterwave.com/ozow_page?transactionIdentifier=1743062863530-FLW-MOCK-REF&responsecode=00&responsemessage=Successful&transactionreference=1743062863530-FLW-MOCK-REF',
              validate_instructions: '',
            },
          },
        },
      },
    });

    var payload = {
      tx_ref: 'TRX_UNIQUE_01',
      amount: '100',
      currency: 'ZAR',
      country: 'ZA',
      email: 'user@example.com',
      phone_number: '08056789051',
      fullname: 'John Doe',
    };
    var resp = await chargeInstance.ach(payload);
    expect(createACHCharge).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge initiated');

    expect(resp.data.meta.authorization).to.have.property('mode', 'redirect');
  });

  it('should create an ACH charge for a specific SA bank', async function () {
    this.timeout(10000);

    const createACHCharge = sinon.stub(ravebase, 'request').resolves({
      body:
      {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 8473455,
          tx_ref: 'YOUR_UNIQUE_REFERENCE_02',
          flw_ref: '1743063355241-FLW-MOCK-REF',
          device_fingerprint: 'N/A',
          amount: 100,
          charged_amount: 100,
          app_fee: null,
          merchant_fee: 0,
          processor_response: 'Pending validation',
          auth_model: 'AUTH',
          currency: 'ZAR',
          ip: '54.75.161.64',
          narration: 'Flutterwave Developers',
          status: 'pending',
          auth_url:
            'https://ravesandboxapi.flutterwave.com/ozow_page?transactionIdentifier=1743063355241-FLW-MOCK-REF&responsecode=00&responsemessage=Successful&transactionreference=1743063355241-FLW-MOCK-REF',
          payment_type: 'account',
          fraud_status: 'ok',
          created_at: '2025-03-27T08:15:54.000Z',
          account_id: 20937,
          customer: {
            id: 2611309,
            phone_number: '08056789051',
            name: 'John Doe',
            email: 'user@example.com',
            created_at: '2025-03-27T08:05:00.000Z',
          },
          account: {
            account_number: '0000000000',
            bank_code: '000',
            first_name: 'John',
            last_name: 'Doe',
          },
          meta: {
            authorization: {
              mode: 'redirect',
              redirect:
                'https://ravesandboxapi.flutterwave.com/ozow_page?transactionIdentifier=1743063355241-FLW-MOCK-REF&responsecode=00&responsemessage=Successful&transactionreference=1743063355241-FLW-MOCK-REF',
              validate_instructions: '',
            },
          },
        },
      }
    });

    var payload = {
      tx_ref: 'YOUR_UNIQUE_REFERENCE_02',
      amount: '100',
      currency: 'ZAR',
      country: 'ZA',
      email: 'user@example.com',
      phone_number: '08056789051',
      fullname: 'John Doe',
      sa_bank_code: 'ABSA',
    };
    var resp = await chargeInstance.ach(payload);
    expect(createACHCharge).to.have.been.calledOnce;

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge initiated');

    expect(resp.data.meta.authorization).to.have.property('mode', 'redirect');
  });
});
