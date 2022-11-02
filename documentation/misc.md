<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# MISC

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.


### Get all wallet balances

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

```

### Get balances per currency

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

### Resolve account details

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

### Resolve bvn details

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

