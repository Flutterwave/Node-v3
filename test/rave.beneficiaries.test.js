var beneficiaries = require('../lib/rave.beneficiaries');
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

describe('#Rave Beneficiaries', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let beneficiariesInstance;

  beforeEach(() => {
    beneficiariesInstance = new beneficiaries(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a Beneficiary', async function () {
    this.timeout(10000);

    const CreatebeneficiaryrequestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Beneficiary created successfully',
        data: {
          id: 3644,
          account_number: '0690000034',
          bank_code: '044',
          full_name: 'Ade Bond',
          bank_name: 'ACCESS BANK NIGERIA',
        },
      },
    });

    var payload = {
      account_number: '0690000034',
      account_bank: '044',
      beneficiary_name: 'Ade Bond'
    };

    var resp = await beneficiariesInstance.create(payload);

    expect(CreatebeneficiaryrequestStub).to.have.been.calledOnce;
    expect(resp, "Service returned undefined").to.not.be.undefined;
    expect(resp).to.have.property('status', 'success');
    expect(resp.data).to.have.property('id', 3644);
  });

  it('should return a single beneficiary ', async function () {
    this.timeout(10000);

    const SinglebeneficiaryrequestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Payout beneficiary fetched',
        data: { id: 2923, full_name: 'Pastor Bright' },
      },
    });

    var payload = { id: '2923' };
    var resp = await beneficiariesInstance.fetch(payload);

    expect(SinglebeneficiaryrequestStub).to.have.been.calledOnce;
    expect(resp.data.id).to.eq(2923);
  });

  it('should successfully fetch all transfer beneficiaries (Covers rave.retrieve-all.js)', async function () {
    this.timeout(10000);

    const ListbeneficiaryrequestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Beneficiaries fetched',
        data: [
          {
            id: 12345,
            account_number: '0690000040',
            bank_code: '044',
            full_name: 'Alexis Sanchez',
            bank_name: 'ACCESS BANK NIGERIA'
          }
        ],
        meta: {
          page_info: {
            total: 1,
            current_page: 1,
            total_pages: 1
          }
        }
      }
    });

    // Use a string for the page parameter to satisfy strict validation
    const payload = {
      page: "1"
    };

    const resp = await beneficiariesInstance.fetch_all(payload);

    expect(ListbeneficiaryrequestStub).to.have.been.calledOnce;

    // Assert against the response directly
    expect(resp).to.have.property('status', 'success');
    expect(resp.data).to.be.an('array');
    expect(resp.data[0]).to.have.property('full_name', 'Alexis Sanchez');
  });

  it('should successfully delete beneficiary ', async function () {
    this.timeout(10000);

    const DeletebeneficiaryrequestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Beneficiary deleted',
        data: 'Deleted',
      },
    });

    var payload = { id: '3644' };
    var resp = await beneficiariesInstance.delete(payload);

    expect(DeletebeneficiaryrequestStub).to.have.been.calledOnce;
    expect(resp.message).to.eq('Beneficiary deleted');
  });
});