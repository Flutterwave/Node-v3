var banks = require('../lib/rave.banks');
var payout = require('../lib/rave.transfers');
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
    var transferInstance = new payout(ravebase);

    it("should create a XAF transfer ", async function () {
        this.timeout(15000);

        var payload = {
            "account_bank": "FMM",
            "account_number": "250700000000",
            "amount": 50,
            "narration": "Node XAF Sample Transfer",
            "currency": "XAF",
            "reference": "Node_1_PMCKDU_1",
            "beneficiary_name": "Flutterwave Developers"
          }
        var resp = await transferInstance.initiate(payload);
        return expect(resp).to.have.property('data')
    });

    it("should create a NGN transfer ", async function () {
        this.timeout(15000);

        var payload = {
            "account_bank": "044",
            "account_number": "0690000040",
            "amount": 5500,
            "narration": "Node NGN Sample Transfer",
            "currency": "NGN",
            "reference": "Node_2_PMCKDU_1",
            "callback_url": "https://www.flutterwave.com/ng/",
            "debit_currency": "NGN"
        }

        var resp = await transferInstance.initiate(payload);
        return expect(resp).to.have.property('data')
    });

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