<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# Collections

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

Collect payments from your users via any of these methods:
1. [Cards](#card-collections)
2. Bank transfers
3. [Direct debit (Nigerian bank accounts)](#direct-debit-nigerian-bank-account)
4. Direct debit (UK bank accounts)
5. ACH payments
6. Mpesa
7. Ghana Mobile Money
8. Uganda Mobile Money
9. Rwanda Mobile Money
10. Zambia Mobile Money
11. Francophone Mobile Money (for Senegal, Cote D'Ivoire, Mali and Cameroon).
12. USSD

There are three steps involved in collecting payments from your users:

- Initating the transaction.
- Authorizing the transaction.
- Verifying the transaction.

Read more about the steps [here](https://developer.flutterwave.com/docs/direct-charge/overview)


## Card Collections

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

> Kindly note that `enckey` is your encryption key. You can get this from your API setting in the dashboard.

Check [this](https://developer.flutterwave.com/docs/direct-charge/card) out to learn more about charging cards.


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