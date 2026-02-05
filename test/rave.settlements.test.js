const settlement = require('../lib/rave.settlements');
const base = require('../lib/rave.base');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('#Rave Settlements Coverage', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;

  let ravebase;
  let settlementInstance;

  beforeEach(() => {
    ravebase = new base(public_key, secret_key);
    settlementInstance = new settlement(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should successfully fetch all settlements (Covers rave.retrieve-all.js)', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Settlements fetched',
        data: [{ id: 41748 }]
      }
    });

    const payload = { page: "1" };
    const resp = await settlementInstance.fetch_all(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.status).to.equal('success');
  });

  it('should successfully fetch a single settlement (Covers rave.retrieve.js)', async function () {
    this.timeout(10000);

    const requestStub = sinon.stub(ravebase, 'request').resolves({
      body: {
        status: 'success',
        message: 'Settlement fetched',
        data: { id: '41497' }
      }
    });

    const payload = { id: '41497' };
    const resp = await settlementInstance.fetch(payload);

    expect(requestStub).to.have.been.calledOnce;
    expect(resp.data.id).to.equal('41497');
  });
});