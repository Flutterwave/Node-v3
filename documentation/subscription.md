<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# SUBSCRIPTION

We recommend that you first review the [main README](../README.md) to understand the requirements for using our library and how to implement it in your applications. This guide assumes you have done that.

Manage User subscriptions via any of these methods:
1. [Get all Subscriptions](#get-all-subscriptions)
2. [Fetch a Subscription](#fetch-subscriptions-with-customers-email)
3. [Cancel a Subscription](#cancel-a-subscription)
4. [Activate a Subscription](#activate-a-subscription)

## Get all subscriptions

This section describes how to get all subscriptions on your account.

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );
const fetchSubscription = async () => {

    try {
        
        const response = await flw.Subscription.fetch_all()
        console.log(response);
    } catch (error) {
        console.log(error)
    }

fetchSubscription();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Plan subscriptions fetched",
  "meta": {
    "page_info": {
      "total": 2,
      "current_page": 1,
      "total_pages": 1
    }
  },
  "data": [
    {
      "id": 4147,
      "amount": 2000,
      "customer": {
        "id": 247546,
        "customer_email": "developers@flutterwavego.com"
      },
      "plan": 3657,
      "status": "cancelled",
      "created_at": "2019-12-31T17:00:55.000Z"
    },
    {
      "id": 4146,
      "amount": 2000,
      "customer": {
        "id": 247490,
        "customer_email": "developers@flutterwavego.com"
      },
      "plan": 3657,
      "status": "cancelled",
      "created_at": "2019-12-31T14:44:20.000Z"
    }
  ]
}
```

## Fetch subscriptions with the customer's email

This section describes how to fetch subscriptions using your customer's email address.

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );
const getSubscription = async () => {

    try {
        const data = {
            "email": "cornelius@flutterwavego.com"
        }
        const response = await flw.Subscription.get(data)
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}
getSubscription();
```

Sample Response

```javascript
{
    "status": "success",
    "message": "Plan subscriptions fetched",
    "meta": {
        "page_info": {
            "total": 1,
            "current_page": 1,
            "total_pages": 1
        }
    },
    "data": [
        {
            "id": 15376,
            "amount": 2000,
            "customer": {
                "id": 1500129,
                "customer_email": "cornelius@flutterwavego.com"
            },
            "plan": 17490,
            "status": "cancelled",
            "created_at": "2022-01-24T15:05:45.000Z"
        }
    ]
}
```


## Cancel a subscription

This section describes how to cancel a subscription.

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const cancelSubscription = async () => {

    try {
        const payload={
            "id":"4147" //This is the unique ID of the subscription you want to cancel. It is returned in the Get a subscription call as data.id
        }
        
        const response = await flw.Subscription.cancel(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

cancelSubscription();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Subscription cancelled",
  "data": {
    "id": 4147,
    "amount": 2000,
    "customer": {
      "id": 247546,
      "customer_email": "developers@flutterwavego.com"
    },
    "plan": 3657,
    "status": "cancelled",
    "created_at": "2019-12-31T17:00:55.000Z"
  }
}
```

## Activate a subscription

This section describes how to activate a subscription.

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const activateSubscription = async () => {

    try {
        const payload={
            "id":"4147" //This is the unique ID of the subscription you want to activate. It is returned in the Get a subscription call as data.id
        }
        
        const response = await flw.Subscription.activate(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

activateSubscription();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Subscription activated",
  "data": {
    "id": 4147,
    "amount": 2000,
    "customer": {
      "id": 247546,
      "customer_email": "developers@flutterwavego.com"
    },
    "plan": 3657,
    "status": "active",
    "created_at": "2019-12-31T17:00:55.000Z"
  }
}

```
