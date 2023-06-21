<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# Flutterwave v3 NodeJS Library

![Node.js Package](https://github.com/Flutterwave/Flutterwave-node-v3/workflows/Node.js%20Package/badge.svg)
![npm](https://img.shields.io/npm/v/flutterwave-node-v3)
![npm](https://img.shields.io/npm/dt/flutterwave-node-v3)
![NPM](https://img.shields.io/npm/l/flutterwave-node-v3)

## Introduction

The Node library provides easy access to Flutterwave for Business (F4B) v3 APIs for your Node apps. It abstracts the complexity involved in direct integration and allows you to make quick calls to the APIs.
Available features include:

- Collections: Card, Account, Mobile money, Bank Transfers, USSD, Barter, NQR, Apple Pay, Google Pay.
- Payouts and Beneficiaries.
- Recurring payments: Tokenization and Subscriptions.
- Split payments
- Card issuing
- Transactions dispute management: Refunds and Chargebacks.
- Transaction reporting: Collections, Payouts, Settlements, Refunds, Chargebacks and Transaction timeline.
- Bill payments: Airtime, Data bundle, Cable, Power, Toll, E-bills, and Remitta.
- Identity verification: Resolve bank account, resolve BVN information and generate OTP.


## Table of Content
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

1. Flutterwave for business [API Keys](https://developer.flutterwave.com/docs/integration-guides/authentication)
2. Node 


## Installation

To install the library, run this comman in your Node terminal:

```sh
npm install flutterwave-node-v3
```


## Initialization

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
```

For staging, Use TEST API Keys and for production, use LIVE API KEYS.
You can get your process.env.FLW_PUBLIC_KEY and process.env.FLW_SECRET_KEY from the Flutterwave dashboard. Read the [requirement section](#requirements) for more information on how to get your API keys.


## Usage
1. [Collections](documentation/collections.md)
2. [Tokenization](documentation/tokenization.md)
3. [Split payments](documentation/splitPayments.md)
4. [Scheduled payments](documentation/scheduledPayments.md)
5. [Transfers](documentation/transfers.md)
6. [Card Issuing](documentation/cardIssuing.md)
7. [Virtual Account](documentation/virtualAccount.md)
8. [Bill payments](documentation/billPayments.md)
9. [Transactions and reporting](documentation/transactions.md)
10. [Beneficiaries](documentation/beneficiary.md)
11. [Banks](documentation/banks.md)
12. [Settlements](documentation/settlements.md)
13. [OTP](documentation/otp.md)
13. [Ebills](documentation/ebills.md)
14. [Misc](documentation/misc.md)
15. Virtual Cards


## SUBSCRIPTIONS
### ```Get all subscriptions```

This describes how to get all subscriptions

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );
const fetchSubscription = async () => {

    try {
        
        const response = await flw.Subscription.fetch_all()
        console.log(response);
    } catch (error) {
        console.log(error)
    }

fetchSubscription();

```

### ```Fetch subscriptions with customer's email```

This describes how to fetch subscriptions made by a single user.

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );
const getSubscription = async () => {

    try {
        const data = {
            "email": "user@example.com"
        }
        const response = await flw.Subscription.get(data)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

getSubscription();

```


### ```Cancel a subscription```

This describes how to cancel a subscription

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const cancelSubscription = async () => {

    try {
        const payload={
            "id":"3477" //This is the unique id of the subscription you want to cancel. It is returned in the Get a subscription call as data.id
        }
        
        const response = await flw.Subscription.cancel(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

cancelSubscription();
```

### `Create order using billing code and product id`

### ```Activate a subscription```

This describes how to activate a subscription

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const activateSubscription = async () => {

    try {
        const payload={
            "id":"3477" //This is the unique id of the subscription you want to activate. It is returned in the Get a subscription call as data.id
        }
        
        const response = await flw.Subscription.activate(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

activateSubscription();
```

## PAYMENT PLANS
###  ```Create payment plan```

This describes  how to create a payment plan

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const createPaymentPlan = async () => {
  try {
    const payload = {
      amount: 500,
      name: 'the olufemi obafunmiso plan 2', //This is the name of the payment, it will appear on the subscription reminder emails
      interval: 'monthly', //This will determine the frequency of the charges for this plan. Could be monthly, weekly, etc.
      duration: 24, //This is the frequency, it is numeric, e.g. if set to 5 and intervals is set to monthly you would be charged 5 months, and then the subscription stops
    };

    const response = await flw.PaymentPlan.create(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

createPaymentPlan();
```

### `Get payment plan`

This describes how to fetch all payment plans on your account

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const fetchAllPlans = async () => {
  try {
    const response = await flw.PaymentPlan.get_all();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

fetchAllPlans();
```

### `Get a payment plan`

This describes how to get a single payment plan

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const fetchPlan = async () => {
  try {
    const payload = {
      id: '5443', //This is the unique ìdof the payment plan you want to fetch. It is returned in the call to create a payment plan asdata.id`
    };

    const response = await flw.PaymentPlan.get_plan(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

fetchPlan();
```

### `Update a payment plan`

This describes how to update an existing payment plan

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const updatePlan = async () => {
  try {
    const payload = {
      id: '5443', //This is the unique ìdof the payment plan you want to fetch. It is returned in the call to create a payment plan asdata.id`
      name: 'January neighbourhood contribution',
      status: 'active',
    };

    const response = await flw.PaymentPlan.update(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

updatePlan();
```

### `Cancel a payment plan`
This describes how to cancel an existing payment plan

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const cancelPlan = async () => {
  try {
    const payload = {
      id: '5443', //This is the unique ìd` of the payment plan you want to cancel
    };

    const response = await flw.PaymentPlan.cancel(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

cancelPlan();
```

## SUBACCOUNTS
### `Create a payment plan`

This describes how to create a subaccount on Flutterwave

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const createSubaccount = async () => {
  try {
    const payload = {
      account_bank: '044',
      account_number: '0690000037',
      business_name: 'Eternal Blue',
      business_email: 'petya@stux.net',
      business_contact: 'Anonymous',
      business_contact_mobile: '090890382',
      business_mobile: '09087930450',
      country: 'NG',
      meta: [
        {
          meta_name: 'mem_adr',
          meta_value: '0x16241F327213',
        },
      ],
      split_type: 'percentage',
      split_value: 0.5,
    };

    const response = await flw.Subaccount.create(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

createSubaccount();
```

### `Fetch all subaccounts`

This describes how to get all subaccounts

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const fetchAllSubaccounts = async () => {
  try {
    const response = await flw.Subaccount.fetch_all();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

fetchAllSubaccounts();
```

### `Fetch a subaccount`

This describes how to fetch a subaccount using the sub-account's ID

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const fetchSubaccount = async () => {
  try {
    const payload = {
      id: '5716',
    };

    const response = await flw.Subaccount.fetch(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

fetchSubaccount();
```

### `Update a subaccount`

This describes how to update a subaccount

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const updateSubaccount = async () => {
  try {
    const payload = {
      id: '3244', //This is the unique id of the subaccount you want to update. It is returned in the call to create a subaccount as data.id
      business_name: 'Xyx lol!',
      business_email: 'mad@o.enterprises',
      account_bank: '044',
      account_number: '0690000040',
      split_type: 'flat',
      split_value: '200',
    };

    const response = await flw.Subaccount.update(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

updateSubaccount();
```

### `Delete a subaccount`

This describes how to delete a subaccount

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const updateSubaccount = async () => {
  try {
    const payload = {
      id: '3244', //This is the unique id of the subaccount you want to update. It is returned in the call to create a subaccount as data.id
    };

    const response = await flw.Subaccount.delete(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

updateSubaccount();
```

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
