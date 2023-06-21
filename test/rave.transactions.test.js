var transactions = require('../lib/rave.transactions');
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

describe('#Rave Transactions', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  //   let trxInstance;
  //   let momoStub;

  beforeEach(() => {
    trxInstance = new transactions(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should successfully verify a payment', async function () {
    this.timeout(10000);
    var payload = {
      id: '4186265',
    };

    var resp = await trxInstance.verify(payload);
    // console.log(resp);
  });

  it('should successfully return transaction events', async function () {
    this.timeout(10000);
    var payload = {
      id: '4186265',
    };

    var resp = await trxInstance.event(payload);
    // console.log(resp);
  });
});
