const RaveBase = require('../lib/rave.base');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('RaveBase Deep Coverage', function () {
  const pub_key = process.env.PUBLIC_KEY;
  const sec_key = process.env.SECRET_KEY;

  afterEach(() => {
    sinon.restore();
  });

  //Targetting the encrypt getIntegrityHash functions in the security.js
  it('should trigger the internal encrypt and integrity hash methods', function () {
    const base = new RaveBase(pub_key, sec_key);
    const data = { amount: 100 };

    const enc = base.encrypt(data); 
    const hash = base.getIntegrityHash(data); 

    expect(enc).to.be.a('string');
    expect(hash).to.be.a('string');
  });

//covers the if(requestMethod === 'GET') and Validates that GET requests correctly, and append data to the URL.  
   it('should build query strings for GET requests (GET Branch)', async function () { 
    const base = new RaveBase(pub_key, sec_key);
    const fetchStub = sinon.stub(global, 'fetch').resolves({
      status: 200,
      headers: new Map(),
      json: () => Promise.resolve({ status: 'success' })
    });

    await base.request('v3/banks', { method:'GET',country: 'NG' });

    // Expecting the query string logic to run (?country=NG)
    expect(fetchStub.firstCall.args[0]).to.contain('?country=NG');
  });

  it('should support legacy callbacks (Callback Branch)', function (done) {
    const base = new RaveBase(pub_key, sec_key);
    sinon.stub(global, 'fetch').resolves({
      status: 200,
      headers: new Map(),
      json: () => Promise.resolve({id:12, data: 'ok' })
    });

    // Passing in a 3rd argument that triggers the 'if (callback)' branch
    base.request('v3/test', { method: 'POST' }, function (err, res, body) {
      expect(body.id).to.equal(12);
      done(); 
    });
  });

});