// var cards = require('../lib/rave.virtual_cards');
// var tokenPayments = require('../lib/rave.tokenized');
// var base = require('../lib/rave.base');

// var Promise = require('bluebird');
// var mocha = require('mocha');
// var chai = require('chai');
// var expect = chai.expect;
// var chaiAsPromised = require('chai-as-promised');

// var dotenv = require('dotenv').config();

// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');

// chai.use(chaiAsPromised);
// chai.use(sinonChai);

// describe('#Rave Cards issuing', function () {
//   const public_key = process.env.PUBLIC_KEY;
//   const secret_key = process.env.SECRET_KEY;
//   const ravebase = new base(public_key, secret_key);

//   //   let trxInstance;
//   //   let momoStub;

//   beforeEach(() => {
//     cardInstance = new cards(ravebase);
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   it('should successfully fetch all cards', async function () {
//     this.timeout(10000);
//     // var payload = {
//     //   id: '4186265',
//     // };

//     var resp = await cardInstance.fetch_all();
//     // console.log(resp);
//   });

//   it('should successfully fetch card details', async function () {
//     this.timeout(10000);
//     var payload = {
//       id: '776192c3-a85b-4dc4-9620-109877d1f6f8',
//     };

//     var resp = await cardInstance.fetch(payload);
//     // console.log(resp);
//   });

//   it('should create a virtual card', async function () {
//     this.timeout(10000);

//     var payload = {
//       currency: 'USD',
//       amount: 5,
//       debit_currency: 'NGN',
//       billing_name: 'Example User.',
//       billing_address: '333, Fremont Street',
//       billing_city: 'San Francisco',
//       billing_state: 'CA',
//       billing_postal_code: '94105',
//       billing_country: 'US',
//       first_name: 'Example',
//       last_name: 'User',
//       date_of_birth: '1996/12/30',
//       email: 'userg@example.com',
//       phone: '07030000000',
//       title: 'Mr',
//       gender: 'M',
//       callback_url: 'https://webhook.site/b67965fa-e57c-4dda-84ce-0f8d6739b8a5',
//     };

//     var resp = await cardInstance.create(payload);
//     // console.log(resp);
//   });
// });
