require('dotenv').config({
    path: '../.env'
});

const ebills = require('../lib/rave.ebills');
const base = require('../lib/rave.base');
const Promise = require('bluebird');
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');



chai.use(chaiAsPromised);

describe("#Rave Ebills", function () {


    const public_key = process.env.PUBLIC_KEY;
    const secret_key = process.env.SECRET_KEY;
    const production_flag = process.env.PRODUCTION_FLAG;
    const ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
    const ebillsInstance = new ebills(ravebase);

    it("should  create a new Ebills order ", async function () {
        this.timeout(10000);

        var payload = {
            "narration": "mndkn blls",
            "number_of_units": 2,
            "currency": "NGN",
            "amount": 200,
            "phone_number": "09384747474",
            "email": "jake@rad.com",
            "tx_ref": "akhlm-pstmn-109470393",
            "ip": "127.9.0.7",
            "custom_business_name": "John Madakin",
            "country": "NG"
        }
        var resp = await ebillsInstance.order(payload);
        return expect(resp).to.have.property('message')
    });

    it("should return list of bank branches ", async function () {
        this.timeout(10000);

        var payload = {
            "currency": "NGN",
            "amount": 4000,
            "reference":"RVEBLS-F81CEEEE8218-73362"
        }
        var resp = await ebillsInstance.update(payload);
        return expect(resp).to.have.property('data')
    });

});