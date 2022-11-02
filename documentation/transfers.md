<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# TRANSFERS

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.


## Create a transfer
This describes how to initiate a transfer

For more info about the payload parameteres definition, check  [here](https://developer.flutterwave.com/reference#create-a-transfer)

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const initTrans = async () => {

    try {
        const payload = {
            "account_bank": "044", //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
            "account_number": "0690000040",
            "amount": 200,
            "narration": "ionnodo",
            "currency": "NGN",
            "reference": "transfer-"+Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
            "callback_url": "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
            "debit_currency": "NGN"
        }

        const response = await flw.Transfer.initiate(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


initTrans();


```
## Create bulk transfer
This describes how to initiate a bulk transfer

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const initBulk = async () => {

    try {
        const payload = {
            "title": "Staff salary",
            "bulk_data": [
                {
                    "bank_code": "044",
                    "account_number": "0690000032",
                    "amount": 45000,
                    "currency": "NGN",
                    "narration": "akhlm blktrnsfr",
                    "reference": "fhsfhsds"
                },
                {
                    "bank_code": "044",
                    "account_number": "0690000034",
                    "amount": 5000,
                    "currency": "NGN",
                    "narration": "akhlm blktrnsfr",
                    "reference": "akhlmfhsfhsds"
                }
            ]
        }

        const response = await flw.Transfer.bulk(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


initBulk();


```

## Get transfer fee
This describes how to get applicable transfer fee

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const getFee = async () => {

    try {
        const payload = {
            "amount":"5000",
            "currency":"NGN"
        }

        const response = await flw.Transfer.fee(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getFee();


```
## Get all transfers
This describes how to fetch all transfers on your account

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const getAllTrans = async () => {

    try {
        const payload = {
            "status":"failed"
        }

        const response = await flw.Transfer.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getAllTrans();


```

## Get a transfer
This describes how to fetch a single transfer on your account

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const getATransfer = async () => {

    try {
        const payload = {
            "id":"1570636" // This is the numeric ID of the transfer you want to fetch. It is returned in the call to create a transfer as data.id
        }

        const response = await flw.Transfer.get_a_transfer(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getATransfer();

```


## Wallet to Wallet Transfer
This will show you how to initiate a transfer from one Flutterwave wallet to another

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const walletToWallet = async () => {

    try {
        const payload = {
            "account_bank": "flutterwave", // This should always be set to flutterwave
            "merchant_id": "2360844", //This is the recipient merchant ID
            "amount": 5500, //This is the amount to transfer to the recipient
            "narration": "payment for x service provided",
            "currency": "NGN", //This can be NGN, GHS, KES, UGX, TZS, USD
            "reference": "wallet-transfer"+Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
            "debit_currency": "NGN" //You can pass this when you want to debit a currency balance and send money in another currency.
        }

        const response = await flw.Transfer.wallet_to_wallet(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


walletToWallet();


```