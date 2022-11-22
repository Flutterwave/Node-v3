<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# Card Issuing

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.


## VIRTUAL CARDS

### Create virtual card


This describes how to create a new virtual card

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);




const createVcard = async () => {

    try {
        const payload = {
            "currency": "NGN",
            "amount": 200,
            "first_name":"Dwayne",
            "last_name":"Johnson",
            "date_of_birth":"1972/05/02",
            "email":"dwaynejohnson@gmail.com",
            "phone":"08082479297",
            "title":"Mr",
            "gender":"M" ,
            "callback_url": "https://your-callback-url.com/"
        }
        const response = await flw.VirtualCard.create(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createVcard();
```

### Get all virtual cards


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

###  Get a virtual card

This describes how to fetch a virtual card

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );




const fetchVCard = async () => {

    try {
        const payload = {
            "id":"c6d7f40b-f772-47b7-8136-81256d2f87a2" //This is the unique id of the particular card you want to fetch its details. You can get this id from the call to create a virtual card or list virtual cards as data.id
        }
        const response = await flw.VirtualCard.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchVCard();
```

### Fund a virtual card

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

### Terminate a virtual card

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

### Get virtual card transactions

This describes how to fetch transactions by date range on a single card

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const getTransactions = async () => {

    try {
        const payload = {
            "id":"92b5d258-e85f-4ca6-835d-e0c6fa20d958",
            "from":"2019-01-01",
            "to":"2020-05-24",
            "index":"0", //Pass "0" if you want to start from the beginning
            "size":"5"  //Specify how many transactions you want to retrieve in a single call
        }
        const response = await flw.VirtualCard.transactions(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getTransactions();

```

### Withdraw from a virtual card

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


### Block Virtual Cards

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



### Unblock Virtual Cards

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
