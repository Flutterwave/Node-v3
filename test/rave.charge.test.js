// var charge = require('../lib/rave.charge');
// var base = require('../lib/rave.base');
// var Promise = require('bluebird');
// var mocha = require('mocha');
// var chai = require('chai');
// var expect = chai.expect;
// var chaiAsPromised = require('chai-as-promised');
// var dotenv = require('dotenv').config();

// chai.use(chaiAsPromised);

// describe("#Rave charge", function () {


//     const public_key = "FLWPUBK_TEST-0e2a85451098b1f4fce628d84252bc8b-X";
//     const secret_key = "FLWSECK_TEST-05d4ee0807c33ef42fc040a3e8de37f5-X";
//     const ravebase = new base(public_key, secret_key);
//     var chargeInstance = new charge(ravebase);

//     it("should charge a card", async function () {
//         this.timeout(10000);

//         // var payload = {

//         //     "public_key": "FLWPUBK-348ea9a0fef6ec91be8c3d323350f7fd-X",
//         //     "card_number": "4556052704172643",
//         //     "cvv": "899",
//         //     "expiry_month": "01",
//         //     "expiry_year": "21",
//         //     "currency": "NGN",
//         //     "amount": "1000",
//         //     "enckey": "611d0eda25a3c931863d92c4",
//         //     "fullname": "Ekene Eze",
//         //     "email": "ekene@flw.com",
//         //     "phone_number": "0902620185",
//         //     "tx_ref": "MC-3ijkguhkiyfsffsujhkj243e",
//         //     "redirect_url": "https://webhook.site/3ed41e38-2c79-4c79-b455-97398730866c",
//         //     "type": "card",
//         //     "authorization": {
//         //         "mode": "avs_noauth",
//         //         "pin": "3310",
//         //         "zipcode": "07205",
//         //         "city": "Hillside",
//         //         "address": "470 Mundet PI",
//         //         "state": "NJ",
//         //         "country": "US"
//         //     }
//         // }

//         var payload = { 
//             card_number: '4242424242424242',
//             cvv: '828',
//             expiry_month: '09',
//             expiry_year: '31',
//             currency: 'NGN',
//             country: 'NG',
//             amount: '107.00',
//             email: 'test@yopmail.com',
//             IP: '165.22.223.6',
//             phonenumber: '+2348160000029',
//             tx_ref: '922',
//             meta: [ { metaname: 'customer_id', metavalue: '33202' } ],
//             redirect_url: 'https://shubham-3015.tookanapp.com/flutterwave/callback' 
//         }

//         var resp = await chargeInstance.card(payload);
//         return expect(resp).to.have.property('data')

//     });

//     // it("should return charge Nigerian bank accounts", async function () {
//     //     this.timeout(10000);

//     //     var payload = {
//     //         "tx_ref": "MC-1585230ew9v5050e8",
//     //         "amount": "100",
//     //         "type": "debit_ng_account",
//     //         "account_bank": "044",
//     //         "account_number": "0690000037",
//     //         "currency": "NGN",
//     //         "email": "ekene@flw.com",
//     //         "phone_number": "0902620185",
//     //         "fullname": "Ekene Eze"
//     //     }
//     //     var resp = await chargeInstance.ng(payload);
//     //     return expect(resp).to.have.property('data')
//     // });

//     // it("should return UK bank accounts", async function () {
//     //     this.timeout(10000);

//     //     var payload = {
//     //         "tx_ref": "MC-1585230ew9v5050e8",
//     //         "amount": "100",
//     //         "type": "debit_uk_account",
//     //         "account_bank": "00000",
//     //         "account_number": "0000000000",
//     //         "currency": "GBP",
//     //         "email": "ekene@flw.com",
//     //         "phone_number": "0902620185",
//     //         "fullname": "Ekene Eze"
//     //     }
//     //     var resp = await chargeInstance.uk(payload);
//     //     return expect(resp).to.have.property('message')
//     // });
    
// });