require('dotenv').config({
    path: '../.env'
});

const settlement = require('../lib/rave.settlements');
const base = require('../lib/rave.base');
const Promise = require('bluebird');
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');



chai.use(chaiAsPromised);

describe("#Rave Settlements", function () {


    const public_key = process.env.PUBLIC_KEY;
    const secret_key = process.env.SECRET_KEY;
    const production_flag = process.env.PRODUCTION_FLAG;
    const ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
    const settlementInstance = new settlement(ravebase);

    it("should return all settlements ", async function () {
        this.timeout(10000);

       
        var resp = await settlementInstance.fetch_all();
        return expect(resp).to.have.property('message')
    });

    it("should return list of bank branches ", async function () {
        this.timeout(10000);

        var payload = {
            "currency": "NGN",
            "amount": 4000,
            "reference":"RVEBLS-F81CEEEE8218-73362"
        }
        var resp = await settlementInstance.update(payload);
        return expect(resp).to.have.property('data')
    });

});