<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# PAYMENT PLANS

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

Manage Payment Plans via any of these methods:
1. [Create Payment Plan](#create-payment-plan)
2. [Get a Payment Plan](#get-a-payment-plan)
3. [Get Payment Plans](#get-payment-plans)
4. [Update Payment Plan](#update-a-payment-plan)
5. [Cancel Payment Plan](#cancel-a-payment-plan)


##  Create payment plan

This describes  how to create a payment plan

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const createPaymentPlan = async () => {
  try {
    const payload = {
      amount: 1000,
      name: 'SDK test Plan', //This is the name of the payment, it will appear on the subscription reminder emails
      interval: 'monthly', //This will determine the frequency of the charges for this plan. Could be monthly, weekly, etc.
    };

    const response = await flw.PaymentPlan.create(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

createPaymentPlan();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Payment plan created",
   "data": {
      "id": 52045,
      "name": "SDK test Plan",
      "amount": "100",
      "interval": "monthly",
      "duration": 0,
      "status": "active",
      "currency": "NGN",
      "plan_token": "rpp_cd93e2fa88e065b960bf",
      "created_at": "2023-07-04T09:16:42.000Z"
   }
}
```

## Get payment plans

This describes how to fetch all payment plans on your account

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const fetchAllPlans = async () => {
  try {
    const response = await flw.PaymentPlan.get_all();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

fetchAllPlans();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Payment plans fetched",
   "meta": {
      "page_info": {
         "total": 106,
         "current_page": 1,
         "total_pages": 11
      }
   },
   "data": [
      {
         "id": 37829,
         "name": "testing",
         "amount": 100,
         "interval": "weekly",
         "duration": 4,
         "status": "cancelled",
         "currency": "NGN",
         "plan_token": "rpp_0aac3d0aa3f0c18565c0",
         "created_at": "2023-06-14T11:57:26.000Z"
      },
      {
         "id": 37828,
         "name": "API monitor",
         "amount": 100,
         "interval": "monthly",
         "duration": 0,
         "status": "cancelled",
         "currency": "NGN",
         "plan_token": "rpp_27ea9a4ef60dae5e7fc8",
         "created_at": "2023-06-14T11:48:26.000Z"
      },
      {
         "id": 36074,
         "name": "the akhlm postman plan 2",
         "amount": 100,
         "interval": "monthly",
         "duration": 5,
         "status": "cancelled",
         "currency": "NGN",
         "plan_token": "rpp_134b476d4d1f9181a219",
         "created_at": "2023-05-22T14:15:05.000Z"
      },
      {
         "id": 34444,
         "name": "postman plan 0",
         "amount": 100,
         "interval": "monthly",
         "duration": 8,
         "status": "cancelled",
         "currency": "NGN",
         "plan_token": "rpp_89b6c76c0394af004913",
         "created_at": "2023-03-26T21:05:26.000Z"
      },
      {
         "id": 34185,
         "name": "A sample KES monthly plan",
         "amount": 0,
         "interval": "monthly",
         "duration": 12,
         "status": "active",
         "currency": "NGN",
         "plan_token": "rpp_2f711270c4de5c2393d3",
         "created_at": "2023-03-15T00:34:50.000Z"
      },
      {
         "id": 33857,
         "name": "PHPSDK Test Plan",
         "amount": 1600,
         "interval": "monthly",
         "duration": 1,
         "status": "cancelled",
         "currency": "NGN",
         "plan_token": "rpp_0d087b5a4644f78252ad",
         "created_at": "2023-03-03T14:29:37.000Z"
      },
      {
         "id": 33856,
         "name": "PHPSDK Test Plan",
         "amount": 1600,
         "interval": "monthly",
         "duration": 1,
         "status": "cancelled",
         "currency": "NGN",
         "plan_token": "rpp_570f8a07e6c190a91f4f",
         "created_at": "2023-03-03T14:29:36.000Z"
      },
      {
         "id": 33855,
         "name": "PHPSDK Test Plan",
         "amount": 1600,
         "interval": "monthly",
         "duration": 1,
         "status": "cancelled",
         "currency": "NGN",
         "plan_token": "rpp_4f2926d1f3d1a56915a1",
         "created_at": "2023-03-03T14:29:33.000Z"
      },
      {
         "id": 33850,
         "name": "PHPSDK Test Plan",
         "amount": 1600,
         "interval": "monthly",
         "duration": 1,
         "status": "cancelled",
         "currency": "NGN",
         "plan_token": "rpp_98a4ebf8b3dfc7f494a1",
         "created_at": "2023-03-03T14:13:47.000Z"
      },
      {
         "id": 33849,
         "name": "PHPSDK Test Plan",
         "amount": 1600,
         "interval": "monthly",
         "duration": 1,
         "status": "cancelled",
         "currency": "NGN",
         "plan_token": "rpp_b6cc20cb87ee9a64d879",
         "created_at": "2023-03-03T14:13:39.000Z"
      }
   ]
}
```


## Get a payment plan

This describes how to get a single payment plan

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const fetchPlan = async () => {
  try {
    const payload = {
      id: '52045', //This is the unique ìdof the payment plan you want to fetch. It is returned in the call to create a payment plan asdata.id`
    };

    const response = await flw.PaymentPlan.get_plan(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

fetchPlan();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Payment plan fetched",
   "data": {
      "id": 52045,
      "name": "SDK test Plan",
      "amount": 100,
      "interval": "monthly",
      "duration": 0,
      "status": "active",
      "currency": "NGN",
      "plan_token": "rpp_cd93e2fa88e065b960bf",
      "created_at": "2023-07-04T09:16:42.000Z"
   }
}
```

## Update a payment plan

This describes how to update an existing payment plan

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const updatePlan = async () => {
  try {
    const payload = {
      id: '34185', //This is the unique ìdof the payment plan you want to fetch. It is returned in the call to create a payment plan asdata.id`
      name: 'A sample KES monthly plan',
      status: 'active',
    };

    const response = await flw.PaymentPlan.update(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

updatePlan();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Payment plan updated",
   "data": {
      "id": 34185,
      "name": "A sample KES monthly plan",
      "plan_token": "rpp_2f711270c4de5c2393d3",
      "status": "active",
      "currency": "NGN",
      "amount": 0,
      "duration": 12,
      "interval": "monthly",
      "created_at": "2023-03-15T00:34:50.000Z"
   }
}
```

## Cancel a payment plan
This describes how to cancel an existing payment plan

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const cancelPlan = async () => {
  try {
    const payload = {
      id: '34185', //This is the unique ìd` of the payment plan you want to cancel
    };

    const response = await flw.PaymentPlan.cancel(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

cancelPlan();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Payment plan cancelled",
   "data": {
      "id": 34185,
      "name": "A sample KES monthly plan",
      "plan_token": "rpp_2f711270c4de5c2393d3",
      "status": "cancelled",
      "currency": "NGN",
      "amount": 0,
      "duration": 12,
      "interval": "monthly",
      "created_at": "2023-03-15T00:34:50.000Z"
   }
}
```