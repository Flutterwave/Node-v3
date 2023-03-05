<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# OTPS

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.


###  Create Otp

This describes how to create an otp

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const createOTP = async () => {

    try {

        const payload = {
            "length": 7,
            "customer": { "name": "Kazan", "email": "kazan@mailinator.com", "phone": "2348131149273" },
            "sender": "log t",
            "send": true,
            "medium": ["email", "whatsapp"],
            "expiry": 5
        }

        const response = await flw.Otp.create(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createOTP();


```


###  Validate Otp

This describes how to validate an otp

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const validateOTP = async () => {

    try {

        const payload = {
            "reference": "CF-BARTER-20190420022611377491",
            "otp": "481208"
        }

        const response = await flw.Otp.validate(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


validateOTP();


```

