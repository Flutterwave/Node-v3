var bills = require('../lib/rave.bills');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var dotenv = require('dotenv').config();



chai.use(chaiAsPromised);

describe("#Rave Bills", function () {


    const public_key = process.env.PUBLIC_KEY;
    const secret_key = process.env.SECRET_KEY;
    const ravebase = new base(public_key, secret_key);
    var billsInstance = new bills(ravebase);

    it("should create bill payments", async function () {
        this.timeout(10000);

        var payload = {
            "country": "NG",
            "customer": "+23490803840303",
            "amount": 500,
            "recurrence": "ONCE",
            "type": "AIRTIME",
            "reference": "9300049404444"
        }
        var resp = await billsInstance.create_bill(payload);
        return expect(resp).to.have.property('data')

    });

    it("should create bulk bills payment ", async function () {
        this.timeout(10000);

        var payload = {
            "bulk_reference": "edf-12de5223d2f32",
            "callback_url": "https://webhook.site/5f9a659a-11a2-4925-89cf-8a59ea6a019a",
            "bulk_data": [{
                    "country": "NG",
                    "customer": "+23490803840303",
                    "amount": 500,
                    "recurrence": "WEEKLY",
                    "type": "AIRTIME",
                    "reference": "930049200929"
                },
                {
                    "country": "NG",
                    "customer": "+23490803840304",
                    "amount": 500,
                    "recurrence": "WEEKLY",
                    "type": "AIRTIME",
                    "reference": "930004912332"
                }
            ]
        }
        var resp = await billsInstance.create_bulk(payload);
        return expect(resp).to.have.property('data')
    });

    it("should return status of a bill purchase", async function () {
        this.timeout(10000);

        var payload = {
            "reference": "9300049404444"
        }
        var resp = await billsInstance.fetch_status(payload);
        return expect(resp).to.have.property('message')
    });

    it("should update bills order", async function () {
        this.timeout(10000);

        var payload = {
            "amount": "3814.13",
            "reference": "FLWTTOT1000000019",
            "order_id": "be9c8abf-4611-46e9-85e7-5a2e8c5d7ab3"
        }
        var resp = await billsInstance.update_bills(payload);
        return expect(resp).to.have.property('data')
    });
    it("should validate bills services", async function () {
        this.timeout(10000);

        var payload = {
            "item_code": "AT099",
            "code": "BIL099",
            "customer": "08038291822"
        }
        var resp = await billsInstance.validate(payload);
        return expect(resp).to.have.property('message')
    });

    it("should return amount to be paid", async function () {
        this.timeout(10000);

        var payload = {
            "id": "BIL136",
            "product_id": "OT150"
        }
        var resp = await billsInstance.amt_to_be_paid(payload);
        return expect(resp).to.include.all.keys('data', 'message')
    });

    it("should return history of all purchased bill services", async function () {
        this.timeout(10000);

        var payload = {
            "from": "2019-08-01",
            "to": "2020-05-05"
        }
        var resp = await billsInstance.fetch_bills(payload);
        return expect(resp).to.have.property('summary')
    });


    it("should return all products under a government agency.", async function () {
        this.timeout(10000);

        var payload = {
            "id": "BIL136"
        }
        var resp = await billsInstance.products_under_agency(payload);
        return expect(resp).to.have.property('products')
    });

    it("should Create order using billing code and product id", async function () {
        this.timeout(10000);

        var payload = {
            "id": "3644",
            "product_id": "OT151",
            "amount": "3500.00",
            "reference": "FLWTTOT1000000029",
            "customer": {
                "name": "emmanuel",
                "email": "emmanuel@x.com",
                "phone_number": "08060811638"
            },
            "fields": [{
                    "id": "42107711:42107712",
                    "quantity": "1",
                    "value": "3500"
                },
                {
                    "id": "42107710",
                    "quantity": "1",
                    "value": "t@x.com"
                }
            ]

        }
        var resp = await billsInstance.create_ord_billing(payload);
        return expect(resp).to.have.property('message')
    });

});