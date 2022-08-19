<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# Tokenization

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

## Charge with token
This describes how to create a tokenized charge

```javascript

const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const charge_with_token =  async()=>{
 
    try {

        const payload = {
            "token": "flw-t1nf-cff007a7699efee339c9271b9be4f3d7-m03k",
            "currency": "NGN",
            "country": "NG",
            "amount": 200,
            "email": "user@gmail.com",
            "first_name": "temi",
            "last_name": "desola",
            "narration": "Sample tokenized charge",
            "tx_ref": "MCs"+Date.now(),
            "redirect_url":"https://www.google.com"
        }
       const response =  await flw.Tokenized.charge(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}

charge_with_token();
```


## Update token details
This describes how to update details tied to a card token

```javascript

const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const update_token = async () => {

    try {

        const payload = {
            "token": "flw-t1nf-cff007a7699efee339c9271b9be4f3d7-m03k",
            "email": "user@example.com",
            "first_name": "Kendrick",
            "last_name": "Graham",
            "phone_number": "09090909990"
        }
        const response = await flw.Tokenized.update_token(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

update_token();
```


## Create bulk tokenized charge
This describes how to charge multiple payment tokens at once

```javascript
const charge_bulk = async () => {

    try {

        const payload = {
            "title": "Staff salary for June",
            "retry_strategy": {
                "retry_interval": 120,
                "retry_amount_variable": 60,
                "retry_attempt_variable": 2
            },
            "bulk_data": [
                {
                    "currency": "NGN",
                    "token": "flw-t1nf-6de8b97a7e1abb221decad7887afa45a-m03k",
                    "country": "NG",
                    "amount": 3500,
                    "email": "user@example.com",
                    "first_name": "Olufemi",
                    "last_name": "Obafunmiso",
                    "ip": "pstmn",
                    "tx_ref": "akhlm-pstmn-blkchrg-xx6"
                },
                {
                    "currency": "NGN",
                    "token": "flw-t1nf-f9b3bf384cd30d6fca42b6df9d27bd2f-m03k",
                    "country": "NG",
                    "amount": 3000,
                    "email": "user@example.com",
                    "first_name": "Temi",
                    "last_name": "Adesina",
                    "ip": "pstmn",
                    "tx_ref": "akhlm-pstmn-blkchrge-xx7"
                }
            ]
        }
        const response = await flw.Tokenized.bulk(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

charge_bulk();
```


## Get a bulk tokenized charge status
This describes how to get the status of a bulk tokenized charge

```javascript

const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const fetchBulk = async () => {

    try {

        const payload = {"bulk_id":"174"}
        const response = await flw.Tokenized.fetch_bulk(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

fetchBulk();
```


## Get bulk tokenized charge transactions
This describes how to get specific bulk tokenized charge transactions

```javascript

const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const fetch_charge_transactions = async () => {

    try {

        const payload = {"bulk_id":"174"}
        const response = await flw.Tokenized.fetch_charge_transactions(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

fetch_charge_transactions();
```