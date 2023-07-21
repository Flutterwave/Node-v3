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

//   it('should charge a card', async function () {
//     this.timeout(10000);

//     var payload = {
//       public_key: public_key,
//       card_number: '4556052704172643',
//       cvv: '899',
//       expiry_month: '01',
//       expiry_year: '21',
//       currency: 'NGN',
//       amount: '1000',
//       enckey: '611d0eda25a3c931863d92c4',
//       fullname: 'Ekene Eze',
//       email: 'ekene@flw.com',
//       phone_number: '0902620185',
//       tx_ref: 'MC-3ijkguhkiyfsffsujhkj243e',
//       redirect_url: 'https://webhook.site/3ed41e38-2c79-4c79-b455-97398730866c',
//       type: 'card',
//       authorization: {
//         mode: 'avs_noauth',
//         pin: '3310',
//         zipcode: '07205',
//         city: 'Hillside',
//         address: '470 Mundet PI',
//         state: 'NJ',
//         country: 'US',
//       },
//     };

//     var resp = await chargeInstance.card(payload);
//     return expect(resp).to.have.property('data');
//   });

  it('should return charge Nigerian bank accounts', async function () {
    this.timeout(10000);

    const createNGCharge = sinon.stub(chargeInstance, 'ng').resolves({
        "status": "success",
        "message": "Charge initiated",
        "data": {
            "id": 4475057,
            "tx_ref": "MC-1585230ew9v5050e0",
            "flw_ref": "1689845911540-FLW-MOCK-REF",
            "device_fingerprint": "N/A",
            "amount": 300,
            "charged_amount": 300,
            "app_fee": 4.2,
            "merchant_fee": 0,
            "processor_response": "Pending validation",
            "auth_model": "INTERNET_BANKING",
            "currency": "NGN",
            "ip": "54.75.161.64",
            "narration": "Flutterwave Developers",
            "status": "pending",
            "auth_url": "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaid/api/short-url/aqp45TtNl",
            "payment_type": "account",
            "fraud_status": "ok",
            "created_at": "2023-07-20T09:38:31.000Z",
            "account_id": 20937,
            "customer": {
                "id": 2151369,
                "phone_number": "08074568890",
                "name": "john doe",
                "email": "johndoe@gmail.com",
                "created_at": "2023-07-20T09:37:34.000Z"
            },
            "meta": {
                "authorization": {
                    "mode": "redirect",
                    "redirect": "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaid/api/short-url/aqp45TtNl",
                    "validate_instructions": ""
                }
            }
        }
    })

    var payload = {
      "tx_ref":"MC-1585230ew9v5050e0",
      "amount":"300",
      "currency":"NGN",
      "email":"johndoe@gmail.com",
      "phone_number":"08074568890",
      "fullname":"john doe"
    };
    var resp = await chargeInstance.ng(payload);
    expect(createNGCharge).to.have.been.calledOnce;
    expect(createNGCharge).to.have.been.calledOnceWith(payload);

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge initiated');

    expect(resp.data).to.have.property('currency', 'NGN');
    expect(resp.data.meta.authorization).to.have.property('mode', 'redirect');
  });

  it('should return charge with bank transfer', async function () {
    this.timeout(10000);

    const createPWBTCharge = sinon.stub(chargeInstance, 'bank_transfer').resolves({
        "status": "success",
        "message": "Charge initiated",
        "meta": {
            "authorization": {
                "transfer_reference": "MockFLWRef-1689847855598",
                "transfer_account": "0067100155",
                "transfer_bank": "Mock Bank",
                "account_expiration": 1689847855598,
                "transfer_note": "Mock note",
                "transfer_amount": "1500.00",
                "mode": "banktransfer"
            }
        }
    })

    var payload = {
        "tx_ref": "MC-1585230950508",
        "amount": "1500",
        "email": "johnmadakin@gmail.com",
        "phone_number": "054709929220",
        "currency": "NGN",
        "client_ip": "154.123.220.1",
        "device_fingerprint": "62wd23423rq324323qew1",
        "narration": "All star college salary for May",
        "is_permanent": false,
        "expires": 3600
    };
    var resp = await chargeInstance.bank_transfer(payload);
    expect(createPWBTCharge).to.have.been.calledOnce;
    expect(createPWBTCharge).to.have.been.calledOnceWith(payload);

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge initiated');

    expect(resp.meta.authorization).to.have.property('transfer_account');
    expect(resp.meta.authorization).to.have.property('transfer_bank');
    expect(resp.meta.authorization).to.have.property('mode', 'banktransfer');
  });

  it('should return Charge UK & EU bank accounts', async function () {
    this.timeout(10000);

    const createUKCharge = sinon.stub(chargeInstance, 'uk').resolves({
        "status": "success",
        "message": "Charge initiated",
        "data": {
            "id": 4474995,
            "tx_ref": "MC-1585230ew9v5050e8",
            "flw_ref": "LFTT5300124270590",
            "device_fingerprint": "N/A",
            "amount": 10,
            "charged_amount": 10,
            "app_fee": 0.14,
            "merchant_fee": 0,
            "processor_response": "Transaction is pending authentication",
            "auth_model": "TOKEN",
            "currency": "GBP",
            "ip": "52.209.154.143",
            "narration": "Flutterwave Developers",
            "status": "pending",
            "payment_type": "account-ach-uk",
            "fraud_status": "ok",
            "charge_type": "normal",
            "created_at": "2023-07-20T09:22:11.000Z",
            "account_id": 20937,
            "customer": {
                "id": 2151343,
                "phone_number": "07086234518",
                "name": "Olufemi Obafunmiso",
                "email": "olufemi@flw.com",
                "created_at": "2023-07-20T09:22:11.000Z"
            }
        },
        "meta": {
            "authorization": {
                "mode": "redirect",
                "redirect": "https://token-io-fe.dev-flutterwave.com/transactions?reference=LFTT5300124270590"
            }
        }
    });

    var payload = {
        "tx_ref": "MC-1585230ew9v5050e8",
        "amount": "10",
        "currency": "GBP",
        "email": "olufemi@flw.com",
        "phone_number": "0902620185",
        "fullname": "Olufemi Obafunmiso",
        "redirect_url": "https://flutterwave.ng",
        "is_token_io": 1
    };
    var resp = await chargeInstance.uk(payload);
    expect(createUKCharge).to.have.been.calledOnce;
    expect(createUKCharge).to.have.been.calledOnceWith(payload);

    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge initiated');

    expect(resp.data).to.have.property('auth_model', 'TOKEN');
    expect(resp.meta.authorization).to.have.property('mode', 'redirect');
  });
});
