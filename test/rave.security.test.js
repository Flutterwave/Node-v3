const security = require('../lib/security');
const expect = require('chai').expect;

describe('Security Utilities (node-forge)', function () {
  
  // FEnsure this is defined INSIDE the describe block or the test
  const pubkey = process.env.PUBLIC_KEY;
  const seckey = process.env.SECRET_KEY;

  it('should generate a correct encryption key (getEncryptionKey)', function () {
    // We pass the variable here
    const key = security.getEncryptionKey(seckey);

    expect(key).to.be.a('string');
    expect(key).to.have.lengthOf(24);
  });

  it('should encrypt text using node-forge (encrypt)', function () {
    const text = JSON.stringify({ card: '5531886652142950' });

    // We must generate the key first to pass it to encrypt
    const key = security.getEncryptionKey(seckey);
    const encrypted = security.encrypt(key, text);

    expect(encrypted).to.be.a('string');
    expect(encrypted).to.not.equal(text);
  });

  it('should generate a SHA256 integrity hash (getIntegrityHash)', function () {
    const data = {
      amount: 500,
      currency: 'NGN',
      tx_ref: 'MC-12345',
      integrity_hash: 'old-hash-to-be-skipped' // This triggers the 'if' branch
    };
   

    const hash = security.getIntegrityHash(data, pubkey, seckey);

    // Assertions
    expect(hash).to.be.a('string');
    expect(hash).to.have.lengthOf(64); // SHA256 hex strings are 64 characters

    // Proves it is a hex string (0-9, a-f)
    expect(hash).to.match(/^[a-f0-9]+$/);
  });
});