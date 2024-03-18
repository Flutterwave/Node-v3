<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# BILLS

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

Make Bill payments via any of these methods:
1. [Create Bill Payment](#create-a-bill-payment)
2. [Create Bulk Bills](#create-bulk-bills)
3. [Get Bill Categories)](#get-bill-categories)
4. [Get amount to be paif for a product)](#get-amount-to-be-paid-for-a-product)
5. [Get Bill Payments](#get-bill-payments)
6. [Get Bill Categories](#get-bill-categories)
7. [Get Bill Payment Agencies](#get-bill-payment-agencies)
8. [Create Order](#create-order-using-billing-code-and-product-id)
9. [Get Products under an Agency](#get-products-under-an-agency)
10. [Get Status of a Bill Payment](#get-status-of-a-bill-payment)
11. [Update Bill Order](#update-bills-order)
12. [Validate Bill Service](#validate-bill-service)

##  Create a bill payment

This describes how to create bill payments

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const createBill = async () => {

    try {
        const payload={
            "country": "NG",
            "customer": "+23490803840303",
            "amount": 500,
            "recurrence": "ONCE",
            "type": "AIRTIME",
            "reference": "9300ko984"
        }
        
        const response = await flw.Bills.create_bill(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createBill();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Bill payment successful",
   "data": {
      "phone_number": "+23490803840303",
      "amount": 500,
      "network": "9MOBILE",
      "flw_ref": "CF-FLYAPI-20200311081921359990",
      "tx_ref": "BPUSSD1583957963415840",
      "reference": null
   }
}
```

##  Create bulk bills

This describes  how to create bulk bills payment

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const createBulkBill = async () => {

    try {
        const payload={
            "bulk_reference": "edf-12de5223d2f32",
            "callback_url": "https://webhook.site/5f9a659a-11a2-4925-89cf-8a59ea6a019a",
            "bulk_data": [
                {
                    "country": "NG",
                    "customer": "+23490803840303",
                    "amount": 500,
                    "recurrence": "WEEKLY",
                    "type": "AIRTIME",
                    "reference": "930049200929"
                },
                {
                    "country": "NG",
                    "customer": "+23490803840304",
                    "amount": 500,
                    "recurrence": "WEEKLY",
                    "type": "AIRTIME",
                    "reference": "930004912332"
                }
            ]
        }
        
        const response = await flw.Bills.create_bulk(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createBulkBill();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Bulk bill Payment was queued for processing",
   "data": {
      "batch_reference": "CF-BATCH-FLY-API-20200310042210201008"
   }
}
```

##  Get status of a bill payment

This describes  how to  get the status of a bill purchase

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const getStatus = async () => {

    try {
        const payload={
            "reference": "9300049404444",
        }
        
        const response = await flw.Bills.fetch_status(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getStatus();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Bill status fetch successful",
   "data": {
      "currency": "NGN",
      "customer_id": "2348109328188",
      "frequency": "One Time",
      "amount": "500.0000",
      "product": "AIRTIME",
      "product_name": "MTN",
      "commission": 0,
      "transaction_date": "2023-02-24T16:46:19.107Z",
      "country": "NG",
      "tx_ref": "CF-FLYAPI-20230224044619923826",
      "extra": null,
      "product_details": "FLY-API-NG-AIRTIME-MTN"
   }
}
```


##  Update bills order

This describes  how to  update bills order

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const updateBills = async () => {

    try {
        const payload = {
            "order_id": "be9c8abf-4611-46e9-85e7-5a2e8c5d7ab3",
            "amount": "3814.13",
            "reference": "FLWTTOT1000000019"
        }

        const response = await flw.Bills.update_bills(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


updateBills();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "bills order updated successfully",
   "data": {
      "amount": "3787.88",
      "order_reference": "be9c8abf-4611-46e9-85e7-5a2e8c5d7ab3",
      "total_amount": "3814.13",
      "meta": {
         "rrr": "230007813086"
      },
      "fee": "26.25",
      "flw_ref": "CF-FLYAPI-20200312075605138802",
      "tx_ref": "BP15839997672012166"
   }
}
```

##  Validate bill service

This describes  how to validate services like DSTV smartcard no, Meter number etc.

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const validateBill = async () => {

    try {
        const payload = {
            "item_code": "AT099",
            "code": "BIL099",
            "customer": "08038291822"
        }

        const response = await flw.Bills.validate(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


validateBill();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Item validated successfully",
   "data": {
      "response_code": "00",
      "address": null,
      "response_message": "Successful",
      "name": "MTN",
      "biller_code": "BIL099",
      "customer": "08038291822",
      "product_code": "AT099",
      "email": null,
      "fee": 0,
      "maximum": 0,
      "minimum": 0
   }
}
```


##  Get bill categories

This describes  how to fetch all bill categories on your account

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const getBillsCategories = async () => {

    try {
    
        const response = await flw.Bills.fetch_bills_Cat()
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getBillsCategories();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "bill categories retrieval successful",
  "data": [
    {
      "id": 1,
      "biller_code": "BIL099",
      "name": "MTN NIgeria",
      "default_commission": 0.02,
      "date_added": "2018-07-03T00:00:00Z",
      "country": "NG",
      "is_airtime": true,
      "biller_name": "AIRTIME",
      "item_code": "AT099",
      "short_name": "MTN",
      "fee": 0,
      "commission_on_fee": false,
      "label_name": "Mobile Number",
      "amount": 0
    },
    {
      "id": 2,
      "biller_code": "BIL099",
      "name": "GLO Nigeria",
      "default_commission": 0.025,
      "date_added": "2018-07-03T00:00:00Z",
      "country": "NG",
      "is_airtime": true,
      "biller_name": "AIRTIME",
      "item_code": "AT099",
      "short_name": "GLO",
      "fee": 0,
      "commission_on_fee": false,
      "label_name": "Mobile Number",
      "amount": 0
    },
    {
      "id": 3,
      "biller_code": "BIL099",
      "name": "9Mobile",
      "default_commission": 0.025,
      "date_added": "2018-07-03T00:00:00Z",
      "country": "NG",
      "is_airtime": true,
      "biller_name": "AIRTIME",
      "item_code": "AT099",
      "short_name": "9mobile",
      "fee": 0,
      "commission_on_fee": false,
      "label_name": "Mobile Number",
      "amount": 0
    },
    {
      "id": 4,
      "biller_code": "BIL099",
      "name": "Airtel Nigeria",
      "default_commission": 0.025,
      "date_added": "2018-07-03T00:00:00Z",
      "country": "NG",
      "is_airtime": true,
      "biller_name": "AIRTIME",
      "item_code": "AT099",
      "short_name": "Airtel",
      "fee": 0,
      "commission_on_fee": false,
      "label_name": "Mobile Number",
      "amount": 0
    },
    {
      "id": 5,
      "biller_code": "BIL132",
      "name": "Airtime",
      "default_commission": 0.025,
      "date_added": "2018-08-17T00:00:00Z",
      "country": "GH",
      "is_airtime": true,
      "biller_name": "AIRTIME",
      "item_code": "AT217",
      "short_name": "Airtime",
      "fee": 0,
      "commission_on_fee": false,
      "label_name": "Mobile Number",
      "amount": 0
    },
    {
      "id": 6,
      "biller_code": "BIL135",
      "name": "Airtime",
      "default_commission": 0.025,
      "date_added": "2018-08-17T00:00:00Z",
      "country": "US",
      "is_airtime": true,
      "biller_name": "AIRTIME",
      "item_code": "AT219",
      "short_name": "Airtime",
      "fee": 0,
      "commission_on_fee": false,
      "label_name": "Mobile Number",
      "amount": 0
    },
    {
      "id": 7,
      "biller_code": "BIL119",
      "name": "DSTV Payment",
      "default_commission": 0.3,
      "date_added": "2018-08-17T00:00:00Z",
      "country": "NG",
      "is_airtime": false,
      "biller_name": "DSTV",
      "item_code": "CB141",
      "short_name": "DSTV",
      "fee": 100,
      "commission_on_fee": true,
      "label_name": "Smart Card Number",
      "amount": 0
    },
    {
      "id": 8,
      "biller_code": "BIL137",
      "name": "DSTV Payment",
      "default_commission": 0,
      "date_added": "2018-08-17T00:00:00Z",
      "country": "GH",
      "is_airtime": false,
      "biller_name": "DSTV",
      "item_code": "CB226",
      "short_name": "DSTV",
      "fee": 0,
      "commission_on_fee": false,
      "label_name": "Smart card Number",
      "amount": 0
    },
    {
      "id": 9,
      "biller_code": "BIL119",
      "name": "DSTV BoxOffice",
      "default_commission": 0.3,
      "date_added": "2018-08-17T00:00:00Z",
      "country": "NG",
      "is_airtime": false,
      "biller_name": "DSTV BOX OFFICE",
      "item_code": "CB140",
      "short_name": "Box Office",
      "fee": 100,
      "commission_on_fee": true,
      "label_name": "Smart Card Number",
      "amount": 0
    },
    {
      "id": 10,
      "biller_code": "BIL127",
      "name": "LCC Lekki",
      "default_commission": 0.3,
      "date_added": "2019-02-20T00:00:00Z",
      "country": "NG",
      "is_airtime": false,
      "biller_name": "LCC",
      "item_code": "UB224",
      "short_name": "LCC Lekki-Epe Expressway",
      "fee": 100,
      "commission_on_fee": true,
      "label_name": "LCC Account Number",
      "amount": 0
    },
    {
      "id": 11,
      "biller_code": "BIL127",
      "name": "LCC Ikoyi",
      "default_commission": 0.3,
      "date_added": "2019-02-20T00:00:00Z",
      "country": "NG",
      "is_airtime": false,
      "biller_name": "LCC",
      "item_code": "UB225",
      "short_name": "LCC Ikoyi Bridge",
      "fee": 100,
      "commission_on_fee": true,
      "label_name": "Lcc Account Number",
      "amount": 0
    },
    {
      "id": 13,
      "biller_code": "BIL110",
      "name": "EKO PREPAID",
      "default_commission": 0.3,
      "date_added": "2019-03-20T00:00:00Z",
      "country": "NG",
      "is_airtime": false,
      "biller_name": "EKEDC PREPAID TOPUP",
      "item_code": "UB134",
      "short_name": "EKO PREPAID",
      "fee": 100,
      "commission_on_fee": true,
      "label_name": "Meter Number",
      "amount": 0
    },
    {
      "id": 14,
      "biller_code": "BIL110",
      "name": "EKO PPOSTPAID",
      "default_commission": 0.3,
      "date_added": "2019-02-03T00:00:00Z",
      "country": "NG",
      "is_airtime": false,
      "biller_name": "EKEDC POSTPAID TOPUP",
      "item_code": "UB135",
      "short_name": "EKO POSTPAID",
      "fee": 100,
      "commission_on_fee": true,
      "label_name": "Meter Number",
      "amount": 0
    },
    {
      "id": 15,
      "biller_code": "BIL138",
      "name": "AIRTEL",
      "default_commission": 0.01,
      "date_added": "2020-04-21T00:57:29.31Z",
      "country": "KE",
      "is_airtime": false,
      "biller_name": "AIRTEL",
      "item_code": "AT152",
      "short_name": "AIRTEL",
      "fee": 0,
      "commission_on_fee": false,
      "label_name": "Mobile Number",
      "amount": 0
    },
    {
      "id": 16,
      "biller_code": "BIL139",
      "name": "DSTV",
      "default_commission": 0.005,
      "date_added": "2020-04-21T00:59:45.103Z",
      "country": "KE",
      "is_airtime": false,
      "biller_name": "DSTV",
      "item_code": "CB153",
      "short_name": "DSTV",
      "fee": 0,
      "commission_on_fee": false,
      "label_name": "Smart Card Number",
      "amount": 0
    },
    {
      "id": 17,
      "biller_code": "BIL140",
      "name": "Prepaid",
      "default_commission": 0.005,
      "date_added": "2020-04-21T01:00:38.92Z",
      "country": "KE",
      "is_airtime": false,
      "biller_name": "Prepaid",
      "item_code": "UB154",
      "short_name": "Prepaid",
      "fee": 0,
      "commission_on_fee": false,
      "label_name": "Meter Number",
      "amount": 0
    },
    {
      "id": 18,
      "biller_code": "BIL140",
      "name": "Postpaid",
      "default_commission": 0.005,
      "date_added": "2020-04-21T01:00:38.92Z",
      "country": "KE",
      "is_airtime": false,
      "biller_name": "Postpaid",
      "item_code": "UB155",
      "short_name": "Postpaid",
      "fee": 0,
      "commission_on_fee": false,
      "label_name": "Meter Number",
      "amount": 0
    }
  ]
}
```


##  Get bill payment agencies

This describes  how to get all government agencies you can pay into

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const paymentAgencies = async () => {

    try {
    
        const response = await flw.Bills.fetch_bills_agencies()
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


paymentAgencies();
```

Sample Response

```javascript
{
    "status": "success",
    "message": "billers retrieval successful",
    "data": [
        {
            "code": "BIL136",
            "name": "Genesis Group Payment"
        },
        {
            "code": "BIL137",
            "name": "Government Payments"
        }
    ]
}
```



##  Get amount to be paid for a product

This describes  how to get amount to be paid for a product

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const amountToBePaid = async () => {

    try {

        const payload = {
            "id": "BIL136", //This is the biller's code
            "product_id": "OT150" //This is the item_code for the particular product
        }

        const response = await flw.Bills.amt_to_be_paid(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


amountToBePaid();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "billers products item retrieval successful",
   "data": {
      "exact": true,
      "items": [
         {
            "name": "email address",
            "id": "42107710",
            "type": "Alphanumeric",
            "value": "0",
            "required": true,
            "length": "10",
            "fixed": false
         },
         {
            "name": null,
            "id": "42107711:42107712",
            "type": "Numeric",
            "value": "3500",
            "required": true,
            "length": null,
            "fixed": true
         }
      ],
      "biller_code": "BIL136",
      "product_code": "OT151",
      "product_name": "GENESIS GROUP COLLEGE GRADUATION FEES",
      "amount": "3500.0"
   }
}
```

##  Get bill payments

This describes  how to get bill payments

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const getBillsPayment = async () => {

    try {

        const payload = {
            "from": "2019-08-01", //This is the start date it can be in any of this formats: YYYY-MM-DDTHH:MM:SSZ or YYYY-MM-DD
            "to": "2020-08-27",
            "page":"1", //This is the page you want to start from.
        }

        const response = await flw.Bills.fetch_bills(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getBillsPayment();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "bills retrieval successful",
  "data": {
    "summary": [
      {
        "currency": "NGN",
        "sum_bills": 28766.76,
        "sum_commission": 138.28,
        "sum_dstv": 0,
        "sum_airtime": 4550,
        "count_dstv": 0,
        "count_airtime": 10
      },
      {
        "currency": "KES",
        "sum_bills": 0,
        "sum_commission": 0,
        "sum_dstv": 0,
        "sum_airtime": 0,
        "count_dstv": 0,
        "count_airtime": 0
      },
      {
        "currency": "GHS",
        "sum_bills": 20,
        "sum_commission": 0.5,
        "sum_dstv": 0,
        "sum_airtime": 20,
        "count_dstv": 0,
        "count_airtime": 2
      },
      {
        "currency": "USD",
        "sum_bills": 3,
        "sum_commission": 0.08,
        "sum_dstv": 0,
        "sum_airtime": 3,
        "count_dstv": 0,
        "count_airtime": 1
      }
    ],
    "total": 3,
    "total_pages": 0,
    "reference": null
  }
}
```

##  Get products under an agency

This describes  how to get all products under a government agency.

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const productsUnderAgency = async () => {

    try {

        const payload = {
            "id": "BIL136" //This is the biller's code
        }

        const response = await flw.Bills.products_under_agency(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


productsUnderAgency();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "billers products retrieval successful",
   "data": {
      "biller_code": "BIL136",
      "meta": null,
      "products": [
         {
            "amount": "0.0",
            "code": "OT150",
            "fee": "0.0",
            "name": "GENESIS GROUP ACCOMODATION",
            "description": "GENESIS GROUP ACCOMODATION PAYMENT"
         },
         {
            "amount": "0.0",
            "code": "OT151",
            "fee": "0.0",
            "name": "GENESIS GROUP COLLEGE GRADUATION FEES",
            "description": "GENESIS GROUP COLLEGE GRADUATION FEES"
         }
      ]
   }
}
```


##  Create order using billing code and product id

This describes  how to create an order using the biller code and the product Id

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const Createorder = async () => {

    try {

        const payload = {
            "id": "3644",
            "product_id": "OT151",
            "amount": "3500.00",
            "reference": "FLWTTOT1000000029",
            "customer": {
                "name": "emmanuel",
                "email": "emmanuel@x.com",
                "phone_number": "08060811638"
            },
            "fields": [
                {
                    "id": "42107711:42107712",
                    "quantity": "1",
                    "value": "3500"
                },
                {
                    "id": "42107710",
                    "quantity": "1",
                    "value": "t@x.com"
                }
            ]
        }

        const response = await flw.Bills.create_ord_billing(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


Createorder();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Order processed successfully",
   "data": {
      "amount": "3787.88",
      "fee": "26.25",
      "tx_ref": "FLWTTOT1000000029",
      "order_reference": "d93ca22f-f129-4cb9-af51-abeb3c1790d0",
      "created_at": "2020-03-12T07:48:23580",
      "total_amount": "3814.13"
   }
}
```
