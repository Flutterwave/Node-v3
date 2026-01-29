var banks = require('../lib/rave.banks');
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

describe('#Rave Bank', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let banksInstance;

  beforeEach(() => {
    // Initializing the Bank wrapper from lib/rave.banks
    banksInstance = new banks(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return list of banks in NG ', async function () {
    this.timeout(10000);

    // The service destructures { body: response }, so defined stub must match
    const BanksrequestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Banks fetched successfully',
        data: [
          { id: 1, code: '044', name: 'Access Bank' },
          { id: 2, code: '023', name: 'Citi Bank' }
        ],
      },
    });

    const payload = { country: 'NG' };

    // This executes the real logic in lib/rave.banks and services/banks/rave.banks-country
    const resp = await banksInstance.country(payload);

    expect(BanksrequestStub).to.have.been.calledOnce;
    expect(resp, "Service returned undefined - check destructuring").to.not.be.undefined;
    expect(resp).to.have.property('status', 'success');
    expect(resp.data[0]).to.have.property('name', 'Access Bank');
  });

  it('should return list of bank branches ', async function () {
    this.timeout(10000);

    const BankbranchesrequestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Branches fetched successfully',
        data: [
          {
            id: 1804,
            branch_code: 'UG240647',
            branch_name: 'BWAISE BRANCH',
            swift_code: "SBICGHAC",
            bic: "SBICGHACXXX",
            bank_id: 280
          }
        ],
      },
    });

    const payload = { id: 280 };

    const resp = await banksInstance.branches(payload);

    expect(BankbranchesrequestStub).to.have.been.calledOnce;
    expect(resp).to.have.property('status', 'success');
    expect(resp.data[0]).to.have.property('branch_name', 'BWAISE BRANCH');
  });


});