var ebills = require('../lib/rave.ebills');
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

describe('#Rave Ebills', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let ebillsInstance;
  let ebillsStub;

  beforeEach(() => {
    ebillsInstance = new ebills(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should  create a new Ebills order ', async function () {
    this.timeout(10000);

    const createEbillsSuccessStub = sinon
      .stub(ebillsInstance, 'order')
      .resolves({
        body: {
          status: 'success',
          message: 'Ebills ordered',
          data: {
            flw_ref: 'RVEBLS-F35542EA3BFE-73362',
            tx_ref: 'akhlm-pstmn-109470393',
            response_message: 'Pending funds transfer or bank branch payment',
          },
        },
      });

    var payload = {
      narration: 'mndkn blls',
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

    var resp = await ebillsInstance.order(payload);

    expect(createEbillsSuccessStub).to.have.been.calledOnce;
    expect(createEbillsSuccessStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data).to.have.property('flw_ref');
    expect(resp.body.data).to.have.property('tx_ref');
    expect(resp.body.data).to.have.property('response_message');
  });

  it('should return list of bank branches ', async function () {
    this.timeout(10000);

    const updateEbillsSuccessStub = sinon
      .stub(ebillsInstance, 'update')
      .resolves({
        body: {
          status: 'success',
          message: 'Ebills order updated',
          data: {
            updated: true,
          },
        },
      });

    var payload = {
      currency: 'NGN',
      amount: 4000,
      reference: 'RVEBLS-F81CEEEE8218-73362',
    };

    var resp = await ebillsInstance.update(payload);

    expect(updateEbillsSuccessStub).to.have.been.calledOnce;
    expect(updateEbillsSuccessStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');
  });
});
