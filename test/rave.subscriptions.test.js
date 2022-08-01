var beneficiaries = require('../lib/rave.beneficiaries');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
const Subscriptions = require('../lib/rave.subscriptions');
const Plan = require('../lib/rave.payment_plan');
var dotenv = require('dotenv').config();



chai.use(chaiAsPromised);

describe("#Rave Subscriptions", function () {


    const public_key = process.env.PUBLIC_KEY;
    const secret_key = process.env.SECRET_KEY;
    const ravebase = new base(public_key, secret_key);
    var subscriptionInstance = new Subscriptions(ravebase);
    var planInstance = new Plan (ravebase);

    it("should create a plan without duration ", async function () {
        this.timeout(10000);

        var payload = {
            "amount":5000,
            "name":"Node test plan",
            "interval":"monthly"
        }
        var resp = await planInstance.create(payload);
        return expect(resp).to.have.property('data')
    });

    it("should return a single subscription ", async function () {
        this.timeout(10000);

        var payload = {
           "email":"cornelius@flutterwavego.com"
        }
        var resp = await subscriptionInstance.get(payload);
        return expect(resp).to.have.property('data')
    });

    it("should cancel a user's subscription", async function () {
        this.timeout(10000);

        var payload = {
           "id":"11343"
        }
        var resp = await subscriptionInstance.cancel(payload);
        return expect(resp).to.have.property('message')
    });

    it("should activate Subscription", async function () {
        this.timeout(10000);

        var payload = {
            "id":"11343"
        }
        var resp = await subscriptionInstance.activate(payload);
        return expect(resp).to.have.property('data')
  
    });

});