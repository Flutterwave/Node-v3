<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# COLLECTIONS

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

Collect payments from your users via any of these methods:
1. [Cards](#card-collections)
2. [Bank transfers](#bank-transfers)
3. [Direct debit (Nigerian bank accounts)](#direct-debit-nigerian-bank-account)
4. [Direct debit (UK bank accounts)](#direct-debit-uk-bank-account)
5. [ACH payments](#ach-payement)
6. [Mpesa](#mpesa)
7. [Ghana Mobile Money](#ghana-mobile-money)
8. [Uganda Mobile Money](#uganda-mobile-money)
9. [Rwanda Mobile Money](#rwanda-mobile-money)
10. [Zambia Mobile Money](#zambia-mobile-money)
11. [Francophone Mobile Money (for Senegal, Cote D'Ivoire, Mali and Cameroon)](#francophone-mobile-money)
12. [Tanzania Mobile Money](#tanzania-mobile-money)
13. [USSD](#ussd)
14. [Enaira](#enaira)
15. [ApplePay](#apple-pay)
16. [GooglePay](#google-pay)

There are three steps involved in collecting payments from your users:

- Initating the transaction.
- Authorizing the transaction.
- Verifying the transaction.

Read more about the steps [here](https://developer.flutterwave.com/docs/direct-charge/overview)


## Card Collections

This section describes how you can collect card payments in the SDK. You can learn more about the payment method [here](https://developer.flutterwave.com/docs/direct-charge/card).

> Kindly note that `enckey` is your encryption key. You can get this from your API setting in the dashboard. You can check [here](https://developer.flutterwave.com/docs/integration-guides/authentication) to get more information on how to get your encryption key.

```javascript
const Flutterwave = require('flutterwave-node-v3');
const open = require('open');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

// Initiating the transaction
const payload = {
    "card_number": "5531886652142950",
    "cvv": "564",
    "expiry_month": "09",
    "expiry_year": "21",
    "currency": "NGN",
    "amount": "100",
    "redirect_url": "https://www.google.com",
    "fullname": "Flutterwave Developers",
    "email": "developers@flutterwavego.com",
    "phone_number": "09000000000",
    "enckey": process.env.FLW_ENCRYPTION_KEY,
    "tx_ref": "example01",
}

const chargeCard = async () => {
    try {
        const response = await flw.Charge.card(payload)
        console.log(response)

        // Authorizing transactions

        // For PIN transactions
        if (response.meta.authorization.mode === 'pin') {
            let payload2 = payload
            payload2.authorization = {
                "mode": "pin",
                "fields": [
                    "pin"
                ],
                "pin": 3310
            }
            const reCallCharge = await flw.Charge.card(payload2)

            // Add the OTP to authorize the transaction
            const callValidate = await flw.Charge.validate({
                "otp": "12345",
                "flw_ref": reCallCharge.data.flw_ref
            })
            console.log(callValidate)

        }
        // For 3DS or VBV transactions, redirect users to their issue to authorize the transaction
        if (response.meta.authorization.mode === 'redirect') {

            var url = response.meta.authorization.redirect
            open(url)
        }

        console.log(response)


    } catch (error) {
        console.log(error)
    }
}

chargeCard();
```


## Bank Transfers

This section covers how you can collect payments made via bank transfers. We go into more details on the payment flow itself [here](https://developer.flutterwave.com/docs/direct-charge/bank-transfer).

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const  bank_trf = async () => {

    try {

        const payload = {
            "tx_ref": "MC-1585230950508",
            "amount": "1500",
            "email": "johnmadakin@gmail.com",
            "phone_number": "054709929220",
            "currency": "NGN",
            "client_ip": "154.123.220.1",
            "device_fingerprint": "62wd23423rq324323qew1",
            "narration": "All star college salary for May",
            "is_permanent": false,
            "expires": 3600
        }

        const response = await flw.Charge.bank_transfer(payload)
        console.log(response);

    } catch (error) {
        console.log(error)
    }

}

bank_trf();

```
Sample Response

```javascript
{
    "status": "success",
    "message": "Charge initiated",
    "meta": {
        "authorization": {
            "transfer_reference": "MockFLWRef-1689847855598",
            "transfer_account": "0067100155",
            "transfer_bank": "Mock Bank",
            "account_expiration": 1689847855598,
            "transfer_note": "Mock note",
            "transfer_amount": "1500.00",
            "mode": "banktransfer"
        }
    }
}
```


## Direct debit (Nigerian bank account)

This section covers how you can collect payments made via your customers' bank accounts. The customer authorizes the payment with their bank, and the money is debited from their account. We go into more details on the payment flow itself [here](https://developer.flutterwave.com/docs/direct-charge/bank-account).

```javascript

const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const charge_ng_acct = async () => {
    
    try {

        const payload = {
            "tx_ref":"MC-1585230ew9v5050e0",
            "amount":"300",
            "currency":"NGN",
            "email":"johndoe@gmail.com",
            "phone_number":"08074568890",
            "fullname":"john doe"
        }

        const response = await flw.Charge.ng(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

charge_ng_acct();

```
Sample Response

```javascript
{
    "status": "success",
    "message": "Charge initiated",
    "data": {
        "id": 4475057,
        "tx_ref": "MC-1585230ew9v5050e0",
        "flw_ref": "1689845911540-FLW-MOCK-REF",
        "device_fingerprint": "N/A",
        "amount": 300,
        "charged_amount": 300,
        "app_fee": 4.2,
        "merchant_fee": 0,
        "processor_response": "Pending validation",
        "auth_model": "INTERNET_BANKING",
        "currency": "NGN",
        "ip": "54.75.161.64",
        "narration": "Flutterwave Developers",
        "status": "pending",
        "auth_url": "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaid/api/short-url/aqp45TtNl",
        "payment_type": "account",
        "fraud_status": "ok",
        "created_at": "2023-07-20T09:38:31.000Z",
        "account_id": 20937,
        "customer": {
            "id": 2151369,
            "phone_number": "08074568890",
            "name": "john doe",
            "email": "johndoe@gmail.com",
            "created_at": "2023-07-20T09:37:34.000Z"
        },
        "meta": {
            "authorization": {
                "mode": "redirect",
                "redirect": "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaid/api/short-url/aqp45TtNl",
                "validate_instructions": ""
            }
        }
    }
}
```

## Direct debit (UK & EU bank account)

This section covers how you make EUR and GBP collections via your customers' bank accounts. The customer is redirected to an interface where they select their bank and authorize the payment via their bank apps. We go into more details on the payment flow itself [here](https://developer.flutterwave.com/docs/direct-charge/uk-bank-account).

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const charge_uk_acct = async () => {

    try {

        const payload = {
            "tx_ref": "MC-1585230ew9v5050e8",
            "amount": "10",
            "currency": "GBP",
            "email": "olufemi@flw.com",
            "phone_number": "0902620185",
            "fullname": "Olufemi Obafunmiso",
            "redirect_url": "https://flutterwave.ng",
            "is_token_io": 1
        }

        const response = await flw.Charge.uk(payload)
        console.log(response);

    } catch (error) {
        console.log(error)
    }

}

charge_uk_acct();

```
Sample Response

```javascript
{
    "status": "success",
    "message": "Charge initiated",
    "data": {
        "id": 4474995,
        "tx_ref": "MC-1585230ew9v5050e8",
        "flw_ref": "LFTT5300124270590",
        "device_fingerprint": "N/A",
        "amount": 10,
        "charged_amount": 10,
        "app_fee": 0.14,
        "merchant_fee": 0,
        "processor_response": "Transaction is pending authentication",
        "auth_model": "TOKEN",
        "currency": "GBP",
        "ip": "52.209.154.143",
        "narration": "Flutterwave Developers",
        "status": "pending",
        "payment_type": "account-ach-uk",
        "fraud_status": "ok",
        "charge_type": "normal",
        "created_at": "2023-07-20T09:22:11.000Z",
        "account_id": 20937,
        "customer": {
            "id": 2151343,
            "phone_number": "07086234518",
            "name": "Olufemi Obafunmiso",
            "email": "olufemi@flw.com",
            "created_at": "2023-07-20T09:22:11.000Z"
        }
    },
    "meta": {
        "authorization": {
            "mode": "redirect",
            "redirect": "https://token-io-fe.dev-flutterwave.com/transactions?reference=LFTT5300124270590"
        }
    }
}
```

## ACH Payement

This shows you how to accept ZAR and USD  ACH charges from your customers.  We go into more details on the payment flow itself [here](https://developer.flutterwave.com/docs/direct-charge/ach-payment).

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const ach_payment = async () => {

    try {

        const payload = {
            "tx_ref": "MC-1585230ew9v5050e8",
            "amount": "100",
            "type": "ach_payment",
            "currency": "ZAR",
            "country": "SA",
            "email": "olufemi@flw.com",
            "phone_number": "0902620185",
            "fullname": "Olufemi Obafunmiso",
            "client_ip": "154.123.220.1",
            "redirect_url": "http://olufemiobafunmiso.com/u/payment-completed",
            "device_fingerprint": "62wd23423rq324323qew1",
            "meta": {
                "flightID": "123949494DC"
            }
        }

        const response = await flw.Charge.ach(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

ach_payment();
```
Sample Response

```javascript
{
    "status": "success",
    "message": "Charge initiated",
    "data": {
        "id": 1190657,
        "tx_ref": "MC-15852309v5050e8",
        "flw_ref": "FLW751551585302175553",
        "device_fingerprint": "62wd23423rq324323qew1",
        "amount": 100,
        "charged_amount": 100,
        "app_fee": 1.4,
        "merchant_fee": 0,
        "processor_response": "Pending Validation",
        "auth_model": "AUTH",
        "auth_url": "https://flutterwavestaging.com:9443/flwusprocessor/redirect?hid=FLW3f9f99f0e5534d438c15297bc608f21d",
        "currency": "USD",
        "ip": "154.123.220.1",
        "narration": "Yolande Aglaé Colbert",
        "status": "success-pending-validation",
        "payment_type": "account-ach-us",
        "fraud_status": "ok",
        "charge_type": "normal",
        "created_at": "2020-03-27T09:42:54.000Z",
        "account_id": 73362,
        "redirect_url": "https://www.flutterwave.com/us/",
        "customer": {
            "id": 349079,
            "phone_number": "0902620185",
            "name": "Yolande Aglaé Colbert",
            "email": "user@example.com",
            "created_at": "2020-03-27T09:42:54.000Z"
        }
    }
}
```

## USSD

This shows you how to accept payments via Direct USSD charge. You call our API to create a charge, then your customer completes the payment by dialling their bank's USSD code on their mobile phone.  We go into more details on the payment flow itself [here](https://developer.flutterwave.com/docs/direct-charge/ussd).

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const ussd = async () => {

    try {

        const payload = {
            "tx_ref": "MC-15852309v5050e8",
            "account_bank": "058"
            "amount": "1500",
            "currency": "NGN",
            "email": "user@flw.com",
            "phone_number": "07033923458",
            "fullname": "Yemi Desola"
        }

        const response = await flw.Charge.ussd(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

ussd();
```
Sample Response

```javascript

{
    "status": "success",
    "message": "Charge initiated",
    "data": {
        "id": 4517159,
        "tx_ref": "MC-15852309v5050e8",
        "flw_ref": "flwm3s4m0c1691591875526",
        "device_fingerprint": "N/A",
        "amount": 1500,
        "charged_amount": 1500,
        "app_fee": 21,
        "merchant_fee": 0,
        "processor_response": "Transaction in progress",
        "auth_model": "USSD",
        "currency": "NGN",
        "ip": "52.209.154.143",
        "narration": "Flutterwave Developers",
        "status": "pending",
        "payment_type": "ussd",
        "fraud_status": "ok",
        "charge_type": "normal",
        "created_at": "2023-08-09T14:37:55.000Z",
        "account_id": 20937,
        "customer": {
            "id": 2172937,
            "phone_number": "07033923458",
            "name": "Yemi Desola",
            "email": "user@flw.com",
            "created_at": "2023-08-09T14:37:55.000Z"
        },
        "payment_code": "4517159"
    },
    "meta": {
        "authorization": {
            "mode": "ussd",
            "note": "*566*002*4517159#"
        }
    }
}
```

<!-- ## Charge via Voucher payment
This describes how to collect ZAR payments offline using Vouchers

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const charg_voucher = async () => {

    try {

        const payload = {
            "tx_ref": "MC-15852309v5050e8",
            "amount": "100",
            "type": "voucher_payment",
            "currency": "ZAR",
            "pin": "19203804939000",
            "email": "olufemi@flw.com",
            "phone_number": "0902620185",
            "fullname": "Olufemi Obafunmiso"
        }
            const response = await flw.Charge.voucher(payload)
            console.log(response);
    } catch (error) {
            console.log(error)
    }

}

charg_voucher();
``` -->

## Mpesa

This describes how to collect payments via Mpesa. Read more about Mpesa payments [here](https://developer.flutterwave.com/docs/direct-charge/mpesa).

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const mpesa =  async () =>{

    try {

        const payload = {
            "tx_ref": "test987",
            "amount": "10",
            "currency": "KES",
            "email": "stefan.wexler@hotmail.eu",
            "phone_number": "25454709929220",
            "fullname": "Yolande Aglaé Colbert"
        }

       const response =  await flw.MobileMoney.mpesa(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
mpesa();
```
Sample Response

```javascript

{
   "status": "success",
   "message": "Charge initiated",
   "data": {
      "id": 4193428,
      "tx_ref": "test987",
      "flw_ref": "2993238342",
      "device_fingerprint": "N/A",
      "amount": 10,
      "charged_amount": 10,
      "app_fee": 0.29,
      "merchant_fee": 0,
      "processor_response": "Successful",
      "auth_model": "LIPA_MPESA",
      "currency": "KES",
      "ip": "::127.0.0.1",
      "narration": "FLW-PBF MPESA Transaction ",
      "status": "pending",
      "auth_url": "N/A",
      "payment_type": "mpesa",
      "fraud_status": "ok",
      "charge_type": "normal",
      "created_at": "2023-03-10T02:25:16.000Z",
      "account_id": 20937,
      "customer": {
         "id": 1998111,
         "phone_number": "25454709929220",
         "name": "Yolande Aglaé",
         "email": "stefan.wexler@hotmail.eu",
         "created_at": "2023-03-10T02:25:16.000Z"
      }
   }
}
```

## Ghana mobile money

This describes how to collect payments via Ghana mobile money. We go into more details on the payment flow itself [here](https://developer.flutterwave.com/docs/direct-charge/ghana-mobile-money).

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const Gh_mobilemoney =  async () =>{
 
    try {

        const payload = {
            "tx_ref": "test789",
            "amount": "150",
            "currency": "GHS",
            "voucher": "143256743",
            "network": "VODAFONE",
            "email": "stefan.wexler@hotmail.eu",
            "phone_number": "054709929220",
            "fullname": "Yolande Aglaé Colbert",
            "client_ip": "154.123.220.1",
            "device_fingerprint": "62wd23423rq324323qew1",
            "meta": {
                "flightID": "213213AS",
                "anotherBanger": "Rema or Spyce :)"
            }
        }

       const response =  await flw.MobileMoney.ghana(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
  
}

Gh_mobilemoney();
```

Sample Response

```javascript
{
   "body": {
      "status": "success",
      "message": "Charge initiated",
      "meta": {
         "authorization": {
            "redirect": "https://ravemodal-dev.herokuapp.com/captcha/verify/83940:dede0352930befaac522ca71e969f0e2",
            "mode": "redirect"
         }
      }
   }
}
```

**Redirect customer to the redirect link returned in the charge initiation response.**
**NB: OTP on staging (TEST MODE) is `123456`**


## Rwanda mobile money

This describes how to collect payments via Rwanda mobile money. We go into more details on the payment flow itself [here](https://developer.flutterwave.com/docs/direct-charge/rwanda-mobile-money).

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const rw_mobile_money =  async ()=>{
 
    try {

        const payload = {
            "tx_ref": "MC-158523s09v5050e8", 
            "order_id": "USS_URG_893982923s2323",
            "amount": "1500",
            "currency": "RWF",
            "email": "olufemi@flw.com",
            "phone_number": "054709929220",
            "fullname": "John Madakin"
        }

       const response =  await flw.MobileMoney.rwanda(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}

rw_mobile_money();
```

Sample Response
```javascript
{
    "status": "success",
    "message": "Charge initiated",
    "meta": {
        "authorization": {
            "redirect": "https://ravemodal-dev.herokuapp.com/captcha/verify/lang-en/97635:6450140e7b1d0108b402bd3c326f2d15",
            "mode": "redirect"
        }
    }
}
```

**Redirect customer to the redirect link returned in the charge initiation response.**
**NB: OTP on staging (TEST MODE) is `123456`**

## Uganda mobile money

This describes how to collect payments via Uganda mobile money. We go into more details on the payment flow itself [here](https://developer.flutterwave.com/docs/direct-charge/uganda-mobile-money).

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const ug_mobile_money =  async () =>{

    try {

        const payload = {
            "tx_ref": "MC-1585230950508",
            "amount": "1500",
            "email": "olufemi@flw.com",
            "phone_number": "054709929220",
            "currency": "UGX",
            "fullname": "Olufemi Obafunmiso",
            "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
            "voucher": "128373",
            "network": "MTN"
        }

       const response =  await flw.MobileMoney.uganda(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}

ug_mobile_money();
```

Sample Response
```javascript
{
    "status": "success",
    "message": "Charge initiated",
    "meta": {
        "authorization": {
            "redirect": "https://ravemodal-dev.herokuapp.com/captcha/verify/lang-en/97639:6bd0e317a5d95ccc7ea163482b33bdd2",
            "mode": "redirect"
        }
    }
}

```

**Redirect customer to the redirect link returned in the charge initiation response.**
**NB: OTP on staging (TEST MODE) is `123456`**


## Francophone mobile money

This describes how to collect payments via mobile money for Franc (XAF or XOF). We go into more details on the payment flow itself [here](https://developer.flutterwave.com/docs/direct-charge/francophone-mobile-money).

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const franc_mobile_money =  async () =>{
 
    try {

        const payload = {
            "tx_ref": 'test321',
            "amount": '10',
            "currency": 'XAF',
            "country": 'CM',
            "email": 'stefan.wexler@hotmail.eu',
            "phone_number": '23700000020',
            "fullname": 'Yolande Aglaé Colbert',
        }
       const response =  await flw.MobileMoney.franco_phone(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}

franc_mobile_money();
```

Sample Response

```javascript

{
   "body": {
      "status": "success",
      "message": "Charge initiated",
      "data": {
         "id": 4193429,
         "tx_ref": "test321",
         "flw_ref": "JFIX8206716784151202",
         "device_fingerprint": "N/A",
         "amount": 10,
         "charged_amount": 10,
         "app_fee": 0.25,
         "merchant_fee": 0,
         "processor_response": "Transaction in progress",
         "auth_model": "AUTH",
         "currency": "XAF",
         "ip": "::127.0.0.1",
         "narration": "Flutterwave Developers",
         "status": "pending",
         "payment_type": "mobilemoneysn",
         "fraud_status": "ok",
         "charge_type": "normal",
         "created_at": "2023-03-10T02:25:18.000Z",
         "account_id": 20937,
         "customer": {
            "id": 1998112,
            "phone_number": "23700000020",
            "name": "Yolande Aglaé",
            "email": "stefan.wexler@hotmail.eu",
            "created_at": "2023-03-10T02:25:18.000Z"
         }
      },
      "meta": {
         "authorization": {
            "mode": "callback",
            "redirect_url": null
         }
      }
   }
}
```

## Zambia mobile money

This describes how to collect payments via  Zambia  mobile money. We go into more details on the payment flow itself [here](https://developer.flutterwave.com/docs/direct-charge/zambia-mobile-money).

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const zambia_mobile_money =  async () =>{
 
    try {

        const payload = {
            "tx_ref": "MC-15852113s09v5050e8",
            "amount": "1500",
            "currency": "ZMW",
            "email": "olufemi@flw.com",
            "phone_number": "054709929220",
            "fullname": "Olufemi Obafunmiso",
            "order_id": "URF_MMGH_1585323540079_5981535" //Unique identifier for the mobilemoney transaction to be provided by the merchant
        }
       const response =  await flw.MobileMoney.zambia(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                               
}

zambia_mobile_money();
```

Sample Response

```javascript
{
    "status": "success",
    "message": "Charge initiated",
    "meta": {
        "authorization": {
            "redirect": "https://ravemodal-dev.herokuapp.com/captcha/verify/lang-en/97640:5dd11685fe49474090416b67eff38dc7",
            "mode": "redirect"
        }
    }
}
```
## Tanzania mobile money

This describes how to collect payments via  Tanzania  mobile money. You can get more information on Tanzania mobile money [here](https://developer.flutterwave.com/reference/endpoints/charge#tanzania-mobile-money)

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const tanzania_mobile_money =  async () =>{
 
    try {

        const payload = {
            "tx_ref":"MC-158523s09v5050e8",
            "amount":"150",
            "currency":"TZS",
            "network":"Halopesa",
            "email":"user@example.com",
            "phone_number":"0782835136",
            "fullname":"Yolande Aglaé Colbert",
            "client_ip":"154.123.220.1",
            "device_fingerprint":"62wd23423rq324323qew1",
            "meta":{
               "flightID":"213213AS"
                  }
        }
       const response =  await flw.MobileMoney.tanzania(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                               
}

tanzania_mobile_money();
```

Sample Response

```javascript
{
    "status": "success",
    "message": "Charge initiated",
    "data": {
        "id": 976392302,
        "tx_ref": "MC-158523s09v5050e8",
        "flw_ref": "SWWD88181689192176819143",
        "device_fingerprint": "62wd23423rq324323qew1",
        "amount": 150,
        "charged_amount": 150,
        "app_fee": 1000,
        "merchant_fee": 0,
        "processor_response": "request successful 20230712200256022250 Payment Request has been Accepted Successfully Waiting for Confirmation",
        "auth_model": "MOBILEMONEY",
        "currency": "TZS",
        "ip": "154.123.220.1",
        "narration": "Adekunle Odujoko",
        "status": "pending",
        "payment_type": "mobilemoneytz",
        "fraud_status": "ok",
        "charge_type": "normal",
        "created_at": "2023-07-12T20:02:56.000Z",
        "account_id": 1834035,
        "customer": {
            "id": 617886609,
            "phone_number": "0782835136",
            "name": "Yolande Aglaé",
            "email": "user@example.com",
            "created_at": "2023-07-12T20:02:56.000Z"
        }
    }
}
```

## Enaira

This describes how to collect payments via enaira. We go into more details on the payment flow itself [here](https://developer.flutterwave.com/docs/direct-charge/enaira).

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const eNaira =  async () =>{
 
    try {

        const payload = {
            "tx_ref":"MC-TEST-123456",
            "amount":"100",
            "currency":"NGN",
            "email":"user@example.com",
            "fullname":"Yemi Desola",
            "phone_number":"09000000000",
            "redirect_url":"https://flutterwave.ng"
        }
       const response =  await flw.Charge.enaira(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                               
}

eNaira();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Charge initiated",
   "data": {
      "id": 4197118,
      "tx_ref": "12345test_05",
      "flw_ref": "ZZYO0021678723801871881",
      "device_fingerprint": "N/A",
      "amount": 200,
      "charged_amount": 200,
      "app_fee": 2.8,
      "merchant_fee": 0,
      "processor_response": "pending",
      "auth_model": "ENAIRA",
      "currency": "NGN",
      "ip": "54.75.161.64",
      "narration": "Flutterwave Developers",
      "status": "pending",
      "payment_type": "enaira",
      "fraud_status": "ok",
      "charge_type": "normal",
      "created_at": "2023-03-13T16:10:00.000Z",
      "account_id": 20937,
      "customer": {
         "id": 1953337,
         "phone_number": "08092269174",
         "name": "Wisdom Joshua",
         "email": "wsdmjsh@gmail.com",
         "created_at": "2023-01-18T13:22:14.000Z"
      },
      "meta": {
         "authorization": {
            "mode": "redirect",
            "redirect": "https://camltest.azurewebsites.net/enairapay/?invoiceId=01GVDVRTG80MVSRJJQQYRFTZK3&amount=200&token=438890"
         }
      }
   }
}
```

## Apple Pay

This describes how to collect payments via Apple Pay. We go into more details on the payment flow itself [here](https://developer.flutterwave.com/docs/direct-charge/apple-pay).

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const applePay =  async () =>{
 
    try {

        const payload = {
            "tx_ref":"MC-TEST-123456",
            "amount":"10",
            "currency":"USD",
            "email": "user@example.com",
            "fullname": "Yolande Aglaé Colbert",
            "redirect_url":"https://flutterwave.ng",
            "client_ip":"192.168.0.1",
            "device_fingerprint":"gdgdhdh738bhshsjs",
            "billing_zip":"15101",
            "billing_city":"allison park",
            "billing_address":"3563 Huntertown Rd",
            "billing_state":"Pennsylvania",
            "billing_country":"US",
            "phone_number":"09012345678",
            "meta":{
                "metaname":"testmeta",
                "metavalue":"testvalue"
            }
        }
       const response =  await flw.Charge.applepay(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                               
}

applePay();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Charge initiated",
   "data": {
      "id": 645498756,
      "tx_ref": "MC-TEST-1234523",
      "flw_ref": "TKVH48681032738026",
      "device_fingerprint": "gdgdhdh738bhshsjs",
      "amount": 1,
      "charged_amount": 1.04,
      "app_fee": 0.04,
      "merchant_fee": 0,
      "processor_response": "Pending validation",
      "auth_model": "APPLEPAY",
      "currency": "GBP",
      "ip": "192.168.0.1",
      "narration": "Test payment",
      "status": "pending",
      "auth_url": "https://applepay.aq2-flutterwave.com?reference=TKVH48681032738026",
      "payment_type": "applepay",
      "fraud_status": "ok",
      "charge_type": "normal",
      "created_at": "2022-06-11T12:18:11.000Z",
      "account_id": 3442,
      "customer": {
         "id": 379560157,
         "phone_number": "09012345678",
         "name": "Flutterwave Developers",
         "email": "developers@flutterwavego.com",
         "created_at": "2022-06-11T12:18:11.000Z"
      },
      "meta": {
         "authorization": {
            "mode": "redirect",
            "redirect": "https://applepay.aq2-flutterwave.com?reference=TKVH48681032738026"
         }
      }
   }
}
```

## Google Pay

This describes how to collect payments via Google Pay. We go into more details on the payment flow itself [here](https://developer.flutterwave.com/docs/direct-charge/google-pay).

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const googlePay =  async () =>{
 
    try {

        const payload = {
            "tx_ref": "MC-TEST-1234568_success_mock",
            "amount": "10",
            "currency": "USD",
            "email": "user@example.com",
            "fullname": "Yolande Aglaé Colbert",
            "redirect_url": "https://flutterwave.ng",
            "client_ip": "192.168.0.1",
            "device_fingerprint": "gdgdhdh738bhshsjs",
            "billing_zip": "15101",
            "billing_city": "allison park",
            "billing_address": "3563 Huntertown Rd",
            "billing_state": "Pennsylvania",
            "billing_country": "US",
            "meta": {
                "metaname": "testmeta",
                "metavalue": "testvalue"
            }
        }
       const response =  await flw.Charge.googlepay(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                               
}

googlePay();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Charge initiated",
   "data": {
      "id": 2615403,
      "tx_ref": "MC-TEST-1234568_success_mock",
      "flw_ref": "RQFA6549001367743",
      "device_fingerprint": "gdgdhdh738bhshsjs",
      "amount": 10,
      "charged_amount": 10,
      "app_fee": 0.38,
      "merchant_fee": 0,
      "processor_response": "Payment token retrieval has been initiated",
      "auth_model": "GOOGLEPAY_NOAUTH",
      "currency": "USD",
      "ip": "54.75.56.55",
      "narration": "Test Google Pay charge",
      "status": "pending",
      "auth_url": "https://rave-api-v2.herokuapp.com/flwv3-pug/getpaid/api/short-url/XPtNw-WkQ",
      "payment_type": "googlepay",
      "fraud_status": "ok",
      "charge_type": "normal",
      "created_at": "2022-05-11T20:36:15.000Z",
      "account_id": 20937,
      "customer": {
         "id": 955307,
         "phone_number": null,
         "name": "Yolande Aglaé Colbert",
         "email": "user@example.com",
         "created_at": "2022-05-11T20:36:14.000Z"
      },
      "meta": {
         "authorization": {
            "mode": "redirect",
            "redirect": "https://rave-api-v2.herokuapp.com/flwv3-pug/getpaid/api/short-url/XPtNw-WkQ"
         }
      }
   }
}
```