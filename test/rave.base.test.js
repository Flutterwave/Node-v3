const RaveBase = require('../lib/rave.base');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('RaveBase Deep Coverage', function () {
  const pub_key = process.env.PUBLIC_KEY;
  const sec_key = process.env.SECRET_KEY;

  afterEach(() => {
    sinon.restore();
  });

  it('should update the base URL via setBaseUrl', function () {
    const base = new RaveBase(pub_key, sec_key);
    base.setBaseUrl('https://new-api.com/');
    expect(base.getBaseUrl()).to.equal('https://new-api.com/');
  });

  it('should trigger the internal encrypt and integrity hash methods', function () {
    const base = new RaveBase(pub_key, sec_key);
    const data = { amount: 100 };

    const enc = base.encrypt(data); // Turns the encrypt block GREEN
    const hash = base.getIntegrityHash(data); // Turns the integrity block GREEN

    expect(enc).to.be.a('string');
    expect(hash).to.be.a('string');
  });

  it('should handle non-JSON responses in callback mode', function (done) {
    const base = new RaveBase(pub_key, sec_key);
    // Simulate a response that fails .json() but has .text()
    sinon.stub(global, 'fetch').resolves({
      status: 500,
      headers: new Map(),
      json: () => Promise.reject(new Error('Not JSON')),
      text: () => Promise.resolve('Error Page')
    });

    base.request('v3/path', {}, function (err, res, body) {
      // This turns the (err) => response.text() block GREEN
      expect(body).to.equal('Error Page');
      done();
    });
  });

  it('should handle non-JSON responses in promise mode', async function () {
    const base = new RaveBase(pub_key, sec_key);
    sinon.stub(global, 'fetch').resolves({
      status: 404,
      headers: new Map(),
      json: () => Promise.reject(new Error('Not JSON')),
      text: () => Promise.resolve('Not Found')
    });

    const result = await base.request('v3/path', {});
    expect(result.body).to.equal('Not Found'); // Turns the Promise Catch GREEN
  });

  it('should handle total network failure in callback mode', function (done) {
    const base = new RaveBase(pub_key, sec_key);
    // Simulate the fetch itself failing (e.g. no internet)
    sinon.stub(global, 'fetch').rejects(new Error('Network Down'));

    base.request('v3/path', {}, function (err, res, body) {
      // This turns the final .catch((err) => callback(err...)) GREEN
      expect(err.message).to.equal('Network Down');
      done();
    });
  });

  it('should override base_url if provided (Constructor Branch)', function () {
    const customUrl = 'https://custom.api.com/';
    const base = new RaveBase(pub_key, sec_key, customUrl);
    expect(base.getBaseUrl()).to.equal(customUrl);
  });

  it('should build query strings for GET requests (GET Branch)', async function () {
    const base = new RaveBase(pub_key, sec_key);
    // Stub global fetch to prevent actual network calls
    const fetchStub = sinon.stub(global, 'fetch').resolves({
      status: 200,
      headers: new Map(),
      json: () => Promise.resolve({ status: 'success' })
    });

    await base.request('v3/banks', { method: 'GET', country: 'NG' });

    // Proves the query string logic ran (?country=NG)
    expect(fetchStub.firstCall.args[0]).to.contain('?country=NG');
  });

  it('should support legacy callbacks (Callback Branch)', function (done) {
    const base = new RaveBase(pub_key, sec_key);
    sinon.stub(global, 'fetch').resolves({
      status: 200,
      headers: new Map(),
      json: () => Promise.resolve({ data: 'ok' })
    });

    // Passing a function as the 3rd argument triggers the 'if (callback)' branch
    base.request('v3/test', { method: 'POST' }, function (err, res, body) {
      expect(body.data).to.equal('ok');
      done(); // Tells Mocha the callback test is finished
    });
  });

  it('should handle JSON parsing errors (Catch Branch)', async function () {
    const base = new RaveBase(pub_key, sec_key);
    sinon.stub(global, 'fetch').resolves({
      status: 500,
      headers: new Map(),
      json: () => Promise.reject(new Error('Invalid JSON')),
      text: () => Promise.resolve('Internal Server Error')
    });

    const result = await base.request('v3/error', { method: 'POST' });
    // Turns the .catch((err) => ... text()) logic GREEN
    expect(result.body).to.equal('Internal Server Error');
  });

  it('should trigger the promise reject block on network failure', async function () {
    const base = new RaveBase(pub_key, sec_key);

    // Force fetch to REJECT instead of RESOLVE
    // This mimics a total network failure (no internet/server down)
    const networkError = new Error('Network Connection Failed');
    sinon.stub(global, 'fetch').rejects(networkError);

    // We expect the promise to reject, so we catch it in the test
    try {
      await base.request('v3/test', { method: 'POST' });
    } catch (err) {
      // This is where the code enters the .catch((err) => reject(err))
      expect(err.message).to.equal('Network Connection Failed');
    }
  });
});