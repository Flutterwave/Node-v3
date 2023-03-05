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

    expect(validateOTPSuccessStub).to.have.been.calledOnce;
    expect(validateOTPSuccessStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');
    expect(resp.body.message).to.eq('Otp Authenticated successfully');
  });
});
