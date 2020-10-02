var beneficiaries = require('../lib/rave.beneficiaries');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var dotenv = require('dotenv').config();

chai.use(chaiAsPromised);

describe('#Rave Beneficiaries', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);
  var beneficiariesInstance = new beneficiaries(ravebase);
  let beneficiaryId;

  it('should create Beneficiary', async function () {
    this.timeout(10000);

    var payload = {
      account_number: '0690000034',
      account_bank: '044',
    };
    var resp = await beneficiariesInstance.create(payload);
    beneficiaryId = resp.data.id;
    expect(resp.status).to.equal('success');
    expect(resp).to.have.property('data');
    return;
  });

  it('should return a single beneficiary ', async function () {
    this.timeout(10000);

    var payload = {
      id: beneficiaryId,
    };
    var resp = await beneficiariesInstance.fetch(payload);
    expect(resp.status).to.equal('success');
    expect(resp).to.have.property('data');
    expect(resp.data).to.not.be.empty;
    return;
  });

  it('should return delete message', async function () {
    this.timeout(10000);

    var payload = {
      id: beneficiaryId,
    };
    var resp = await beneficiariesInstance.delete(payload);
    expect(resp.status).to.equal('success');
    expect(resp).to.have.property('message');
    return;
  });
});
