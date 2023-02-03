<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# EBILLS

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.


###  Place ebills order

This describes how to create a new Ebills order

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const placeEbillsOrder = async () => {

    try {

        const payload = {
            "narration": "mndkn blls",
            "number_of_units": 2,
            "currency": "NGN",
            "amount": 200,
            "phone_number": "09384747474",
            "email": "jake@rad.com",
            "tx_ref": "akhlm-pstmn-109470393",
            "ip": "127.9.0.7",
            "custom_business_name": "John Madakin",
            "country": "NG"
        }

        const response = await flw.Ebills.order(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


placeEbillsOrder();


```



###  Update ebills order

This describes how to update order for ebills

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const updateEbillsOrder = async () => {

    try {

        const payload = {
            "reference": "RVEBLS-843984E9B66E-23240", //This is the reference returned in the create order endpoint as flw_ref.
            "currency": "NGN",
            "amount": 100
        }

        const response = await flw.Ebills.update(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


updateEbillsOrder();


```
