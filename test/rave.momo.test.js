var charge = require('../lib/rave.mobile_money');
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

describe('#Rave Mobile Money', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let momoInstance;
  let momoStub;

  beforeEach(() => {
    momoInstance = new charge(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should successfully charge GHS MoMo ', async function () {
    this.timeout(10000);

    const createGHSMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        meta: {
          authorization: {
            redirect:
              'https://ravemodal-dev.herokuapp.com/captcha/verify/83940:dede0352930befaac522ca71e969f0e2',
            mode: 'redirect',
          },
        },
      },
    });

    var payload = {
      phone_number: '054709929220',
      amount: 1500,
      currency: 'GHS',
      network: 'VODAFONE',
      email: 'JoeBloggs@acme.co',
      tx_ref: 'HGHYGIHIKU'
    };

    var resp = await momoInstance.ghana(payload);

    expect(createGHSMoMo).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp.meta).to.have.property('authorization');
    expect(resp.meta.authorization).to.have.property('redirect');
  });

  it('should successfully charge Mpesa ', async function () {
    this.timeout(10000);

    const createKESMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 4193428,
          tx_ref: 'test987',
          flw_ref: '2993238342',
          device_fingerprint: 'N/A',
          amount: 10,
          charged_amount: 10,
          app_fee: 0.29,
          merchant_fee: 0,
          processor_response: 'Successful',
          auth_model: 'LIPA_MPESA',
          currency: 'KES',
          ip: '::127.0.0.1',
          narration: 'FLW-PBF MPESA Transaction ',
          status: 'pending',
          auth_url: 'N/A',
          payment_type: 'mpesa',
          fraud_status: 'ok',
          charge_type: 'normal',
          created_at: '2023-03-10T02:25:16.000Z',
          account_id: 20937,
          customer: {
            id: 1998111,
            phone_number: '25454709929220',
            name: 'Yolande Aglaé',
            email: 'stefan.wexler@hotmail.eu',
            created_at: '2023-03-10T02:25:16.000Z',
          },
        },
      },
    });

    var payload = {
      tx_ref: 'test987',
      amount: '10',
      currency: 'KES',
      email: 'stefan.wexler@hotmail.eu',
      phone_number: '25454709929220',
      fullname: 'Yolande Aglaé Colbert'
    };

    var resp = await momoInstance.mpesa(payload);

    expect(createKESMoMo).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('data');
    expect(resp.data).to.have.property('payment_type');
    expect(resp.data.auth_model).to.eq('LIPA_MPESA');
  });

  it('should validate phone number for GHS MoMo ', async function () {
    this.timeout(10000);

    const createGHSMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        meta: {
          authorization: {
            redirect:
              'https://ravemodal-dev.herokuapp.com/captcha/verify/83940:dede0352930befaac522ca71e969f0e2',
            mode: 'redirect',
          },
        },
      },
    });

    var payload = {
      phone_number: 'hjdfhjfdjhdf',
      amount: 1500,
      currency: 'GHS',
      network: 'VODAFONE',
      email: 'JoeBloggs@acme.co',
      tx_ref: 'HGHYGIHIKU'
    };

    await expect(momoInstance.ghana(payload)).to.be.rejectedWith('phone number should be digits');
    expect(createGHSMoMo).to.not.have.been.called;
  });

  it('should validate network for GHS MoMo ', async function () {
    this.timeout(10000);

    const createGHSMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        meta: {
          authorization: {
            redirect:
              'https://ravemodal-dev.herokuapp.com/captcha/verify/83940:dede0352930befaac522ca71e969f0e2',
            mode: 'redirect',
          },
        },
      },
    });

    var payload = {
      phone_number: '12121212121',
      amount: 1500,
      currency: 'GHS',
      network: 'VIFA',
      email: 'JoeBloggs@acme.co',
      tx_ref: 'HGHYGIHIKU'
    };

    await expect(momoInstance.ghana(payload)).to.be.rejectedWith('Only MTN, AIRTELTIGO, and VODAFONE are valid for GHS.');
    expect(createGHSMoMo).to.not.have.been.called;
  });

  it('should successfully charge Mpesa ', async function () {
    this.timeout(10000);

    const createKESMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 4193428,
          tx_ref: 'test987',
          flw_ref: '2993238342',
          device_fingerprint: 'N/A',
          amount: 10,
          charged_amount: 10,
          app_fee: 0.29,
          merchant_fee: 0,
          processor_response: 'Successful',
          auth_model: 'LIPA_MPESA',
          currency: 'KES',
          ip: '::127.0.0.1',
          narration: 'FLW-PBF MPESA Transaction ',
          status: 'pending',
          auth_url: 'N/A',
          payment_type: 'mpesa',
          fraud_status: 'ok',
          charge_type: 'normal',
          created_at: '2023-03-10T02:25:16.000Z',
          account_id: 20937,
          customer: {
            id: 1998111,
            phone_number: '25454709929220',
            name: 'Yolande Aglaé',
            email: 'stefan.wexler@hotmail.eu',
            created_at: '2023-03-10T02:25:16.000Z',
          },
        },
      },
    });

    var payload = {
      tx_ref: 'test987',
      amount: '10',
      currency: 'KES',
      network:'AIRTEL',
      email: 'stefan.wexler@hotmail.eu',
      phone_number: '25454709929220',
      fullname: 'Yolande Aglaé Colbert'
    };

    var resp = await momoInstance.mpesa(payload);

    expect(createKESMoMo).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('data');
    expect(resp.data).to.have.property('payment_type');
    expect(resp.data.auth_model).to.eq('LIPA_MPESA');
  });

  it('should successfully validate network for charge Mpesa ', async function () {
    this.timeout(10000);

    const createKESMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 4193428,
          tx_ref: 'test987',
          flw_ref: '2993238342',
          device_fingerprint: 'N/A',
          amount: 10,
          charged_amount: 10,
          app_fee: 0.29,
          merchant_fee: 0,
          processor_response: 'Successful',
          auth_model: 'LIPA_MPESA',
          currency: 'KES',
          ip: '::127.0.0.1',
          narration: 'FLW-PBF MPESA Transaction ',
          status: 'pending',
          auth_url: 'N/A',
          payment_type: 'mpesa',
          fraud_status: 'ok',
          charge_type: 'normal',
          created_at: '2023-03-10T02:25:16.000Z',
          account_id: 20937,
          customer: {
            id: 1998111,
            phone_number: '25454709929220',
            name: 'Yolande Aglaé',
            email: 'stefan.wexler@hotmail.eu',
            created_at: '2023-03-10T02:25:16.000Z',
          },
        },
      },
    });

    var payload = {
      tx_ref: 'test987',
      network: 'VIFA',
      amount: '10',
      currency: 'KES',
      email: 'stefan.wexler@hotmail.eu',
      phone_number: '25454709929220',
      fullname: 'Yolande Aglaé Colbert'
    };


    await expect(momoInstance.mpesa(payload)).to.be.rejectedWith('Only SAFARICOM and AIRTEL are valid for KES.');
    expect(createKESMoMo).to.not.have.been.called;
  });

  it('should successfully charge RWF MoMo ', async function () {
    this.timeout(10000);

    const createRWFMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        meta: {
          authorization: {
            redirect:
              'https://ravemodal-dev.herokuapp.com/captcha/verify/83941:9a08f472e33cd311c17351a4e1497ca2',
            mode: 'redirect',
          },
        },
      },
    });

    var payload = {
      tx_ref: 'test654',
      order_id: 'USS_URG_893982923s2323',
      amount: '10',
      currency: 'RWF',
      network:'MTN',
      email: 'stefan.wexler@hotmail.eu',
      phone_number: '054709929220',
      fullname: 'Yolande Aglaé Colbert'
    };

    var resp = await momoInstance.rwanda(payload);

    expect(createRWFMoMo).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp.meta).to.have.property('authorization');
    expect(resp.meta.authorization).to.have.property('redirect');
  });

  it('should validate network for RWF MoMo charge ', async function () {
    this.timeout(10000);

    const createRWFMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        meta: {
          authorization: {
            redirect:
              'https://ravemodal-dev.herokuapp.com/captcha/verify/83941:9a08f472e33cd311c17351a4e1497ca2',
            mode: 'redirect',
          },
        },
      },
    });

    var payload = {
      tx_ref: 'test654',
      order_id: 'USS_URG_893982923s2323',
      amount: '10',
      network: "MT",
      currency: 'RWF',
      email: 'stefan.wexler@hotmail.eu',
      phone_number: '054709929220',
      fullname: 'Yolande Aglaé Colbert'
    };
    
    await expect(momoInstance.rwanda(payload)).to.be.rejectedWith('Only MTN and AIRTEL are valid for RWF');
    expect(createRWFMoMo).to.not.have.been.called;
  });
  
  it('should successfully charge UGX MoMo ', async function () {
    this.timeout(10000);

    const createUGXMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        meta: {
          authorization: {
            redirect:
              'https://ravemodal-dev.herokuapp.com/captcha/verify/83942:3c49de4a49e18edeceb0d84717b00f11',
            mode: 'redirect',
          },
        },
      },
    });

    var payload = {
      tx_ref: 'test456',
      amount: '150',
      currency: 'UGX',
      voucher: '128373',
      network: 'MTN',
      email: 'stefan.wexler@hotmail.eu',
      phone_number: '054709929220',
      fullname: 'Yolande Aglaé Colbert',
      client_ip: '154.123.220.1',
      device_fingerprint: '62wd23423rq324323qew1',
      meta: {
        flightID: '213213AS',
      },
    };

    var resp = await momoInstance.uganda(payload);

    expect(createUGXMoMo).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp.meta).to.have.property('authorization');
    expect(resp.meta.authorization).to.have.property('redirect');
  });
  
  it('should validate network charge UGX MoMo ', async function () {
    this.timeout(10000);

    const createUGXMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        meta: {
          authorization: {
            redirect:
              'https://ravemodal-dev.herokuapp.com/captcha/verify/83942:3c49de4a49e18edeceb0d84717b00f11',
            mode: 'redirect',
          },
        },
      },
    });

    var payload = {
      tx_ref: 'test456',
      amount: '150',
      currency: 'UGX',
      voucher: '128373',
      network: 'UGN',
      email: 'stefan.wexler@hotmail.eu',
      phone_number: '054709929220',
      fullname: 'Yolande Aglaé Colbert',
      client_ip: '154.123.220.1',
      device_fingerprint: '62wd23423rq324323qew1',
      meta: {
        flightID: '213213AS',
      }
    };
    
    await expect(momoInstance.uganda(payload)).to.be.rejectedWith('Only MTN and AIRTEL are valid for UGX.');
    expect(createUGXMoMo).to.not.have.been.called;
  });

  it('should successfully charge XAF MoMo', async function () {
    this.timeout(10000);

    const createXAFMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 4193429,
          tx_ref: 'test321',
          flw_ref: 'JFIX8206716784151202',
          device_fingerprint: 'N/A',
          amount: 10,
          charged_amount: 10,
          app_fee: 0.25,
          merchant_fee: 0,
          processor_response: 'Transaction in progress',
          auth_model: 'AUTH',
          currency: 'XAF',
          ip: '::127.0.0.1',
          narration: 'Flutterwave Developers',
          status: 'pending',
          payment_type: 'mobilemoneysn',
          fraud_status: 'ok',
          charge_type: 'normal',
          created_at: '2023-03-10T02:25:18.000Z',
          account_id: 20937,
          customer: {
            id: 1998112,
            phone_number: '23700000020',
            name: 'Yolande Aglaé',
            email: 'stefan.wexler@hotmail.eu',
            created_at: '2023-03-10T02:25:18.000Z',
          },
        },
        meta: { authorization: { mode: 'callback', redirect_url: null } },
      },
    });

    var payload = {
      tx_ref: 'test321',
      amount: '10',
      currency: 'XAF',
      country: 'CM',
      email: 'stefan.wexler@hotmail.eu',
      phone_number: '23700000020',
      fullname: 'Yolande Aglaé Colbert'
    };

    var resp = await momoInstance.franco_phone(payload);

    expect(createXAFMoMo).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('data');
    expect(resp.data).to.have.property('payment_type');
    expect(resp.data.payment_type).to.eq('mobilemoneysn');
  });
  
  it('should validate network for XAF MoMo ', async function () {
    this.timeout(10000);

    const createXAFMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 4193429,
          tx_ref: 'test321',
          flw_ref: 'JFIX8206716784151202',
          device_fingerprint: 'N/A',
          amount: 10,
          charged_amount: 10,
          app_fee: 0.25,
          merchant_fee: 0,
          processor_response: 'Transaction in progress',
          auth_model: 'AUTH',
          currency: 'XAF',
          ip: '::127.0.0.1',
          narration: 'Flutterwave Developers',
          status: 'pending',
          payment_type: 'mobilemoneysn',
          fraud_status: 'ok',
          charge_type: 'normal',
          created_at: '2023-03-10T02:25:18.000Z',
          account_id: 20937,
          customer: {
            id: 1998112,
            phone_number: '23700000020',
            name: 'Yolande Aglaé',
            email: 'stefan.wexler@hotmail.eu',
            created_at: '2023-03-10T02:25:18.000Z',
          },
        },
        meta: { authorization: { mode: 'callback', redirect_url: null } },
      },
    });

    var payload = {
      tx_ref: 'test321',
      amount: '10',
      currency: 'XAF',
      network: "NWW",
      country: 'CM',
      email: 'stefan.wexler@hotmail.eu',
      phone_number: '23700000020',
      fullname: 'Yolande Aglaé Colbert'
    };
    
    await expect(momoInstance.franco_phone(payload)).to.be.rejectedWith('Only MTN and ORANGEMONEY are valid for XAF.');
    expect(createXAFMoMo).to.not.have.been.called;
  });

  it('should successfully charge ZMW MoMo ', async function () {
    this.timeout(10000);

    const createZMWMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        meta: {
          authorization: {
            redirect:
              'https://ravemodal-dev.herokuapp.com/captcha/verify/83943:39fe383196e9bf34ee5e407f39508b8b',
            mode: 'redirect',
          },
        },
      },
    });

    var payload = {
      tx_ref: 'test123',
      amount: '150',
      currency: 'ZMW',
      order_id: 'URF_MMGH_1585323540079_5981535',
      network: 'MTN',
      email: 'stefan.wexler@hotmail.eu',
      phone_number: '054709929220',
      fullname: 'Yolande Aglaé Colbert',
      client_ip: '154.123.220.1',
      device_fingerprint: '62wd23423rq324323qew1',
      meta: {
        flightID: '213213AS',
      }
    };

    var resp = await momoInstance.zambia(payload);

    expect(createZMWMoMo).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp.meta).to.have.property('authorization');
    expect(resp.meta.authorization).to.have.property('redirect');
  });

  it('should validate network for ZMW MoMo charge ', async function () {
    this.timeout(10000);

    const createZMWMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        meta: {
          authorization: {
            redirect:
              'https://ravemodal-dev.herokuapp.com/captcha/verify/83943:39fe383196e9bf34ee5e407f39508b8b',
            mode: 'redirect',
          },
        },
      },
    });

    var payload = {
      tx_ref: 'test123',
      amount: '150',
      currency: 'ZMW',
      order_id: 'URF_MMGH_1585323540079_5981535',
      network: 'TN',
      email: 'stefan.wexler@hotmail.eu',
      phone_number: '054709929220',
      fullname: 'Yolande Aglaé Colbert',
      client_ip: '154.123.220.1',
      device_fingerprint: '62wd23423rq324323qew1',
      meta: {
        flightID: '213213AS',
      }
    };
    
    await expect(momoInstance.zambia(payload)).to.be.rejectedWith('Only MTN, AIRTEL, and ZAMTEL are valid for ZMW.');
    expect(createZMWMoMo).to.not.have.been.called;
  });
  
  it('should successfully charge TZS MoMo ', async function () {
    this.timeout(10000);

    const createTZSMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 976392302,
          tx_ref: 'MC-158523s09v5050e8',
          flw_ref: 'SWWD88181689192176819143',
          device_fingerprint: '62wd23423rq324323qew1',
          amount: 150,
          charged_amount: 150,
          app_fee: 1000,
          merchant_fee: 0,
          processor_response:
            'request successful 20230712200256022250 Payment Request has been Accepted Successfully Waiting for Confirmation',
          auth_model: 'MOBILEMONEY',
          currency: 'TZS',
          ip: '154.123.220.1',
          narration: 'Adekunle Odujoko',
          status: 'pending',
          payment_type: 'mobilemoneytz',
          fraud_status: 'ok',
          charge_type: 'normal',
          created_at: '2023-07-12T20:02:56.000Z',
          account_id: 1834035,
          customer: {
            id: 617886609,
            phone_number: '0782835136',
            name: 'Yolande Aglaé',
            email: 'user@example.com',
            created_at: '2023-07-12T20:02:56.000Z',
          },
        },
      },
    });

    var payload = {
      tx_ref: 'MC-158523s09v5050e8',
      amount: '150',
      currency: 'TZS',
      network: 'Halopesa',
      email: 'user@example.com',
      phone_number: '0782835136',
      fullname: 'Yolande Aglaé Colbert',
      client_ip: '154.123.220.1',
      device_fingerprint: '62wd23423rq324323qew1',
      meta: {
        flightID: '213213AS',
      }
    };

    var resp = await momoInstance.tanzania(payload);

    expect(createTZSMoMo).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('message', 'Charge initiated');
    expect(resp.data).to.have.property('currency', 'TZS');
    expect(resp.data).to.have.property('customer');
  });
  
  it('should validate wrong network for TZS charge MoMo ', async function () {
    this.timeout(10000);

    const createTZSMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 976392302,
          tx_ref: 'MC-158523s09v5050e8',
          flw_ref: 'SWWD88181689192176819143',
          device_fingerprint: '62wd23423rq324323qew1',
          amount: 150,
          charged_amount: 150,
          app_fee: 1000,
          merchant_fee: 0,
          processor_response:
            'request successful 20230712200256022250 Payment Request has been Accepted Successfully Waiting for Confirmation',
          auth_model: 'MOBILEMONEY',
          currency: 'TZS',
          ip: '154.123.220.1',
          narration: 'Adekunle Odujoko',
          status: 'pending',
          payment_type: 'mobilemoneytz',
          fraud_status: 'ok',
          charge_type: 'normal',
          created_at: '2023-07-12T20:02:56.000Z',
          account_id: 1834035,
          customer: {
            id: 617886609,
            phone_number: '0782835136',
            name: 'Yolande Aglaé',
            email: 'user@example.com',
            created_at: '2023-07-12T20:02:56.000Z',
          },
        },
      },
    });

    var payload = {
      tx_ref: 'MC-158523s09v5050e8',
      amount: '150',
      currency: 'TZS',
      network: 'Halo',
      email: 'user@example.com',
      phone_number: '0782835136',
      fullname: 'Yolande Aglaé Colbert',
      client_ip: '154.123.220.1',
      device_fingerprint: '62wd23423rq324323qew1',
      meta: {
        flightID: '213213AS',
      }
    };

    await expect(momoInstance.tanzania(payload)).to.be.rejectedWith('Only HALOPESA, AIRTEL, TIGO, and VODACOM are valid for TZS.');
    expect(createTZSMoMo).to.not.have.been.called;
  });

  it('should successfully charge XAF MoMo ', async function () {
    this.timeout(10000);

    const createXAFMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 4193429,
          tx_ref: 'test321',
          flw_ref: 'JFIX8206716784151202',
          device_fingerprint: 'N/A',
          amount: 10,
          charged_amount: 10,
          app_fee: 0.25,
          merchant_fee: 0,
          processor_response: 'Transaction in progress',
          auth_model: 'AUTH',
          currency: 'XAF',
          ip: '::127.0.0.1',
          narration: 'Flutterwave Developers',
          status: 'pending',
          payment_type: 'mobilemoneysn',
          fraud_status: 'ok',
          charge_type: 'normal',
          created_at: '2023-03-10T02:25:18.000Z',
          account_id: 20937,
          customer: {
            id: 1998112,
            phone_number: '23700000020',
            name: 'Yolande Aglaé',
            email: 'stefan.wexler@hotmail.eu',
            created_at: '2023-03-10T02:25:18.000Z',
          },
        },
        meta: { authorization: { mode: 'callback', redirect_url: null } },
      },
    });

    var payload = {
      tx_ref: 'test321',
      amount: '10',
      network: 'MTN',
      currency: 'XAF',
      country: 'CM',
      email: 'stefan.wexler@hotmail.eu',
      phone_number: '23700000020',
      fullname: 'Yolande Aglaé Colbert'
    };

    var resp = await momoInstance.franco_phone(payload);

    expect(createXAFMoMo).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('data');
    expect(resp.data).to.have.property('payment_type');
    expect(resp.data.payment_type).to.eq('mobilemoneysn');
  });
  
  it('should successfully charge XOF MoMo ', async function () {
    this.timeout(10000);

    const createXOFMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 4193429,
          tx_ref: 'test321',
          flw_ref: 'JFIX8206716784151202',
          device_fingerprint: 'N/A',
          amount: 10,
          charged_amount: 10,
          app_fee: 0.25,
          merchant_fee: 0,
          processor_response: 'Transaction in progress',
          auth_model: 'AUTH',
          currency: 'XOF',
          ip: '::127.0.0.1',
          narration: 'Flutterwave Developers',
          status: 'pending',
          payment_type: 'mobilemoneysn',
          fraud_status: 'ok',
          charge_type: 'normal',
          created_at: '2023-03-10T02:25:18.000Z',
          account_id: 20937,
          customer: {
            id: 1998112,
            phone_number: '23700000020',
            name: 'Yolande Aglaé',
            email: 'stefan.wexler@hotmail.eu',
            created_at: '2023-03-10T02:25:18.000Z',
          },
        },
        meta: { authorization: { mode: 'callback', redirect_url: null } },
      },
    });

    var payload = {
      tx_ref: 'test321',
      amount: '10',
      network: 'MTN',
      currency: 'XOF',
      country: 'BF',
      email: 'stefan.wexler@hotmail.eu',
      phone_number: '23700000020',
      fullname: 'Yolande Aglaé Colbert'
    };

    var resp = await momoInstance.franco_phone(payload);

    expect(createXOFMoMo).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp).to.have.property('data');
    expect(resp.data).to.have.property('payment_type');
    expect(resp.data.payment_type).to.eq('mobilemoneysn');
  });

  it('should validate network for XOF MoMo ', async function () {
    this.timeout(10000);

    const createXOFMoMo = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Charge initiated',
        data: {
          id: 4193429,
          tx_ref: 'test321',
          flw_ref: 'JFIX8206716784151202',
          device_fingerprint: 'N/A',
          amount: 10,
          charged_amount: 10,
          app_fee: 0.25,
          merchant_fee: 0,
          processor_response: 'Transaction in progress',
          auth_model: 'AUTH',
          currency: 'XOF',
          ip: '::127.0.0.1',
          narration: 'Flutterwave Developers',
          status: 'pending',
          payment_type: 'mobilemoneysn',
          fraud_status: 'ok',
          charge_type: 'normal',
          created_at: '2023-03-10T02:25:18.000Z',
          account_id: 20937,
          customer: {
            id: 1998112,
            phone_number: '23700000020',
            name: 'Yolande Aglaé',
            email: 'stefan.wexler@hotmail.eu',
            created_at: '2023-03-10T02:25:18.000Z',
          },
        },
        meta: { authorization: { mode: 'callback', redirect_url: null } },
      },
    });

    var payload = {
      tx_ref: 'test321',
      amount: '10',
      currency: 'XOF',
      network: "NWW",
      country: 'BF',
      email: 'stefan.wexler@hotmail.eu',
      phone_number: '23700000020',
      fullname: 'Yolande Aglaé Colbert'
    };
    
    await expect(momoInstance.franco_phone(payload)).to.be.rejectedWith('Only WAVE, MTN, and ORANGEMONEY are valid for XOF.');
    expect(createXOFMoMo).to.not.have.been.called;
  });
});