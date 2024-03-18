<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# VIRTUAL CARDS

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

Manage Virtual Cards via any of these methods:
1. [Create Virtual Card](#create-virtual-card)
2. [Fetch all Virtual Cards](#get-all-virtual-cards)
3. [Fetch a Virtual Card](#get-a-virtual-card)
4. [Fund a Virtual Card](#fund-a-virtual-card)
5. [Withdraw from a Virtual Card](#withdraw-from-a-virtual-card)
6. [Terminate a Virtual Card](#terminate-a-virtual-card)
7. [Block a Virtual Card](#block-virtual-cards)
8. [Unblock a Virtual Card](#unblock-virtual-cards)

## Create virtual card

This describes how to create a new virtual card

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);




const createVcard = async () => {

    try {
        const payload = {
            "currency": "USD",
            "amount":5,
            "debit_currency": "NGN",
            "billing_name": "Example User.",
            "billing_address": "333, Fremont Street",
            "billing_city": "San Francisco",
            "billing_state": "CA",
            "billing_postal_code": "94105",
            "billing_country": "US",
            "first_name": "Example",
            "last_name": "User",
            "date_of_birth": "1996/12/30",
            "email": "userg@example.com",
            "phone": "07030000000",
            "title": "MR",
            "gender": "M",
            "callback_url": "https://webhook.site/b67965fa-e57c-4dda-84ce-0f8d6739b8a5"
        }
        const response = await flw.VirtualCard.create(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createVcard();
```

Sample Response

```javascript
{
    "status": "success",
    "message": "Card created successfully",
    "data": {
        "id": "199a344f-1dbe-4b00-ba4d-beb014345fae",
        "account_id": 2061620,
        "amount": "5.00",
        "currency": "USD",
        "card_pan": "5319938155020288",
        "masked_pan": "531993*******0288",
        "city": "San Francisco",
        "state": "CA",
        "address_1": "333 Fremont Street",
        "address_2": null,
        "zip_code": "94105",
        "cvv": "905",
        "expiration": "2025-09",
        "send_to": null,
        "bin_check_name": null,
        "card_type": "mastercard",
        "name_on_card": "Example user.",
        "created_at": "2022-09-21T16:54:53.3851427+00:00",
        "is_active": true,
        "callback_url": "https://webhook.site/b67965fa-e57c-4dda-84ce-0f8d6739b8a5"
    }
}
```

## Get all virtual cards


This describes how to Get all virtual cards

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const fetchAllVcards = async () => {

    try {
        const response = await flw.VirtualCard.fetch_all()
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchAllVcards();
```

Sample Response

```javascript
{
   "status":"success",
   "message":"Cards fetched successfully",
   "data":[
       {
         "id":"df3f2ba4-f137-4ce0-a6e3-3264c5831f17",
         "account_id":118661,
         "amount":"8999.00",
         "currency":"NGN",
         "card_hash":"df3f2ba4-f137-4ce0-a6e3-3264c5831f17",
         "card_pan":"5366136122489510",
         "masked_pan":"536613*******9510",
         "city":"Lekki",
         "state":"Lagos",
         "address_1":"19, Olubunmi Rotimi",
         "address_2":null,
         "zip_code":"23401",
         "cvv":"032",
         "expiration":"2024-11",
         "send_to":null,
         "bin_check_name":null,
         "card_type":"mastercard",
         "name_on_card":"1GM Main",
         "created_at":"2021-11-17T00:22:43.813Z",
         "is_active":true,
         "callback_url":null
      },
      {
         "id":"3f32e4bc-89b4-4bd2-bc55-22fbb04b882f",
         "account_id":118661,
         "amount":"4000.00",
         "currency":"USD",
         "card_hash":"3f32e4bc-89b4-4bd2-bc55-22fbb04b882f",
         "card_pan":"5366131828291260",
         "masked_pan":"536613*******1260",
         "city":"Lekki",
         "state":"Lagos",
         "address_1":"19, Olubunmi Rotimi",
         "address_2":null,
         "zip_code":"23401",
         "cvv":"725",
         "expiration":"2024-11",
         "send_to":null,
         "bin_check_name":null,
         "card_type":"mastercard",
         "name_on_card":"micheal spark",
         "created_at":"2021-11-16T18:46:09.567Z",
         "is_active":true,
         "callback_url":"https://boomchart.net/boompay_multi/use-virtual/"
      }
   ]
}
```

##  Get a virtual card

This describes how to fetch a virtual card

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );




const fetchVCard = async () => {

    try {
        const payload = {
            "id":"df3f2ba4-f137-4ce0-a6e3-3264c5831f17" //This is the unique id of the particular card you want to fetch its details. You can get this id from the call to create a virtual card or list virtual cards as data.id
        }
        const response = await flw.VirtualCard.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchVCard();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Card fetched successfully",
  "data": {
    "id": "df3f2ba4-f137-4ce0-a6e3-3264c5831f17",
    "account_id": 118661,
    "amount": "8999.00",
    "currency": "NGN",
    "card_hash": "df3f2ba4-f137-4ce0-a6e3-3264c5831f17",
    "card_pan": "5366136122489510",
    "masked_pan": "536613*******9510",
    "city": "Lekki",
    "state": "Lagos",
    "address_1": "19, Olubunmi Rotimi",
    "address_2": null,
    "zip_code": "23401",
    "cvv": "032",
    "expiration": "2024-11",
    "send_to": null,
    "bin_check_name": null,
    "card_type": "mastercard",
    "name_on_card": "1GM Main",
    "created_at": "2021-11-17T00:22:43.813Z",
    "is_active": true,
    "callback_url": null
  }
}
```

## Fund a virtual card

This describes how to fund an existing virtual card

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const fundCard = async () => {

    try {
        const payload = {
            "id":"c6d7f40b-f772-47b7-8136-81256d2f87a2", //This is the unique id of the particular card you want to fund. You can get this id from the call to create a virtual card as data.id
            "amount":500,
            "debit_currency":"NGN"
        }
        const response = await flw.VirtualCard.fund(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fundCard();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Card funded successfully",
  "data": null
}
```

## Terminate a virtual card

This describes how to terminate a virtual card

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const terminateCard = async () => {

    try {
        const payload = {
            "id":"c6d7f40b-f772-47b7-8136-81256d2f87a2"
        }
        const response = await flw.VirtualCard.terminate(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


terminateCard();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Card terminated successfully",
  "data": null
}
```

## Get virtual card transactions

This describes how to fetch transactions by date range on a single card

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const getTransactions = async () => {

    try {
        const payload = {
            "id":"b1405144-3427-4baf-80ea-5c6075a01a74",
            "from":"2019-01-01",
            "to":"2022-09-24",
            "index":"0", //Pass "0" if you want to start from the beginning
            "size":"1"  //Specify how many transactions you want to retrieve in a single call
        }
        const response = await flw.VirtualCard.transactions(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getTransactions();
```

Sample Response

```javascript
{
    "status": "success",
    "message": "Card transactions fetched successfully",
    "data": [
        {
            "id": 3843593,
            "amount": 50,
            "fee": 0,
            "product": "Card Funding",
            "gateway_reference_details": "b1405144-3427-4baf-80ea-5c6075a01a74",
            "reference": "CF-BARTER-20220705084609657628",
            "response_code": 5,
            "gateway_reference": "556338*******6411",
            "amount_confirmed": 0,
            "narration": "Card Funding",
            "indicator": "C",
            "created_at": "2022-07-05T20:46:09.94Z",
            "status": "Successful",
            "response_message": "Transaction was Successful",
            "currency": "USD"
        }
    ]
}
```

## Withdraw from a virtual card

This describes how to withdraw existing funds from a virtual card

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const withdrawal = async () => {

    try {
        const payload = {
            "id":"92b5d258-e85f-4ca6-835d-e0c6fa20d958",
            "amount":10
        }
        const response = await flw.VirtualCard.withdraw_funds(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


withdrawal();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Card transactions fetched successfully",
  "data": null
}
```


## Block Virtual Cards

This describes how to block a virtual card

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const blockCard = async () => {

    try {
        const payload = {
            "id":"92b5d258-e85f-4ca6-835d-e0c6fa20d958",
            "status_action":"block"
        }
        const response = await flw.VirtualCard.block(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


blockCard();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Card blocked successfully",
  "data": null
}
```



## Unblock Virtual Cards

This describes how to unblock a virtual card

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const unblockCard = async () => {

    try {
        const payload = {
            "id":"92b5d258-e85f-4ca6-835d-e0c6fa20d958",
            "status_action":"unblock"
        }
        const response = await flw.VirtualCard.block(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


unblockCard();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Card unblocked successfully",
  "data": null
}
```
