var ebills = require('../lib/rave.ebills');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var dotenv = require('dotenv').config();


chai.use(chaiAsPromised);

describe("#Rave Ebills", function () {


    const public_key = process.env.PUBLIC_KEY;
    const secret_key = process.env.SECRET_KEY;
    const ravebase = new base(public_key, secret_key);
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