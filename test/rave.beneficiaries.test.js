var beneficiaries = require('../lib/rave.beneficiaries');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var dotenv = require('dotenv').config();



chai.use(chaiAsPromised);

describe("#Rave Beneficiaries", function () {


    const public_key = process.env.PUBLIC_KEY;
    const secret_key = process.env.SECRET_KEY;
    const ravebase = new base(public_key, secret_key);
    var beneficiariesInstance = new beneficiaries(ravebase);

    it("should create a new beneficiary ", async function () {
        this.timeout(10000);

        var payload = {
            "account_number":"0690000034",
            "account_bank":"044",
            "beneficiary_name": "Flutterwave Developers"
        }

        var resp = await beneficiariesInstance.create(payload);
        return expect(resp).to.have.property('data')
    });

    it("should return a single beneficiary ", async function () {
        this.timeout(10000);

        var payload = {
           "id":"3644"
        }
        var resp = await beneficiariesInstance.fetch(payload);
        return expect(resp).to.have.property('data')
    });

    it("should return delete message", async function () {
        this.timeout(10000);

        var payload = {
           "id":"3644"
        }
        var resp = await beneficiariesInstance.delete(payload);
        return expect(resp).to.have.property('message')
    });

});