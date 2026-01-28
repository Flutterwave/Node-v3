var otp = require('../lib/rave.otps');
var base = require('../lib/rave.base');
// var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

var dotenv = require('dotenv').config();

const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('#Rave OTP Coverage', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let otpInstance;

  beforeEach(() => {
    otpInstance = new otp(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should generate OTP and return success message', async function () {
    this.timeout(10000);

    const generateOTPSuccessStub = sinon.stub(ravebase, 'request').resolves({
      body: { // The service extracts this 'body'
        status: 'success',
        message: 'OTP generated successfully',
        data: [
          {
            medium: 'email',
            reference: 'CF-BARTER-20230305031441503636',
            otp: '1495545',
            expiry: '2023-03-05T03:19:41.8110726+00:00',
          }
        ],
      },
    });

    const payload = {
      length: 7,
      customer: {
        name: 'Kazan',
        email: 'kazan@mailinator.com',
        phone: '2348131149273',
      },
      sender: 'Test Sender',
      send: true,
      medium: ['email', 'whatsapp'],
      expiry: 5
    };

    const resp = await otpInstance.create(payload);

    expect(generateOTPSuccessStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp.message).to.eq('OTP generated successfully');
    expect(resp.data[0]).to.have.property('medium');
  });

  it('should validate OTP and return success message', async function () {
    this.timeout(10000);

    const validateOTPSuccessStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Otp Authenticated successfully',
        data: null,
      },
    });

    const payload = {
      reference: 'CF-BARTER-20230305031441503636',
      otp: '1495545',
    };

    const resp = await otpInstance.validate(payload);

    expect(validateOTPSuccessStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp.message).to.eq('Otp Authenticated successfully');
  });
});