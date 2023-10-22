<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# VIRTUAL ACCOUNT NUMBERS

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

Manage Virtual Accounts via any of these methods:
1. [Create a virtual account number](#create-a-virtual-account-number)
2. [Create bulk virtual account numbers](#create-bulk-virtual-account-numbers)
3. [Fetch a virtual account number](#get-a-virtual-account-number)
4. [Fetch bulk virtual account details](#get-bulk-virtual-account-details)


## Create a virtual account number

This describes how to create a virtual account number

Note: BVN is required for creating static account numbers in the Live Environment i.e if the value of is_permanent is True.
Kindly visit our API section found [here](https://developer.flutterwave.com/reference#create-a-virtual-account-number-1) for more information.

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const createAcct = async () => {

    try {
        const payload = {
            "email": "developers@flutterwavego.com",
            "is_permanent": true,
            "bvn": "12345678901",
            "tx_ref": "VA12",
            "phonenumber": "08109328188",
            "firstname": "Angela",
            "lastname": "Ashley",
             "narration": "Angela Ashley-Osuzoka"
        }
        const response = await flw.VirtualAcct.create(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createAcct();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Virtual account created",
  "data": {
    "response_code": "02",
    "response_message": "Transaction in progress",
    "flw_ref": "FLW-da93010f630240a7978e893af92fed62",
    "order_ref": "URF_1613406439309_370935",
    "account_number": "7824822527",
    "frequency": "N/A",
    "bank_name": "WEMA BANK",
    "created_at": "2021-02-15 16:27:22",
    "expiry_date": "N/A",
    "note": "Please make a bank transfer to CollinX Akpevwe Omokri",
    "amount": null
  }
}
```

## Create bulk virtual account numbers

This describes how to create bulk virtual account numbers

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const createBulkAcct = async () => {

    try {
        const payload = {
            "accounts": 5, //This is the number of virtual account numbers you want to generate
            "email": "sam@son.com",
            "is_permanent": true,
            "tx_ref": "jhn-mndkn-012439283422",
            "bvn": "12345678901"
        }
        const response = await flw.VirtualAcct.create_bulk(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createBulkAcct();
```

Sample Response

```javascript
{
    "status": "success",
    "message": "Bulk virtual accounts creation queued",
    "data": {
        "batch_id": "-RND_2611692003353987",
        "response_code": "02",
        "response_message": "Request added to Queue"
    }
}
```


## Get bulk virtual account details

This describes how to fetch bulk virtual account numbers using batch id

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const fetchBulk = async () => {

    try {
        const payload = {
            "batch_id": "-RND_1311590351499953", // This is the batch ID returned in the bulk virtual account numbers creation
        }
        const response = await flw.VirtualAcct.fetch_bulk(payload)
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
  "message": "Bulk virtual accounts fetched",
  "data": [
    {
      "response_code": "02",
      "response_message": "Transaction in progress",
      "flw_ref": "FLW-f2be3dfeb4fb4f1eb95c236b3129ef0c",
      "order_ref": "URF_1579516057896_3120635",
      "account_number": "7827737349",
      "frequency": "N/A",
      "bank_name": "WEMA BANK",
      "created_at": "2020-01-20 10:27:38",
      "expiry_date": "N/A",
      "note": "Please make a bank transfer to Earth Gang",
      "amount": null
    },
    {
      "response_code": "02",
      "response_message": "Transaction in progress",
      "flw_ref": "FLW-6117c6e877e34f7e80b76268ce73bb69",
      "order_ref": "URF_1579516058932_17235",
      "account_number": "7827554918",
      "frequency": "N/A",
      "bank_name": "WEMA BANK",
      "created_at": "2020-01-20 10:27:39",
      "expiry_date": "N/A",
      "note": "Please make a bank transfer to Earth Gang",
      "amount": null
    },
    {
      "response_code": "02",
      "response_message": "Transaction in progress",
      "flw_ref": "FLW-590fb41034b24dcd9f822f2c02c3cf98",
      "order_ref": "URF_1579516059900_4435935",
      "account_number": "7827619600",
      "frequency": "N/A",
      "bank_name": "WEMA BANK",
      "created_at": "2020-01-20 10:27:40",
      "expiry_date": "N/A",
      "note": "Please make a bank transfer to Earth Gang",
      "amount": null
    },
    {
      "response_code": "02",
      "response_message": "Transaction in progress",
      "flw_ref": "FLW-8e3fb79bb27040d69da1dbe467da8e7c",
      "order_ref": "URF_1579516060920_1225335",
      "account_number": "7827266267",
      "frequency": "N/A",
      "bank_name": "WEMA BANK",
      "created_at": "2020-01-20 10:27:41",
      "expiry_date": "N/A",
      "note": "Please make a bank transfer to Earth Gang",
      "amount": null
    },
    {
      "response_code": "02",
      "response_message": "Transaction in progress",
      "flw_ref": "FLW-1a5264671801416ba09211d0142f0bd1",
      "order_ref": "URF_1579516061920_4339335",
      "account_number": "7827342397",
      "frequency": "N/A",
      "bank_name": "WEMA BANK",
      "created_at": "2020-01-20 10:27:42",
      "expiry_date": "N/A",
      "note": "Please make a bank transfer to Earth Gang",
      "amount": null
    }
  ]
}
```

## Get a virtual account number

This describes how to fetch a virtual account number using order reference

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const fetch = async () => {

    try {
        const payload = {
            "order_ref": "URF_1579513580629_5981535", // This is the order reference returned in the virtual account number creation
        }
        const response = await flw.VirtualAcct.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetch();
```

Sample Response

```javascript
{
    "status": "success",
    "message": "Virtual nuban fetched",
    "data": {
        "response_code": "02",
        "response_message": "Transaction in progress",
        "flw_ref": "FLW-9b04c88aaf2244379f256691836fd9c9",
        "order_ref": "URF_1579513580629_5981535",
        "account_number": "7826463244",
        "frequency": "5",
        "bank_name": "WEMA BANK",
        "created_at": "2020-01-20 09:46:23",
        "expiry_date": "2020-01-25 23:59:59",
        "note": "Please make a bank transfer to Earth Gang",
        "amount": 50700
    }
}
```

