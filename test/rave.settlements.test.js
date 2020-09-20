var settlement = require('../lib/rave.settlements');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var dotenv = require('dotenv').config();


chai.use(chaiAsPromised);

describe("#Rave Settlements", function () {


    const public_key = process.env.PUBLIC_KEY;
    const secret_key = process.env.SECRET_KEY;
    const ravebase = new base(public_key, secret_key);
    const settlementInstance = new settlement(ravebase);

    it("should return all settlements ", async function () {
        this.timeout(10000);

       
        var resp = await settlementInstance.fetch_all();
        return expect(resp).to.have.property('message')
    });

    // it("should return list of bank branches ", async function () {
    //     this.timeout(10000);

    //     var payload = {
    //         "currency": "NGN",
    //         "amount": 4000,
    //         "reference":"RVEBLS-F81CEEEE8218-73362"
    //     }
    //     var resp = await settlementInstance.update(payload);
    //     return expect(resp).to.have.property('data')
    // });

});