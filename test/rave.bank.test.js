var banks = require('../lib/rave.banks');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var dotenv = require('dotenv').config();



chai.use(chaiAsPromised);

describe("#Rave Bank", function () {

    const public_key = process.env.PUBLIC_KEY;
    const secret_key = process.env.SECRET_KEY;
    const ravebase = new base(public_key, secret_key);
    var banksInstance = new banks(ravebase);

    it("should return list of banks in NG ", async function () {
        this.timeout(10000);

        var payload = {
            "country": "NG"
        }
        var resp = await banksInstance.country(payload);
        return expect(resp).to.have.property('data')
    });

    it("should return list of bank branches ", async function () {
        this.timeout(10000);

        var payload = {
            "id": "280"
        }
        var resp = await banksInstance.branches(payload);
        return expect(resp).to.have.property('data')
    });

});