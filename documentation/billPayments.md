<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# BILLS

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.


###  Create a bill payment

This describes how to create bill payments

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const createBill = async () => {

    try {
        const payload={
            "country": "NG",
            "customer": "+23490803840303",
            "amount": 100,
            "recurrence": "ONCE",
            "type": "AIRTIME",
            "reference": "930rwrwr0049404444"
         }
        
        const response = await flw.Bills.create_bill(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createBill();


```

###  Create bulk bills

This describes  how to create bulk bills payment

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const createBulkBill = async () => {

    try {
        const payload={
            "bulk_reference": "edf-1243de5223d2f32",
            "callback_url": "https://webhook.site/5f9a659a-11a2-4925-89cf-8a59ea6a019a",
            "bulk_data": [
               {
                  "country": "NG",
                  "customer": "+23490803840303",
                  "amount": 500,
                  "recurrence": "WEEKLY",
                  "type": "AIRTIME",
                  "reference": "9300wrwrw49200929"
                },
                {
                  "country": "NG",
                  "customer": "+23490803840304",
                  "amount": 500,
                  "recurrence": "WEEKLY",
                  "type": "AIRTIME",
                  "reference": "93003535rwr04912332"
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

###  Get status of a bill payment

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


###  Update bills order

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

###  Validate bill service

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


###  Get bill categories

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



###  Get bill payment agencies

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



###  Get amount to be paid for a product

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

###  Get bill payments

This describes  how to get bill payments

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const getBillsPayment = async () => {

    try {

        const payload = {
            "from": "2019-08-01", //This is the start date it can be in any of this formats: YYYY-MM-DDTHH:MM:SSZ or YYYY-MM-DD
            "to": "2020-08-27",
            "page":"1", //This is the page you want to start from
            "reference":"+233494850059" //

        }

        const response = await flw.Bills.fetch_bills(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getBillsPayment();


```

###  Get products under an agency

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


###  Create order using billing code and product id

This describes  how to create an order using the biller code and the product Id

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const Createorder = async () => {

    try {

        const payload = {
            "id": "BIL136", //This is the biller's code
            "product_id": "OT151",
            "amount": "3500.00",
            "reference": "FLWTTOT19efe000000029",
            "customer": {
                "name": "emmanuel",
                "email": "emmanuel@x.com",
                "phone_number": "08060811638"
            },
            "fields": [{
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
