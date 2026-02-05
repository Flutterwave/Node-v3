<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# Flutterwave v3 NodeJS Library

![npm](https://img.shields.io/npm/v/flutterwave-node-v3)
![npm](https://img.shields.io/npm/dt/flutterwave-node-v3)
![NPM](https://img.shields.io/npm/l/flutterwave-node-v3)

## Introduction

The Node library provides easy access to Flutterwave for Business (F4B) v3 APIs for your Node apps. It abstracts the complexity involved in direct integration and allows you to make quick calls to the APIs.
Available features include:

- Collections: Card, Account, Mobile money, Bank Transfers, USSD, Apple Pay, Google Pay, Fawry Pay, eNaira.
- Payouts and Beneficiaries.
- Recurring payments: Tokenization and Subscriptions.
- Split payments
- Card issuing
- Transactions dispute management: Refunds and Chargebacks.
- Transaction reporting: Collections, Payouts, Settlements, Refunds, Chargebacks and Transaction timeline.
- Bill payments: Airtime, Data bundle, Cable, Power, Toll, E-bills, and Remitta.
- Identity verification: Resolve bank account, resolve BVN information and generate OTP.

## Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Initialization](#initialization)
4. [Usage](#usage)
5. [Testing](#testing)
6. [Debugging Errors](#debugging-errors)
7. [Support](#support)
8. [Contribution guidelines](#contribution-guidelines)
9. [License](#license)
10. [Changelog](/CHANGELOG.md)

## Requirements

1. Flutterwave for business (F4B) [API Keys](https://developer.flutterwave.com/docs/integration-guides/authentication)
2. Node 18 or higher.

## Installation

To install the package, run the following command in your Node terminal:

```sh
npm install flutterwave-node-v3
```

## Initialization

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY,
);
```

For staging (Test environment), use the TEST API Keys and for production (Live environment), use LIVE API KEYS.
You can get your process.env.FLW_PUBLIC_KEY and process.env.FLW_SECRET_KEY from the Flutterwave dashboard. Read the [requirement section](#requirements) for more information on how to get your API keys.

## Usage

1. [Collections](documentation/collections.md)
2. [Tokenization](documentation/tokenization.md)
3. [Subscriptions](documentation/subscription.md)
4. [Transfers](documentation/transfers.md)
5. [Virtual Account](documentation/virtualAccount.md)
6. [Bill payments](documentation/billPayments.md)
7. [Transactions and reporting](documentation/transactions.md)
8. [Beneficiaries](documentation/beneficiary.md)
9. [Banks](documentation/banks.md)
10. [Settlements](documentation/settlements.md)
11. [OTP](documentation/otp.md)
12. [Ebills](documentation/ebills.md)
13. [Misc](documentation/misc.md)
14. [Virtual Cards](documentation/virtualCard.md)
15. [Collection Subaccounts](documentation/subaccount.md)
16. [Payment-plan](documentation/payment-plan.md)

## Testing

All of the libraries tests are run on Mocha. Available tests include `rave.bank.test`, `rave.beneficiaries.test`, `rave.bills.test`, `rave.charge.test`, `rave.ebills.test`, `rave.settlements.test`, `rave.subscriptions.test`. They can be run by running the test command in your terminal.

```sh
npm run test or npm test
```

## Debugging Errors

We understand that you may run into some errors while integrating our library. You can read more about our error messages [here](https://developer.flutterwave.com/docs/integration-guides/errors).
For `authorization` and `validation` error responses, double-check your API keys and request. If you get a `server` error, kindly engage the team for support.

## Support

For additional assistance using this library, contact the developer experience (DX) team via [email](mailto:developers@flutterwavego.com) or on [slack](https://bit.ly/34Vkzcg).
You can also follow us [@FlutterwaveEng](https://twitter.com/FlutterwaveEng) and let us know what you think 😊.

## Contribution guidelines

Read more about our community contribution guidelines [here](/CONTRIBUTING.md)

## License

By contributing to this library, you agree that your contributions will be licensed under its [MIT license](/LICENSE).
Copyright (c) Flutterwave Inc.
