<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# Tokenization

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

Manage Tokenized charges via any of these methods:
1. [Create a tokenized charge](#charge-with-token)
2. [Create bulk tokenized charge](#create-bulk-tokenized-charge)
3. [Fetch a bulk tokenized charge status](#get-a-bulk-tokenized-charge-status)
4. [Fetch a bulk tokenized charge transactions](#get-bulk-tokenized-charge-transactions)
5. [Update token details](#update-token-details)

## Charge with token

This describes how to create a tokenized charge

```javascript

const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const charge_with_token =  async()=>{
 
    try {

        const payload = {
            "token": "flw-t1nf-f9b3bf384cd30d6fca42b6df9d27bd2f-m03k",
            "currency": "NGN",
            "country": "NG",
            "amount": 2000,
            "email": "user@example.com",
            "first_name": "Flutterwave",
            "last_name": "Developers",
            "ip": "123.876.0997.9",
            "narration": "Sample tokenized charge",
            "tx_ref": "tokenized-c-001"
        }
       const response =  await flw.Tokenized.charge(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}

charge_with_token();
```

Sample Response

```javascript
{
   "status":"success",
   "message":"Charge successful",
   "data":{
      "id":277036749,
      "tx_ref":"new-live-test",
      "flw_ref":"FLW253481676",
      "redirect_url":"http://127.0.0",
      "device_fingerprint":"N/A",
      "amount":300,
      "charged_amount":300,
      "app_fee":4.2,
      "merchant_fee":0,
      "processor_response":"APPROVED",
      "auth_model":"noauth",
      "currency":"NGN",
      "ip":"123.456.543",
      "narration":"pstmn charge",
      "status":"successful",
      "payment_type":"card",
      "created_at":"2020-06-01T01:31:59.000Z",
      "account_id":17321,
      "customer":{
         "id":210745229,
         "phone_number":null,
         "name":"Flutterwave Developers",
         "email":"user@example.com",
         "created_at":"2020-06-01T01:27:24.000Z"
      },
      "card":{
         "first_6digits":"123456",
         "last_4digits":"7890",
         "issuer":"MASTERCARD GUARANTY TRUST BANK Mastercard Naira Debit Card",
         "country":"NG",
         "type":"MASTERCARD",
         "expiry":"08/22",
         "token":"flw-t1nf-f9b3bf384cd30d6fca42b6df9d27bd2f-m03k"
      }
   }
}
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

Sample Response

```javascript
{
    "status": "success",
    "message": "Token details updated",
    "data": {
        "customer_email": "user@example.com",
        "customer_full_name": "Kendrick Graham",
        "customer_phone_number": "09090909990",
        "created_at": "2020-01-15T13:26:24.000Z"
    }
}
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

Sample Response

```javascript
{
  "status": "success",
  "message": "Bulk charge successful",
  "data": {
    "id": 130,
    "created_at": "2020-01-19T21:43:39.000Z",
    "approver": "N/A"
  }
}
```


## Get a bulk tokenized charge status

This describes how to get the status of a bulk tokenized charge

```javascript

const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const fetchBulk = async () => {

    try {

        const payload = {
            "bulk_id":"156"
            }
        const response = await flw.Tokenized.fetch_bulk(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

fetchBulk();
```

Sample Response

```javascript
{
    "status": "success",
    "message": "Bulk charge fetched",
    "data": {
        "id": 156,
        "title": "akhlm blk tknzd chrg pstmn tst 1",
        "approver": "N/A",
        "processed_charges": 2,
        "pending_charges": 0,
        "total_charges": 2
    }
}
```


## Get bulk tokenized charge transactions

This describes how to get specific bulk tokenized charge transactions

```javascript

const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const fetch_charge_transactions = async () => {

    try {

        const payload = {
            "bulk_id":"156"
            }
        const response = await flw.Tokenized.fetch_charge_transactions(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

fetch_charge_transactions();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Bulk charge transactions fetched",
  "data": [
    {
      "tx_ref": "akhlm-pstmn-blkchrg-xx6",
      "id": "1017000",
      "flw_ref": "FLW-M03K-7544dc8d157ca763bbcf864a24906f93",
      "device_fingerprint": "N/A",
      "amount": 3500,
      "currency": "NGN",
      "charged_amount": 3549,
      "app_fee": 49,
      "merchant_fee": 0,
      "processor_response": "Approved",
      "auth_model": "noauth",
      "ip": "pstmn",
      "narration": "Kizito Akhilome",
      "status": "successful",
      "payment_type": "card",
      "created_at": "2020-01-19T21:46:29.000Z",
      "account_id": "73362",
      "amount_settled": 3450,
      "card": {
        "expiry": "09/22",
        "type": "MASTERCARD",
        "country": "NIGERIA NG",
        "issuer": "MASTERCARD  CREDIT",
        "first_6digits": "553188",
        "last_4digits": "2950"
      },
      "customer": {
        "id": "252759",
        "email": "user@example.com",
        "phone_number": "0813XXXXXXX",
        "name": "Kizito Akhilome",
        "created_at": "2020-01-15T13:26:24.000Z"
      }
    },
    {
      "tx_ref": "akhlm-pstmn-blkchrg-xx6",
      "id": "1017004",
      "flw_ref": "FLW-M03K-4aa1f32bbc80a7cf9e42426e9b2d73eb",
      "device_fingerprint": "N/A",
      "amount": 3500,
      "currency": "NGN",
      "charged_amount": 3549,
      "app_fee": 49,
      "merchant_fee": 0,
      "processor_response": "Approved",
      "auth_model": "noauth",
      "ip": "pstmn",
      "narration": "Kizito Akhilome",
      "status": "successful",
      "payment_type": "card",
      "created_at": "2020-01-19T21:49:29.000Z",
      "account_id": "73362",
      "amount_settled": 3450,
      "card": {
        "expiry": "09/22",
        "type": "MASTERCARD",
        "country": "NIGERIA NG",
        "issuer": "MASTERCARD  CREDIT",
        "first_6digits": "553188",
        "last_4digits": "2950"
      },
      "customer": {
        "id": "252759",
        "email": "user@example.com",
        "phone_number": "0813XXXXXXX",
        "name": "Kizito Akhilome",
        "created_at": "2020-01-15T13:26:24.000Z"
      }
    },
    {
      "tx_ref": "akhlm-pstmn-blkchrg-xx6",
      "id": "1163067",
      "flw_ref": "FLW-M03K-9d02da3020c67ac05ade7b596881d59f",
      "device_fingerprint": "N/A",
      "amount": 3500,
      "currency": "NGN",
      "charged_amount": 3500,
      "app_fee": 1050,
      "merchant_fee": 0,
      "processor_response": "Approved",
      "auth_model": "noauth",
      "ip": "pstmn",
      "narration": "Kizito Akhilome",
      "status": "successful",
      "payment_type": "card",
      "created_at": "2020-03-11T19:22:06.000Z",
      "account_id": "73362",
      "amount_settled": 2450,
      "card": {
        "expiry": "09/22",
        "type": "MASTERCARD",
        "country": "NIGERIA NG",
        "issuer": "MASTERCARD  CREDIT",
        "first_6digits": "553188",
        "last_4digits": "2950"
      },
      "customer": {
        "id": "252759",
        "email": "user@example.com",
        "phone_number": "0813XXXXXXX",
        "name": "Kendrick Graham",
        "created_at": "2020-01-15T13:26:24.000Z"
      }
    },
    {
      "tx_ref": "akhlm-pstmn-blkchrge-xx6",
      "id": "1017001",
      "flw_ref": "FLW-M03K-bbd148a9569b709882da8437e123ba61",
      "device_fingerprint": "N/A",
      "amount": 3000,
      "currency": "NGN",
      "charged_amount": 3042,
      "app_fee": 42,
      "merchant_fee": 0,
      "processor_response": "Approved",
      "auth_model": "noauth",
      "ip": "pstmn",
      "narration": "Kizito Akhilome",
      "status": "successful",
      "payment_type": "card",
      "created_at": "2020-01-19T21:46:30.000Z",
      "account_id": "73362",
      "amount_settled": 2950,
      "card": {
        "expiry": "09/22",
        "type": "MASTERCARD",
        "country": "NIGERIA NG",
        "issuer": "MASTERCARD  CREDIT",
        "first_6digits": "553188",
        "last_4digits": "2950"
      },
      "customer": {
        "id": "252759",
        "email": "user@example.com",
        "phone_number": "0813XXXXXXX",
        "name": "Kizito Akhilome",
        "created_at": "2020-01-15T13:26:24.000Z"
      }
    },
    {
      "tx_ref": "akhlm-pstmn-blkchrge-xx6",
      "id": "1017005",
      "flw_ref": "FLW-M03K-3a046716482046ea974c73d73eaa4463",
      "device_fingerprint": "N/A",
      "amount": 3000,
      "currency": "NGN",
      "charged_amount": 3042,
      "app_fee": 42,
      "merchant_fee": 0,
      "processor_response": "Approved",
      "auth_model": "noauth",
      "ip": "pstmn",
      "narration": "Kizito Akhilome",
      "status": "successful",
      "payment_type": "card",
      "created_at": "2020-01-19T21:49:30.000Z",
      "account_id": "73362",
      "amount_settled": 2950,
      "card": {
        "expiry": "09/22",
        "type": "MASTERCARD",
        "country": "NIGERIA NG",
        "issuer": "MASTERCARD  CREDIT",
        "first_6digits": "553188",
        "last_4digits": "2950"
      },
      "customer": {
        "id": "252759",
        "email": "user@example.com",
        "phone_number": "0813XXXXXXX",
        "name": "Kizito Akhilome",
        "created_at": "2020-01-15T13:26:24.000Z"
      }
    },
    {
      "tx_ref": "akhlm-pstmn-blkchrge-xx6",
      "id": "1163068",
      "flw_ref": "FLW-M03K-02c21a8095c7e064b8b9714db834080b",
      "device_fingerprint": "N/A",
      "amount": 3000,
      "currency": "NGN",
      "charged_amount": 3000,
      "app_fee": 1000,
      "merchant_fee": 0,
      "processor_response": "Approved",
      "auth_model": "noauth",
      "ip": "pstmn",
      "narration": "Kizito Akhilome",
      "status": "successful",
      "payment_type": "card",
      "created_at": "2020-03-11T19:22:07.000Z",
      "account_id": "73362",
      "amount_settled": 2000,
      "card": {
        "expiry": "09/22",
        "type": "MASTERCARD",
        "country": "NIGERIA NG",
        "issuer": "MASTERCARD  CREDIT",
        "first_6digits": "553188",
        "last_4digits": "2950"
      },
      "customer": {
        "id": "252759",
        "email": "user@example.com",
        "phone_number": "0813XXXXXXX",
        "name": "Kendrick Graham",
        "created_at": "2020-01-15T13:26:24.000Z"
      }
    }
  ]
}
```