<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# TRANSFERS

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

Make Transfers (Payouts) via any of these methods:
1. [Initiate a transfer](#create-a-transfer)
2. [Create Bulk transfers](#create-bulk-transfer)
3. [Fetch a transfer](#get-a-transfer)
4. [Fetch multiple transfers](#get-all-transfers)
5. [Wallet to Wallet transfer](#wallet-to-wallet-transfer)
6. [Get transfer fee](#get-transfer-fee)


## Create a transfer
This describes how to initiate a transfer

For more info about the payload parameteres definition, check  [here](https://developer.flutterwave.com/reference#create-a-transfer)

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const initTrans = async () => {

    try {
        const payload = {
        "account_bank": "044", //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
        "account_number": "0690000040",
        "amount": 5500,
        "narration": "Akhlm Pstmn Trnsfr xx007",
        "currency": "NGN",
        "reference": "akhlm-pstmnpyt-r02ens007_PMCKDU_1", //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
        "callback_url": "https://www.flutterwave.com/ng/",
        "debit_currency": "NGN"
    }

        const response = await flw.Transfer.initiate(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


initTrans();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Transfer Queued Successfully",
   "data": {
      "id": 396432,
      "account_number": "0690000040",
      "bank_code": "044",
      "full_name": "Alexis Sanchez",
      "created_at": "2023-03-11T01:14:21.000Z",
      "currency": "NGN",
      "debit_currency": "NGN",
      "amount": 5500,
      "fee": 26.875,
      "status": "NEW",
      "reference": "akhlm-pstmnpyt-rfxxgjlsioens007_PMCKDU_1",
      "meta": null,
      "narration": "Akhlm Pstmn Trnsfr xx007",
      "complete_message": "",
      "requires_approval": 0,
      "is_approved": 1,
      "bank_name": "ACCESS BANK NIGERIA"
   }
}
```

## Create bulk transfer
This describes how to initiate a bulk transfer

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const initBulk = async () => {

    try {
        const payload = {
            "title": "Staff salary",
            "bulk_data": [
                {
                    "bank_code": "044",
                    "account_number": "0690000032",
                    "amount": 100,
                    "currency": "NGN",
                    "narration": "akhlm blktrnsfr",
                    "reference": "fhsfhsds"
                },
                {
                    "bank_code": "044",
                    "account_number": "0690000034",
                    "amount": 50,
                    "currency": "NGN",
                    "narration": "akhlm blktrnsfr",
                    "reference": "akhlmfhsfhsds"
                }
            ]
        }

        const response = await flw.Transfer.bulk(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


initBulk();
```

Sample Response

```javascript
{
    "status": "success",
    "message": "Bulk transfer queued",
    "data": {
        "id": 14298,
        "created_at": "2023-08-09T23:57:05.000Z",
        "approver": "N/A"
    }
}
```

## Get transfer fee
This describes how to get applicable transfer fee

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const getFee = async () => {

    try {
        const payload = {
            "amount": "12500",
            "currency": "NGN"
        }

        const response = await flw.Transfer.fee(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getFee();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Transfer fee fetched",
   "data": [
      {
         "currency": "NGN",
         "fee_type": "value",
         "fee": 26.875
      }
   ]
}
```

## Get all transfers
This describes how to fetch all transfers on your account

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const getAllTrans = async () => {

    try {
        const payload = {
            "status":"failed"
        }

        const response = await flw.Transfer.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getAllTrans();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Transfers fetched",
   "meta": {
      "page_info": {
         "total": 47,
         "current_page": 1,
         "total_pages": 5
      }
   },
   "data": [
      {
         "id": 403318,
         "account_number": "256782033409",
         "bank_code": "MPS",
         "full_name": "N/A",
         "created_at": "2023-05-22T16:34:49.000Z",
         "currency": "UGX",
         "debit_currency": null,
         "amount": 20,
         "fee": 500,
         "status": "FAILED",
         "reference": "6b76aa8f93bd765c",
         "meta": [
            {
               "mobile_number": "08109328188"
            }
         ],
         "narration": "Mobile money payout",
         "approver": null,
         "complete_message": "beneficiary_name is required",
         "requires_approval": 0,
         "is_approved": 1,
         "bank_name": "N/A"
      },
      {
         "id": 403317,
         "account_number": "256782033409",
         "bank_code": "MPS",
         "full_name": "N/A",
         "created_at": "2023-05-22T16:33:13.000Z",
         "currency": "UGX",
         "debit_currency": null,
         "amount": 20,
         "fee": 500,
         "status": "FAILED",
         "reference": "6b3269daa45fa640",
         "meta": [
            {
               "mobile_number": "08109328188"
            }
         ],
         "narration": "Mobile money payout",
         "approver": null,
         "complete_message": "beneficiary_name is required",
         "requires_approval": 0,
         "is_approved": 1,
         "bank_name": "N/A"
      },
      {
         "id": 403047,
         "account_number": "1295124",
         "bank_code": "wallet",
         "full_name": "Michael Onyeforo Jnr",
         "created_at": "2023-05-19T12:56:13.000Z",
         "currency": "EUR",
         "debit_currency": "EUR",
         "amount": 1000,
         "fee": 0,
         "status": "FAILED",
         "reference": "TRF-555600071008",
         "meta": {
            "AccountId": 37782,
            "merchant_id": "5758113"
         },
         "narration": null,
         "approver": null,
         "complete_message": "DISBURSE FAILED: You can only spend EUR 100.00 at once",
         "requires_approval": 0,
         "is_approved": 1,
         "bank_name": "wallet"
      },
      {
         "id": 401090,
         "account_number": "28581375",
         "bank_code": "wallet",
         "full_name": "Trulipay technologies ",
         "created_at": "2023-04-26T22:30:12.000Z",
         "currency": "UGX",
         "debit_currency": "UGX",
         "amount": 1000,
         "fee": 0,
         "status": "FAILED",
         "reference": "TRF-282263183180",
         "meta": {
            "AccountId": 1758777,
            "merchant_id": "100756902"
         },
         "narration": null,
         "approver": null,
         "complete_message": "DISBURSE FAILED: You can only spend UGX 100.00 at once",
         "requires_approval": 0,
         "is_approved": 1,
         "bank_name": "wallet"
      },
      {
         "id": 401083,
         "account_number": "28581369",
         "bank_code": "wallet",
         "full_name": "Trulipay technologies ",
         "created_at": "2023-04-26T22:10:27.000Z",
         "currency": "GHS",
         "debit_currency": "GHS",
         "amount": 20000,
         "fee": 0,
         "status": "FAILED",
         "reference": "TRF-546614104664",
         "meta": {
            "AccountId": 1758777,
            "merchant_id": "100756902"
         },
         "narration": null,
         "approver": null,
         "complete_message": "DISBURSE FAILED: You can only spend GHS 1000.00 at once",
         "requires_approval": 0,
         "is_approved": 1,
         "bank_name": "wallet"
      },
      {
         "id": 398682,
         "account_number": "32000713",
         "bank_code": "wallet",
         "full_name": "Olivier Staff",
         "created_at": "2023-03-31T11:52:06.000Z",
         "currency": "XAF",
         "debit_currency": "XAF",
         "amount": 1000000,
         "fee": 0,
         "status": "FAILED",
         "reference": "TRF-180822210828",
         "meta": {
            "AccountId": 1895433,
            "merchant_id": "100872524"
         },
         "narration": null,
         "approver": null,
         "complete_message": "DISBURSE FAILED: A fatal error occured while proccesing your request.",
         "requires_approval": 0,
         "is_approved": 1,
         "bank_name": "wallet"
      },
      {
         "id": 396933,
         "account_number": "0690000032",
         "bank_code": "044",
         "full_name": "Pastor Bright",
         "created_at": "2023-03-15T17:22:57.000Z",
         "currency": "NGN",
         "debit_currency": "NGN",
         "amount": 1222,
         "fee": 10.75,
         "status": "FAILED",
         "reference": "17f18932-5ee8-4c48-a435-3194e2836d0o",
         "meta": {
            "iWithdrawId": 346,
            "iUserId": "63e1f7f0d4cba4854b5fec1b"
         },
         "narration": "Kudi Fantasy Withdraw",
         "approver": null,
         "complete_message": "DISBURSE FAILED: You can only spend XAF 100000000.00 at once",
         "requires_approval": 0,
         "is_approved": 1,
         "bank_name": "ACCESS BANK NIGERIA"
      },
      {
         "id": 396456,
         "account_number": "FOREIGN-ACCOUNT",
         "bank_code": "FOREIGN-BANK",
         "full_name": "N/A",
         "created_at": "2023-03-11T18:16:55.000Z",
         "currency": "EUR",
         "debit_currency": null,
         "amount": 50,
         "fee": 35,
         "status": "FAILED",
         "reference": "new-intl-eu-test-transferlmworj0970450",
         "meta": [
            {
               "account_number": "FOREIGN-ACCOUNT",
               "routing_number": "FOREIGN-BANK",
               "sender": "Flutterwave Developers",
               "mobile_number": "23480000000000"
            }
         ],
         "narration": "Test EU Int'l bank transfers",
         "approver": null,
         "complete_message": "beneficiary_name is required",
         "requires_approval": 0,
         "is_approved": 1,
         "bank_name": "N/A"
      },
      {
         "id": 396435,
         "account_number": "2540700000000",
         "bank_code": "MPS",
         "full_name": "Flutterwave Developers",
         "created_at": "2023-03-11T01:14:35.000Z",
         "currency": "KES",
         "debit_currency": "NGN",
         "amount": 50,
         "fee": 45,
         "status": "FAILED",
         "reference": "mk-902837-jk555",
         "meta": [
            {
               "sender": "Obembe Mark",
               "mobile_number": "12313131231231"
            }
         ],
         "narration": "New transfer",
         "approver": null,
         "complete_message": "DISBURSE FAILED: Unable to obtain user details",
         "requires_approval": 0,
         "is_approved": 1,
         "bank_name": "FA-BANK"
      },
      {
         "id": 395470,
         "account_number": "0690000031",
         "bank_code": "044",
         "full_name": "Forrest Green",
         "created_at": "2023-02-27T21:02:45.000Z",
         "currency": "NGN",
         "debit_currency": null,
         "amount": 100,
         "fee": 10.75,
         "status": "FAILED",
         "reference": "mk-6u54i-jp",
         "meta": null,
         "narration": null,
         "approver": null,
         "complete_message": "DISBURSE FAILED: wallet currently restricted. please contact administrator",
         "requires_approval": 0,
         "is_approved": 1,
         "bank_name": "ACCESS BANK NIGERIA"
      }
   ]
}
```

## Get a transfer
This describes how to fetch a single transfer on your account

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const getATransfer = async () => {

    try {
        const payload = {
            "id":"396456" // This is the numeric ID of the transfer you want to fetch. It is returned in the call to create a transfer as data.id
        }

        const response = await flw.Transfer.get_a_transfer(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getATransfer();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Transfer fee fetched",
   "data": [
      {
         "currency": "NGN",
         "fee_type": "value",
         "fee": 26.875
      }
   ]
}
```


## Wallet to Wallet Transfer
This will show you how to initiate a transfer from one Flutterwave wallet to another

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const walletToWallet = async () => {

    try {
        const payload = {
            "account_bank": "flutterwave", // This should always be set to flutterwave
            "account_number": "99992069", //This is the recipient merchant ID
            "amount": 500, //This is the amount to transfer to the recipient
            "narration": "payment for x service provided",
            "currency": "NGN", //This can be NGN, GHS, KES, UGX, TZS, USD
            "reference": "wallet-transfer998", //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
            "debit_currency": "NGN" //You can pass this when you want to debit a currency balance and send money in another currency.
        }

        const response = await flw.Transfer.wallet_to_wallet(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


walletToWallet();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Transfer Queued Successfully",
   "data": {
      "id": 128286,
      "account_number": 99992069,
      "bank_code": "flutterwave",
      "full_name": "FLUTTERWAVE V3 DOCS",
      "created_at": "2020-06-29T21:35:15.000Z",
      "currency": "NGN",
      "debit_currency": "NGN",
      "amount": 500,
      "fee": 0,
      "status": "NEW",
      "reference": "wallet-transfer",
      "meta": {
         "wallet_email": "hip@cool.com",
         "AccountId": 118468,
         "merchant_id": "00118468"
      },
      "narration": "payment for x service provided",
      "complete_message": "",
      "requires_approval": 0,
      "is_approved": 1,
      "bank_name": "wallet"
   }
}
```