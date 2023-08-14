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

## Resolve bvn details

This describes how to fetch bvn information

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const resolveBvn = async () => {

    try {
        const payload = {
            "bvn": "123456789010"
        }
        const response = await flw.Misc.bvn(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


resolveBvn();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "BVN details fetched",
   "data": {
      "bvn": "123456789",
      "first_name": "Wendy",
      "middle_name": "Chucky",
      "last_name": "Rhoades",
      "date_of_birth": "01-01-1905",
      "phone_number": "08012345678",
      "registration_date": "01-01-1921",
      "enrollment_bank": "044",
      "enrollment_branch": "Idejo",
      "image_base_64": null,
      "address": null,
      "gender": "Male",
      "email": null,
      "watch_listed": null,
      "nationality": "Nigerian",
      "marital_status": null,
      "state_of_residence": null,
      "lga_of_residence": null,
      "image": null
   }
}
```

