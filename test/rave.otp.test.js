var otp = require('../lib/rave.otps');
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

describe('#Rave OTP', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let otpInstance;
  let otpStub;

  beforeEach(() => {
    otpInstance = new otp(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should generate OTP and return success message', async function () {
    this.timeout(10000);

    const generateOTPSuccessStub = sinon.stub(otpInstance, 'create').resolves({
      body: {
        status: 'success',
        message: 'OTP generated successfully',
        data: [
          {
            medium: 'email',
            reference: 'CF-BARTER-20230305031441503636',
            otp: '1495545',
            expiry: '2023-03-05T03:19:41.8110726+00:00',
          },
          {
            medium: 'whatsapp',
            reference: 'CF-BARTER-20230305031443536582',
            otp: '1495545',
            expiry: '2023-03-05T03:19:43.4362097+00:00',
          },
        ],
      },
    });

    var payload = {
      length: 7,
      customer: {
        name: 'Kazan',
        email: 'kazan@mailinator.com',
        phone: '2348131149273',
      },
      sender: 'Test Sender',
      send: true,
      medium: ['email', 'whatsapp'],
      expiry: 5,
    };

    var resp = await otpInstance.create(payload);
    // console.log(resp);

    expect(generateOTPSuccessStub).to.have.been.calledOnce;
    expect(generateOTPSuccessStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');
    expect(resp.body.message).to.eq('OTP generated successfully');

    expect(resp.body.data[0]).to.have.property('medium');
    expect(resp.body.data[0]).to.have.property('reference');
    expect(resp.body.data[0]).to.have.property('expiry');
  });

  it('should validate OTP and return success message', async function () {
    this.timeout(10000);

    const validateOTPSuccessStub = sinon
      .stub(otpInstance, 'validate')
      .resolves({
        body: {
          status: 'success',
          message: 'Otp Authenticated successfully',
          data: null,
        },
      });

    var payload = {
      reference: 'CF-BARTER-20230305031441503636',
      otp: '1495545',
    };

    var resp = await otpInstance.validate(payload);
    // console.log(resp);

    expect(validateOTPSuccessStub).to.have.been.calledOnce;
    expect(validateOTPSuccessStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');
    expect(resp.body.message).to.eq('Otp Authenticated successfully');
  });
});
