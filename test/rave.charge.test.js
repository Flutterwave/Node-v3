// var charge = require('../lib/rave.charge');
// var base = require('../lib/rave.base');
// var Promise = require('bluebird');
// var mocha = require('mocha');
// var chai = require('chai');
// var expect = chai.expect;
// var chaiAsPromised = require('chai-as-promised');
// var dotenv = require('dotenv').config();

// chai.use(chaiAsPromised);

// describe('#Rave charge', function () {
//   const public_key = process.env.PUBLIC_KEY;
//   const secret_key = process.env.SECRET_KEY;
//   const ravebase = new base(public_key, secret_key);
//   var chargeInstance = new charge(ravebase);

//   it('should charge a card', async function () {
//     this.timeout(10000);

//     var payload = {
//       public_key: public_key,
//       card_number: '4556052704172643',
//       cvv: '899',
//       expiry_month: '01',
//       expiry_year: '21',
//       currency: 'NGN',
//       amount: '1000',
//       enckey: '611d0eda25a3c931863d92c4',
//       fullname: 'Ekene Eze',
//       email: 'ekene@flw.com',
//       phone_number: '0902620185',
//       tx_ref: 'MC-3ijkguhkiyfsffsujhkj243e',
//       redirect_url: 'https://webhook.site/3ed41e38-2c79-4c79-b455-97398730866c',
//       type: 'card',
//       authorization: {
//         mode: 'avs_noauth',
//         pin: '3310',
//         zipcode: '07205',
//         city: 'Hillside',
//         address: '470 Mundet PI',
//         state: 'NJ',
//         country: 'US',
//       },
//     };

//     var resp = await chargeInstance.card(payload);
//     return expect(resp).to.have.property('data');
//   });

//   it('should return charge Nigerian bank accounts', async function () {
//     this.timeout(10000);

//     var payload = {
//       tx_ref: 'MC-1585230ew9v5050e8',
//       amount: '100',
//       type: 'debit_ng_account',
//       account_bank: '044',
//       account_number: '0690000037',
//       currency: 'NGN',
//       email: 'ekene@flw.com',
//       phone_number: '0902620185',
//       fullname: 'Ekene Eze',
//     };
//     var resp = await chargeInstance.ng(payload);
//     return expect(resp).to.have.property('data');
//   });

//   it('should return UK bank accounts', async function () {
//     this.timeout(10000);

//     var payload = {
//       tx_ref: 'MC-1585230ew9v5050e8',
//       amount: '100',
//       type: 'debit_uk_account',
//       account_bank: '00000',
//       account_number: '0000000000',
//       currency: 'GBP',
//       email: 'ekene@flw.com',
//       phone_number: '0902620185',
//       fullname: 'Ekene Eze',
//     };
//     var resp = await chargeInstance.uk(payload);
//     return expect(resp).to.have.property('message');
//   });
// });
