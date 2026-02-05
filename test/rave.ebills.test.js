var ebills = require('../lib/rave.ebills');
var base = require('../lib/rave.base');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var dotenv = require('dotenv').config();
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('#Rave Ebills', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let ebillsInstance;

  beforeEach(() => {
    ebillsInstance = new ebills(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a new Ebills order', async function () {
    this.timeout(10000);

    // STUB: request to ensure services/ebills logic is hit
    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Ebills ordered',
        data: {
          flw_ref: 'RVEBLS-F35542EA3BFE-73362',
          tx_ref: 'akhlm-pstmn-109470393',
          response_message: 'Pending funds transfer',
        },
      },
    });

    var payload = {
      number_of_units: 2,
      currency: 'NGN',
      amount: 100,
      phone_number: '09384747474',
      email: 'jake@rad.com',
      tx_ref: 'akhlm-pstmn-109470393',
      ip: '127.9.0.7',
      custom_business_name: 'John Madakin',
      country: 'NG',
    };

    const resp = await ebillsInstance.order(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp, "Service returned undefined").to.not.be.undefined;
    expect(resp).to.have.property('status', 'success');
  });
  
  it('testing the phone number validation required to create a new Ebills order', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({ body: { status: 'success' } });

    var payload = {
      number_of_units: 2,
      currency: 'NGN',
      amount: 100,
      phone_number: 'ffrrrtrrtr',
      email: 'jake@rad.com',
      tx_ref: 'akhlm-pstmn-109470393',
      ip: '127.9.0.7',
      custom_business_name: 'John Madakin',
      country: 'NG',
    };

    await expect(ebillsInstance.order(payload))
      .to.be.rejectedWith('phone number should be digits');

    expect(requestStub).to.not.have.been.called;
  });

  it('should update an Ebills order', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Ebills order updated',
        data: { updated: true },
      },
    });

    var payload = {
      currency: 'NGN',
      amount: 4000,
      reference: 'RVEBLS-F81CEEEE8218-73362',
    };

    const resp = await ebillsInstance.update(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
  });

  it('should fail if email is missing', async function () {
    
    const requestStub = sinon.stub(ravebase, 'request').resolves({ body: { status: 'success' } });
    
    var invalidPayload = { amount: 100 }; // Missing email and other fields
    
    await expect(ebillsInstance.order(invalidPayload)).to.be.rejectedWith(/"email" is required/);
    expect(requestStub).to.not.have.been.called;
  });
});