<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# Collections

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

Collect payments from your users via any of these methods:
1. [Cards](#card-collections)
2. [Bank transfers](#bank-transfers)
3. [Direct debit (Nigerian bank accounts)](#direct-debit-nigerian-bank-account)
4. [Direct debit (UK bank accounts)](#direct-debit-uk-bank-account)
5. ACH payments
6. Mpesa
7. Ghana Mobile Money
8. Uganda Mobile Money
9. Rwanda Mobile Money
10. Zambia Mobile Money
11. Francophone Mobile Money (for Senegal, Cote D'Ivoire, Mali and Cameroon).
12. USSD
13. eNaira
14. ApplePay 
15. GooglePay

There are three steps involved in collecting payments from your users:

- Initating the transaction.
- Authorizing the transaction.
- Verifying the transaction.

Read more about the steps [here](https://developer.flutterwave.com/docs/direct-charge/overview)


## Card Collections

This section describes how you can collect card payments in the SDK. You can learn more about the payment method [here](https://developer.flutterwave.com/docs/direct-charge/card).

> Kindly note that `enckey` is your encryption key. You can get this from your API setting in the dashboard.

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
    "tx_ref": "example01"

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
            "duration": 2,
            "frequency": 5,
            "narration": "All star college salary for May",
            "is_permanent": 1,
        }

        const response = await flw.Charge.bank_transfer(payload)
        console.log(response);

    } catch (error) {
        console.log(error)
    }

}

bank_trf();

```


## Direct debit (Nigerian bank account)

```javascript

const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const charge_ng_acct = async () => {
    
    try {

        const payload = {
            "tx_ref": "example01",
            "amount": "100",
            "account_bank": "044",
            "account_number": "0690000037",
            "currency": "NGN",
            "email": "olufemi@flw.com",
            "phone_number": "09000000000", 
            "fullname": "Flutterwave Developers"
        }

        const response = await flw.Charge.ng(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

charge_ng_acct();
```


## Direct debit (UK bank account)

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const charge_uk_acct = async () => {

    try {

        const payload = {
            "tx_ref": "MC-1585230ew9v5050e8",
            "amount": "100",
            "account_bank": "00000",
            "account_number": "0000000000",
            "currency": "GBP",
            "email": "olufemi@flw.com",
            "phone_number": "0902620185",
            "fullname": "Olufemi Obafunmiso"
        }

        const response = await flw.Charge.uk(payload)
        console.log(response);

    } catch (error) {
        console.log(error)
    }

}

charge_uk_acct();

```

## ACH Payement
This shows you how to accept ZAR and USD  ACH charges from your customers. Read more about ACH payments [here](https://developer.flutterwave.com/docs/direct-charge/ach-payment).

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


## USSD
This describes how to collect payments via ussd

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

## Charge via Voucher payment
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
```

## Mpesa
This describes how to collect payments via Mpesa. Read more about Mpesa payments [here](https://developer.flutterwave.com/docs/direct-charge/mpesa).

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const mpesa =  async () =>{

    try {

        const payload = {
            "tx_ref": "MC-15852113s09v5050e8",
            "amount": "1500",
            "currency": "KES",
            "email": "olufemi@flw.com",
            "phone_number": "054709929220",
            "fullname": "Olufemi Obafunmiso"
    }

       const response =  await flw.MobileMoney.mpesa(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
mpesa();
```


## Ghana mobile money
This describes how to collect payments via Ghana mobile money.

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const Gh_mobilemoney =  async () =>{
 
    try {

        const payload = {
            "tx_ref": "MC-158523s09v5050e8",
            "amount": "150",
            "type": "mobile_money_ghana",
            "currency": "GHS",
            "voucher": "143256743",
            "network": "MTN", //This is the customer's mobile money network provider (possible values: MTN, VODAFONE, TIGO)
            "email": "user@gmail.com",
            "phone_number": "054709929220",
            "fullname": "John Madakin",
            "client_ip": "154.123.220.1",
            "device_fingerprint": "62wd23423rq324323qew1",
            "meta": {
                "flightID": "213213AS"
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
    status: 'success',
    message: 'Charge initiated',
    meta: {
        authorization: {
            redirect: 'https://checkout.flutterwave.com/captcha/verify/1287327:4880b0705d15b949b84e056d7cf8b1dd',
            mode: 'redirect'
        }
    }
}
```

**Redirect customer to the redirect link returned in the charge initiation response.**
**NB: OTP on staging (TEST MODE) is `123456`**


## Rwanda mobile money
This describes how to collect payments via Rwanda mobile money.

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
  status: 'success',
  message: 'Charge initiated',
  meta: {
    authorization: {
      redirect: 'https://checkout.flutterwave.com/captcha/verify/1287327:4880b0705d15b949b84e056d7cf8b1dd',
      mode: 'redirect'
    }
  }
}
```

**Redirect customer to the redirect link returned in the charge initiation response.**
**NB: OTP on staging (TEST MODE) is `123456`**

## Uganda mobile money
This describes how to collect payments via Uganda mobile money.

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
  status: 'success',
  message: 'Charge initiated',
  meta: {
        authorization: {
        redirect: 'https://checkout.flutterwave.com/captcha/verify/1287327:4880b0705d15b949b84e056d7cf8b1dd',
        mode: 'redirect'
        }
    }
}

```

**Redirect customer to the redirect link returned in the charge initiation response.**
**NB: OTP on staging (TEST MODE) is `123456`**


## Francophone mobile money
This describes how to collect payments via mobile money for Franc.

```javascript
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const franc_mobile_money =  async () =>{
 
    try {

        const payload = {
            "tx_ref": "MC-158523s09v5050e8",
            "amount": "1500",
            "currency": "XAF",
            "email": "olufemi@flw.com",
            "phone_number": "054709929220",
            "fullname": "Olufemi Obafunmiso"
        }
       const response =  await flw.MobileMoney.franco_phone(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}

franc_mobile_money();
```

### ```Zambia mobile money```
This describes how to collect payments via  Zambia  mobile money.

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
  status: 'success',
  message: 'Charge initiated',
  meta: {
            authorization: {
            redirect: 'https://checkout.flutterwave.com/captcha/verify/1287327:4880b0705d15b949b84e056d7cf8b1dd',
            mode: 'redirect'
        }
    }
}
```
