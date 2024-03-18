<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# MISC

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

Verify user information via any of these methods:
1. [Get all wallet balances](#get-all-wallet-balances)
2. [Get Balances per Currency](#get-balances-per-currency)
3. [Resolve Account Details](#resolve-account-details)
4. [Resolve BVN Details](#resolve-bvn-details)


## Get all wallet balances

This describes how to get all wallet balances

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const fetchBal = async () => {

    try {
        
        const response = await flw.Misc.bal()
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchBal();
1
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Wallet balances fetched",
  "data": [
    {
      "currency": "NGN",
      "available_balance": 2367840,
      "ledger_balance": 253125.82
    },
    {
      "currency": "KES",
      "available_balance": 0,
      "ledger_balance": 1226.72
    },
    {
      "currency": "GHS",
      "available_balance": 0,
      "ledger_balance": 0
    },
    {
      "currency": "USD",
      "available_balance": 0,
      "ledger_balance": 472.08
    },
    {
      "currency": "EUR",
      "available_balance": 0,
      "ledger_balance": 0
    },
    {
      "currency": "ZAR",
      "available_balance": 0,
      "ledger_balance": 0
    },
    {
      "currency": "GBP",
      "available_balance": 0,
      "ledger_balance": 0
    },
    {
      "currency": "TZS",
      "available_balance": 0,
      "ledger_balance": 0
    },
    {
      "currency": "UGX",
      "available_balance": 0,
      "ledger_balance": 0
    },
    {
      "currency": "RWF",
      "available_balance": 0,
      "ledger_balance": 5000
    },
    {
      "currency": "ZMW",
      "available_balance": 0,
      "ledger_balance": 0
    },
    {
      "currency": "INR",
      "available_balance": 0,
      "ledger_balance": 0
    },
    {
      "currency": "XOF",
      "available_balance": 0,
      "ledger_balance": 0
    },
    {
      "currency": "MUR",
      "available_balance": 0,
      "ledger_balance": 0
    },
    {
      "currency": "ETB",
      "available_balance": 0,
      "ledger_balance": 0
    }
  ]
}
```

## Get balances per currency

This describes how to get balances for specific currencies

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const fetchBal = async () => {

    try {
        const payload = {
            "currency": "NGN",
        }
        const response = await flw.Misc.bal_currency(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchBal();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Wallet balance fetched",
   "data": {
      "currency": "NGN",
      "available_balance": 2168880,
      "ledger_balance": 253125.82
   }
}
```

## Resolve account details

This describes how to resolve a bank account to get the account holder's details

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const resolveAcct = async () => {

    try {
        const payload = {
            "account_number": "0690000032",
            "account_bank": "044"
        }
        const response = await flw.Misc.verify_Account(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


resolveAcct();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Account details fetched",
   "data": {
      "account_number": "0690000032",
      "account_name": "Pastor Bright"
   }
}
```

## Initiate BVN Consent

This describes how to initiate bvn consent flow for your customer.

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const initiateBvn = async () => {

    try {
        const payload = {
          "bvn": "12347832211",
          "firstname": "Lyra",
          "lastname:" "Balacqua",
          "redirect_url": "https://example-url.company.com"
        }
        const response = await flw.Misc.bvn(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


initiateBvn();
```

Sample Response

```javascript
{
   "status":"success",
   "message":"Bvn verification initiated",
   "data":{
      "url":"https://nibss-bvn-consent-management.dev-flutterwave.com/cms/BvnConsent?session=MWNkNDI4ZWYtMjgwNy00ZjA1LWE5NzUtNzUyZGUyZDRjZWQz",
      "reference":"FLW71DC60942BAD76D2BD5B4E"
   }
}
```

## Verify BVN consent

This describes how to Verify consent and retirve the customer's BVN information.

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const verifyBvn = async () => {

    try {
        const payload = {
          "reference":"FLW71DC60942BAD76D2BD5B4E"
        }
        const response = await flw.Misc.verifybvn(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


verifyBVN();
```

Sample Response

```javascript
{
   "status":"success",
   "message":"Bvn details fetched",
   "data":{
      "first_name":"Lyra",
      "last_name":"Balacqua",
      "status":"INITIATED",
      "reference":"FLW71DC60942BAD76D2BD5B4E",
      "callback_url":null,
      "bvn_data":null,
      "created_at":"2024-02-16T08:28:10.000Z"
   }
}
```

