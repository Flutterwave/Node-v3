<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# OTPS

We recommend that you first review the [main README](../README.md) to understand the requirements for using our library and how to implement it in your applications. This guide assumes you have done that.

Manage OTPs via any of these methods:
1. [Create Otp](#create-otp)
2. [Validate Otp](#validate-otp)


##  Create Otp

This section describes how to create an OTP.

```JavaScript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const createOTP = async () => {

    try {

        const payload = {
            "length": 7,
            "customer": {
                "name": "Kazan",
                "email": "kazan@mailinator.com",
                "phone": "2348131149273"
            },
            "sender": "Test Sender",
            "send": true,
            "medium": [
                "email",
                "whatsapp"
            ],
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

Sample Response

```JavaScript
{
   "status": "success",
   "message": "OTP generated successfully",
   "data": [
      {
         "medium": "email",
         "reference": "CF-BARTER-20230305031441503636",
         "otp": "1495545",
         "expiry": "2023-03-05T03:19:41.8110726+00:00"
      },
      {
         "medium": "whatsapp",
         "reference": "CF-BARTER-20230305031443536582",
         "otp": "1495545",
         "expiry": "2023-03-05T03:19:43.4362097+00:00"
      }
   ]
}
```


##  Validate Otp

This section describes how to validate an OTP.

```JavaScript

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

Sample Response

```JavaScript
{
    "status": "success",
    "message": "Otp Authenticated successfully",
    "data": null
}
```

