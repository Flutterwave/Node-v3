<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# TRANSACTIONS

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

Manage user transactions via any of these methods:
1. [Get all transactions](#get-all-transactions)
2. [Get transaction fee](#get-transaction-fee)
3. [Resend transaction webhook](#resend-transaction-webhook)
4. [Verify transaction](#verify-transaction)
5. [Create a transaction refund](#create-a-transaction-refund)
6. [View transaction timeline](#view-transaction-timeline)

## Get all transactions


This describes how to fetch all transactions on your account

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const fetch_transactions = async () => {

    try {


        const payload = {
            "from": "2020-01-01",
            "to": "2020-05-05"
        }
        const response = await flw.Transaction.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetch_transactions();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Transactions fetched",
  "meta": {
    "page_info": {
      "total": 44,
      "current_page": 1,
      "total_pages": 5
    }
  },
  "data": [
    {
      "id": "989226",
      "tx_ref": "m0ckaham-1578002686748",
      "flw_ref": "N/A",
      "device_fingerprint": "e2b5cd3ec0fa99d45bf204a1401fb981",
      "amount": 1000,
      "currency": "NGN",
      "charged_amount": 1000,
      "app_fee": null,
      "merchant_fee": 0,
      "processor_response": null,
      "auth_model": "AUTH",
      "ip": "197.211.58.137",
      "narration": "Earth Gang",
      "status": "pending",
      "payment_type": "account",
      "created_at": "2020-01-02T22:06:45.000Z",
      "amount_settled": null,
      "account": {
        "nuban": "0690000031",
        "bank": "ACCESS BANK NIGERIA"
      },
      "customer_name": "Yemi Desola",
      "customer_email": "user@gmail.com",
      "account_id": "73362"
    },
    {
      "id": "989223",
      "tx_ref": "m0ckaham-1578002686748",
      "flw_ref": "N/A",
      "device_fingerprint": "e2b5cd3ec0fa99d45bf204a1401fb981",
      "amount": 1000,
      "currency": "NGN",
      "charged_amount": 1000,
      "app_fee": null,
      "merchant_fee": 0,
      "processor_response": null,
      "auth_model": "AUTH",
      "ip": "197.211.58.137",
      "narration": "Earth Gang",
      "status": "pending",
      "payment_type": "account",
      "created_at": "2020-01-02T22:04:57.000Z",
      "amount_settled": null,
      "account": {
        "nuban": "0690000031",
        "bank": "ACCESS BANK NIGERIA"
      },
      "customer_name": "Yemi Desola",
      "customer_email": "user@gmail.com",
      "account_id": "73362"
    },
    {
      "id": "989222",
      "tx_ref": "m0ckaham-1578002611018",
      "flw_ref": "N/A",
      "device_fingerprint": "e2b5cd3ec0fa99d45bf204a1401fb981",
      "amount": 1000,
      "currency": "NGN",
      "charged_amount": 1000,
      "app_fee": null,
      "merchant_fee": 0,
      "processor_response": null,
      "auth_model": "AUTH",
      "ip": "197.211.58.137",
      "narration": "Earth Gang",
      "status": "pending",
      "payment_type": "account",
      "created_at": "2020-01-02T22:03:44.000Z",
      "amount_settled": null,
      "account": {
        "nuban": "0690000031",
        "bank": "ACCESS BANK NIGERIA"
      },
      "customer_name": "Yemi Desola",
      "customer_email": "user@gmail.com",
      "account_id": "73362"
    },
    {
      "id": "989217",
      "tx_ref": "m0ckaham-1578002504686",
      "flw_ref": "N/A",
      "device_fingerprint": "e2b5cd3ec0fa99d45bf204a1401fb981",
      "amount": 1000,
      "currency": "NGN",
      "charged_amount": 1000,
      "app_fee": null,
      "merchant_fee": 0,
      "processor_response": null,
      "auth_model": "AUTH",
      "ip": "197.211.58.137",
      "narration": "Earth Gang",
      "status": "pending",
      "payment_type": "account",
      "created_at": "2020-01-02T22:01:57.000Z",
      "amount_settled": null,
      "account": {
        "nuban": "0690000031",
        "bank": "ACCESS BANK NIGERIA"
      },
      "customer_name": "Yemi Desola",
      "customer_email": "user@gmail.com",
      "account_id": "73362"
    },
    {
      "id": "989216",
      "tx_ref": "m0ckaham-1578002147445",
      "flw_ref": "N/A",
      "device_fingerprint": "e2b5cd3ec0fa99d45bf204a1401fb981",
      "amount": 1000,
      "currency": "NGN",
      "charged_amount": 1000,
      "app_fee": null,
      "merchant_fee": 0,
      "processor_response": null,
      "auth_model": "AUTH",
      "ip": "197.211.58.137",
      "narration": "Earth Gang",
      "status": "pending",
      "payment_type": "account",
      "created_at": "2020-01-02T22:01:35.000Z",
      "amount_settled": null,
      "account": {
        "nuban": "0690000031",
        "bank": "ACCESS BANK NIGERIA"
      },
      "customer_name": "Yemi Desola",
      "customer_email": "user@gmail.com",
      "account_id": "73362"
    },
    {
      "id": "989214",
      "tx_ref": "m0ckaham-1578002147445",
      "flw_ref": "N/A",
      "device_fingerprint": "e2b5cd3ec0fa99d45bf204a1401fb981",
      "amount": 1000,
      "currency": "NGN",
      "charged_amount": 1000,
      "app_fee": null,
      "merchant_fee": 0,
      "processor_response": null,
      "auth_model": "AUTH",
      "ip": "197.211.58.137",
      "narration": "Earth Gang",
      "status": "pending",
      "payment_type": "account",
      "created_at": "2020-01-02T21:55:56.000Z",
      "amount_settled": null,
      "account": {
        "nuban": "0690000031",
        "bank": "ACCESS BANK NIGERIA"
      },
      "customer_name": "Yemi Desola",
      "customer_email": "user@gmail.com",
      "account_id": "73362"
    },
    {
      "id": "989213",
      "tx_ref": "m0ckaham-1578002107929",
      "flw_ref": "N/A",
      "device_fingerprint": "e2b5cd3ec0fa99d45bf204a1401fb981",
      "amount": 100000,
      "currency": "NGN",
      "charged_amount": 100000,
      "app_fee": null,
      "merchant_fee": 0,
      "processor_response": null,
      "auth_model": "AUTH",
      "ip": "197.211.58.137",
      "narration": "Earth Gang",
      "status": "pending",
      "payment_type": "account",
      "created_at": "2020-01-02T21:55:19.000Z",
      "amount_settled": null,
      "account": {
        "nuban": "0690000031",
        "bank": "ACCESS BANK NIGERIA"
      },
      "customer_name": "Yemi Desola",
      "customer_email": "user@gmail.com",
      "account_id": "73362"
    },
    {
      "id": "989208",
      "tx_ref": "m0ckaham-1578001692462",
      "flw_ref": "URF_1578001706192_7697035",
      "device_fingerprint": "e2b5cd3ec0fa99d45bf204a1401fb981",
      "amount": 100000,
      "currency": "NGN",
      "charged_amount": 100000,
      "app_fee": 1400,
      "merchant_fee": 0,
      "processor_response": "Approved Or Completed Successfully",
      "auth_model": "AUTH",
      "ip": "197.211.58.137",
      "narration": "Earth Gang",
      "status": "successful",
      "payment_type": "account",
      "created_at": "2020-01-02T21:48:26.000Z",
      "amount_settled": 98550,
      "account": {
        "nuban": "0690000031",
        "bank": "ACCESS BANK NIGERIA"
      },
      "customer_name": "Yemi Desola",
      "customer_email": "user@gmail.com",
      "account_id": "73362"
    },
    {
      "id": "989207",
      "tx_ref": "Flutterwave-Pages919998081709",
      "flw_ref": "URF_1578001508809_392835",
      "device_fingerprint": "e2b5cd3ec0fa99d45bf204a1401fb981",
      "amount": 1000,
      "currency": "NGN",
      "charged_amount": 1000,
      "app_fee": 14,
      "merchant_fee": 0,
      "processor_response": "Approved Or Completed Successfully",
      "auth_model": "AUTH",
      "ip": "197.211.58.137",
      "narration": "Earth Gang",
      "status": "successful",
      "payment_type": "account",
      "created_at": "2020-01-02T21:45:08.000Z",
      "amount_settled": 936,
      "account": {
        "nuban": "0690000031",
        "bank": "ACCESS BANK NIGERIA"
      },
      "customer_name": "Yemi Desola",
      "customer_email": "user@gmail.com",
      "account_id": "73362"
    },
    {
      "id": "989058",
      "tx_ref": "m0ckaham-1577989302655",
      "flw_ref": "URF_1577989314468_5262435",
      "device_fingerprint": "e2b5cd3ec0fa99d45bf204a1401fb981",
      "amount": 50000,
      "currency": "NGN",
      "charged_amount": 50000,
      "app_fee": 700,
      "merchant_fee": 0,
      "processor_response": "Approved Or Completed Successfully",
      "auth_model": "AUTH",
      "ip": "197.211.58.137",
      "narration": "Earth Gang",
      "status": "successful",
      "payment_type": "account",
      "created_at": "2020-01-02T18:21:54.000Z",
      "amount_settled": 49300,
      "account": {
        "nuban": "0690000031",
        "bank": "ACCESS BANK NIGERIA"
      },
      "customer_name": "Yemi Desola",
      "customer_email": "user@gmail.com",
      "account_id": "73362"
    }
  ]
}
```


## Get transaction fee


This describes how Get transaction fees

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const get_fee = async () => {

    try {


        const payload = {
            "amount": "1000",
            "currency": "NGN"
        }
        const response = await flw.Transaction.fee(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


get_fee();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Charged fee",
  "data": {
      "charge_amount": 10000,
      "fee": 140,
      "merchant_fee": 0,
      "flutterwave_fee": 140,
      "stamp_duty_fee": 50,
      "currency": "NGN"
  }
}
```

## Resend transaction webhook

This describes how resend a failed transaction webhook to your server

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const resendHooks = async () => {

    try {


        const payload = {
            "tx_ref": "rave-123wsvgfwefcwsfc456"
        }
        const response = await flw.Transaction.resend_hooks(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


resendHooks();

```

Sample Response

```javascript
{
    "status": "success",
    "message": "hook sent successfully",
    "data": "hook sent"
}
```

## Create a transaction refund

This describes how to initiate a transaction refund

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const refund = async () => {

    try {


        const payload = {
            "id": "5708", //This is the transaction unique identifier. It is returned in the initiate transaction call as data.id
            "amount":"10"
        }
        const response = await flw.Transaction.refund(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


refund();

```

Sample Response

```javascript
{
  "status": "success",
  "message": "Transaction refund initiated",
  "data": {
      "id": 8612,
      "account_id": 73362,
      "tx_id": 5708,
      "flw_ref": "URF_1577867664541_3572735",
      "wallet_id": 74639,
      "amount_refunded": 5000,
      "status": "completed",
      "destination": "payment_source",
      "meta": {
          "source": "availablebalance"
      },
      "created_at": "2020-01-24T09:18:37.366Z"
  }
}
```

## Verify transaction

This describes how Verify transactions using the transaction reference tx_ref

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const verify = async () => {

    try {
        const payload = {"id": "288200108" //This is the transaction unique identifier. It is returned in the initiate transaction call as data.id
        }
        const response = await flw.Transaction.verify(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


verify();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Transaction fetched successfully",
  "data": {
    "id": 288200108,
    "tx_ref": "LiveCardTest",
    "flw_ref": "YemiDesola/FLW275407301",
    "device_fingerprint": "N/A",
    "amount": 100,
    "currency": "NGN",
    "charged_amount": 100,
    "app_fee": 1.4,
    "merchant_fee": 0,
    "processor_response": "Approved by Financial Institution",
    "auth_model": "PIN",
    "ip": "::ffff:10.5.179.3",
    "narration": "CARD Transaction ",
    "status": "successful",
    "payment_type": "card",
    "created_at": "2020-07-15T14:31:16.000Z",
    "account_id": 17321,
    "card": {
      "first_6digits": "232343",
      "last_4digits": "4567",
      "issuer": "FIRST CITY MONUMENT BANK PLC",
      "country": "NIGERIA NG",
      "type": "VERVE",
      "token": "flw-t1nf-4676a40c7ddf5f12scr432aa12d471973-k3n",
      "expiry": "02/23"
    },
    "meta": null,
    "amount_settled": 98.6,
    "customer": {
      "id": 216519823,
      "name": "Yemi Desola",
      "phone_number": "N/A",
      "email": "user@gmail.com",
      "created_at": "2020-07-15T14:31:15.000Z"
    }
  }
}
```

## View transaction timeline


This describes how view Transaction Timeline

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const View_Transaction_Timeline = async () => {

    try {
        const payload = {
            "id": "1296063" //This is the unique transaction ID. It is returned in the verify transaction call as data.id
        }
        const response = await flw.Transaction.event(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


View_Transaction_Timeline();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Transaction events fetched",
  "data": [
    {
      "note": "Loaded modal https://raveappv2.herokuapp.com/pay/akhlm",
      "actor": "h0vkard@flw.ext",
      "object": "modal",
      "action": "loaded",
      "context": "web",
      "created_at": "2019-12-13T22:09:57.997Z"
    },
    {
      "note": "Switched to Pay with Bank Option",
      "actor": "h0vkard@flw.ext",
      "object": "modal",
      "action": "switched",
      "context": "web",
      "created_at": "2019-12-13T22:09:58.001Z"
    },
    {
      "note": "Pay button clicked",
      "actor": "h0vkard@flw.ext",
      "object": "MODAL",
      "action": "click",
      "context": "web",
      "created_at": "2019-12-13T22:09:56.903Z"
    },
    {
      "note": "IP Resolved 197.210.29.248",
      "actor": "h0vkard@flw.ext",
      "object": "IP",
      "action": "request",
      "context": "web",
      "created_at": "2019-12-13T22:09:59.595Z"
    },
    {
      "note": "Switched to Pay with Card Option",
      "actor": "h0vkard@flw.ext",
      "object": "modal",
      "action": "switched",
      "context": "web",
      "created_at": "2019-12-13T22:10:00.314Z"
    },
    {
      "note": "Entering Card Number",
      "actor": "h0vkard@flw.ext",
      "object": "Card Number",
      "action": "typing",
      "context": "web",
      "created_at": "2019-12-13T22:10:03.505Z"
    },
    {
      "note": "Stopped entering Card Number",
      "actor": "h0vkard@flw.ext",
      "object": "Card Number",
      "action": "typing",
      "context": "web",
      "created_at": "2019-12-13T22:10:04.522Z"
    },
    {
      "note": "Entering Expiry",
      "actor": "h0vkard@flw.ext",
      "object": "Expiry",
      "action": "typing",
      "context": "web",
      "created_at": "2019-12-13T22:10:04.523Z"
    },
    {
      "note": "Entering CVV",
      "actor": "h0vkard@flw.ext",
      "object": "CVV",
      "action": "typing",
      "context": "web",
      "created_at": "2019-12-13T22:10:06.595Z"
    },
    {
      "note": "Stopped entering Expiry",
      "actor": "h0vkard@flw.ext",
      "object": "Expiry",
      "action": "typing",
      "context": "web",
      "created_at": "2019-12-13T22:10:06.593Z"
    },
    {
      "note": "Stopped entering CVV",
      "actor": "h0vkard@flw.ext",
      "object": "CVV",
      "action": "typing",
      "context": "web",
      "created_at": "2019-12-13T22:10:12.412Z"
    },
    {
      "note": "Attempting card charge request",
      "actor": "h0vkard@flw.ext",
      "object": "CREDIT_CARD",
      "action": "charge",
      "context": "web",
      "created_at": "2019-12-13T22:10:12.530Z"
    },
    {
      "note": "Submitted Payment Details",
      "actor": "h0vkard@flw.ext",
      "object": "payment details:credit_card",
      "action": "submitted",
      "context": "web",
      "created_at": "2019-12-13T22:10:12.529Z"
    },
    {
      "note": "card charge request successful: request for PIN",
      "actor": "h0vkard@flw.ext",
      "object": "CREDIT_CARD",
      "action": "charge",
      "context": "web",
      "created_at": "2019-12-13T22:10:14.097Z"
    },
    {
      "note": "Attempting card charge request",
      "actor": "h0vkard@flw.ext",
      "object": "CREDIT_CARD",
      "action": "charge",
      "context": "web",
      "created_at": "2019-12-13T22:10:19.209Z"
    },
    {
      "note": "Card charge taking too long. Polling for response",
      "actor": "h0vkard@flw.ext",
      "object": "LONG_REQUEST",
      "action": "charge",
      "context": "web",
      "created_at": "2019-12-13T22:10:23.880Z"
    },
    {
      "note": "card charge request successful: request for OTP",
      "actor": "h0vkard@flw.ext",
      "object": "CREDIT_CARD",
      "action": "charge",
      "context": "web",
      "created_at": "2019-12-13T22:10:25.263Z"
    },
    {
      "note": "Attempting to validate card charge",
      "actor": "h0vkard@flw.ext",
      "object": "CARD_CHARGE",
      "action": "validate",
      "context": "web",
      "created_at": "2019-12-13T22:10:31.630Z"
    },
    {
      "note": "Validate card charge request complete",
      "actor": "h0vkard@flw.ext",
      "object": "CARD_CHARGE",
      "action": "validate",
      "context": "web",
      "created_at": "2019-12-13T22:10:33.146Z"
    },
    {
      "note": "Transaction Completed!",
      "actor": "h0vkard@flw.ext",
      "object": "TRANSACTION",
      "action": "completion",
      "context": "web",
      "created_at": "2019-12-13T22:10:33.151Z"
    },
    {
      "note": "Validate card charge successful",
      "actor": "h0vkard@flw.ext",
      "object": "CARD_CHARGE",
      "action": "validate",
      "context": "web",
      "created_at": "2019-12-13T22:10:33.147Z"
    }
  ]
}
```
