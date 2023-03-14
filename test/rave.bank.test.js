var banks = require('../lib/rave.banks');
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

describe('#Rave Bank', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let banksInstance;
  let bankStub;

  beforeEach(() => {
    banksInstance = new banks(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return list of banks in NG ', async function () {
    this.timeout(10000);

    const bankStub = sinon.stub(banksInstance, 'country').resolves({
      body: {
        status: 'success',
        message: 'Banks fetched successfully',
        data: [
          {
            id: 1,
            code: '044',
            name: 'Access Bank',
          },
          {
            id: 2,
            code: '023',
            name: 'Citi Bank',
          },
          {
            id: 4,
            code: '050',
            name: 'EcoBank PLC',
          },
          {
            id: 5,
            code: '011',
            name: 'First Bank PLC',
          },
          {
            id: 6,
            code: '214',
            name: 'First City Monument Bank',
          },
        ],
      },
    });

    var payload = {
      country: 'NG',
    };

    var resp = await banksInstance.country(payload);
    // console.log(resp);

    expect(bankStub).to.have.been.calledOnce;
    expect(bankStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data[0]).to.have.property('id');
    expect(resp.body.data[0]).to.have.property('code');
    expect(resp.body.data[0]).to.have.property('name');
  });

  it('should return list of bank branches ', async function () {
    this.timeout(10000);

    const bankBranchStub = sinon.stub(banksInstance, 'branches').resolves({
      body: {
        status: 'success',
        message: 'Banks fetched successfully',
        data: [
          {
            id: 1804,
            branch_code: 'UG240647',
            branch_name: 'BWAISE BRANCH',
            swift_code: 'GLTBUGKA',
            bic: '',
            bank_id: 280,
          },
          {
            id: 1805,
            branch_code: 'UG240547',
            branch_name: 'MUKONO BRANCH',
            swift_code: 'GLTBUGKA',
            bic: '',
            bank_id: 280,
          },
          {
            id: 1806,
            branch_code: 'UG240447',
            branch_name: 'NATETE BRANCH',
            swift_code: 'GLTBUGKA',
            bic: '',
            bank_id: 280,
          },
          {
            id: 1807,
            branch_code: 'UG240347',
            branch_name: 'PARLIAMENT BRANCH',
            swift_code: 'GLTBUGKA',
            bic: '',
            bank_id: 280,
          },
        ],
      },
    });

    var payload = {
      id: '280',
    };

    var resp = await banksInstance.branches(payload);
    // console.log(resp);

    expect(bankBranchStub).to.have.been.calledOnce;
    expect(bankBranchStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data[0]).to.have.property('id');
    expect(resp.body.data[0]).to.have.property('branch_code');
    expect(resp.body.data[0]).to.have.property('branch_name');
    expect(resp.body.data[0]).to.have.property('swift_code');
    expect(resp.body.data[0]).to.have.property('bank_id');
  });
});
