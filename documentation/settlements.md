<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# SETTLEMENTS

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

Manage Settlements via any of these methods:
1. [Get all Settlements](#get-all-settlements)
2. [Get a Settlement](#get-a-settlement)

## Get all settlements

This describes how to fetch all settlements

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const fetchSettlements = async () => {

    try {
        const payload = {
            "page": "1"
        }
       
        const response = await flw.Settlement.fetch_all()
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchSettlements();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Settlements fetched",
   "meta": {
      "page_info": {
         "total": 6,
         "current_page": 1,
         "total_pages": 1,
         "page_size": 20
      }
   },
   "data": [
      {
         "id": 41748,
         "account_id": 73362,
         "merchant_name": "Earth Gang",
         "merchant_email": "selma.m0ckaham@flutterwavego.com",
         "settlement_account": "0031318432",
         "bank_code": "063",
         "transaction_date": "2020-01-01T04:00:00.000Z",
         "due_date": "2020-01-01T04:00:00.000Z",
         "processed_date": null,
         "status": "completed",
         "is_local": true,
         "currency": "NGN",
         "gross_amount": 122000,
         "app_fee": 2108,
         "merchant_fee": 0,
         "chargeback": 0,
         "refund": 0,
         "stampduty_charge": 0,
         "net_amount": 119892,
         "transaction_count": 8,
         "processor_ref": null,
         "disburse_ref": "INSTANT_SETTLEMENT",
         "disburse_message": null,
         "channel": "web",
         "destination": "autowallet",
         "fx_data": null,
         "flag_message": null,
         "meta": [
            908260,
            908790,
            908232,
            908274,
            909038,
            908246,
            908290,
            908216
         ],
         "refund_meta": null,
         "chargeback_meta": null,
         "source_bankcode": null,
         "created_at": "2020-01-02T01:30:00.000Z"
      },
      {
         "id": 41642,
         "account_id": 73362,
         "merchant_name": "Earth Gang",
         "merchant_email": "selma.m0ckaham@flutterwavego.com",
         "settlement_account": "0031318432",
         "bank_code": "063",
         "transaction_date": "2019-12-31T04:00:00.000Z",
         "due_date": "2019-12-31T04:00:00.000Z",
         "processed_date": null,
         "status": "completed",
         "is_local": true,
         "currency": "NGN",
         "gross_amount": 24000,
         "app_fee": 936,
         "merchant_fee": 0,
         "chargeback": 0,
         "refund": 0,
         "stampduty_charge": 0,
         "net_amount": 23064,
         "transaction_count": 12,
         "processor_ref": null,
         "disburse_ref": "INSTANT_SETTLEMENT",
         "disburse_message": null,
         "channel": "web",
         "destination": "autowallet",
         "fx_data": null,
         "flag_message": null,
         "meta": [
            908041,
            908197,
            908082,
            908015,
            908111,
            908053,
            908087,
            908034,
            908174,
            908067,
            907967,
            908103
         ],
         "refund_meta": null,
         "chargeback_meta": null,
         "source_bankcode": null,
         "created_at": "2020-01-01T01:30:00.000Z"
      },
      {
         "id": 41497,
         "account_id": 73362,
         "merchant_name": "Earth Gang",
         "merchant_email": "selma.m0ckaham@flutterwavego.com",
         "settlement_account": "0031318432",
         "bank_code": "063",
         "transaction_date": "2019-12-30T04:00:00.000Z",
         "due_date": "2019-12-30T04:00:00.000Z",
         "processed_date": null,
         "status": "completed",
         "is_local": true,
         "currency": "NGN",
         "gross_amount": 50800,
         "app_fee": 950,
         "merchant_fee": 0,
         "chargeback": 0,
         "refund": 0,
         "stampduty_charge": 0,
         "net_amount": 49850,
         "transaction_count": 5,
         "processor_ref": null,
         "disburse_ref": "RV3E18675549F6A0",
         "disburse_message": null,
         "channel": "web",
         "destination": "autowallet",
         "fx_data": null,
         "flag_message": null,
         "meta": [
            906256,
            906358,
            906301,
            906362,
            906319
         ],
         "refund_meta": null,
         "chargeback_meta": null,
         "source_bankcode": null,
         "created_at": "2019-12-31T01:30:00.000Z"
      },
      {
         "id": 41440,
         "account_id": 73362,
         "merchant_name": "Earth Gang",
         "merchant_email": "selma.m0ckaham@flutterwavego.com",
         "settlement_account": "0031318432",
         "bank_code": "063",
         "transaction_date": "2019-12-30T01:00:00.000Z",
         "due_date": "2019-12-31T00:00:00.000Z",
         "processed_date": null,
         "status": "pending",
         "is_local": true,
         "currency": "NGN",
         "gross_amount": 30620,
         "app_fee": 620,
         "merchant_fee": 0,
         "chargeback": 0,
         "refund": 20114,
         "stampduty_charge": 0,
         "net_amount": 9886,
         "transaction_count": 3,
         "processor_ref": null,
         "disburse_ref": null,
         "disburse_message": null,
         "channel": "web",
         "destination": "account",
         "fx_data": null,
         "flag_message": null,
         "meta": [
            906262,
            906336,
            906339
         ],
         "refund_meta": [
            4169,
            4848,
            4852,
            4855,
            4868,
            4869,
            4870,
            4989
         ],
         "chargeback_meta": [],
         "source_bankcode": null,
         "created_at": "2019-12-31T01:00:01.000Z"
      },
      {
         "id": 40018,
         "account_id": 73362,
         "merchant_name": "Earth Gang",
         "merchant_email": "selma.m0ckaham@flutterwavego.com",
         "settlement_account": "0031318432",
         "bank_code": "063",
         "transaction_date": "2019-11-28T00:00:00.000Z",
         "due_date": "2019-11-29T00:00:00.000Z",
         "processed_date": null,
         "status": "pending",
         "is_local": true,
         "currency": "NGN",
         "gross_amount": 9000,
         "app_fee": 176,
         "merchant_fee": 0,
         "chargeback": 0,
         "refund": 0,
         "stampduty_charge": 0,
         "net_amount": 8824,
         "transaction_count": 1,
         "processor_ref": null,
         "disburse_ref": null,
         "disburse_message": null,
         "channel": "web",
         "destination": "account",
         "fx_data": null,
         "flag_message": null,
         "meta": [
            854542
         ],
         "refund_meta": [],
         "chargeback_meta": [],
         "source_bankcode": null,
         "created_at": "2019-11-29T11:50:38.000Z"
      },
      {
         "id": 38813,
         "account_id": 73362,
         "merchant_name": "Earth Gang",
         "merchant_email": "selma.m0ckaham@flutterwavego.com",
         "settlement_account": "0031318432",
         "bank_code": "063",
         "transaction_date": "2019-10-10T01:00:00.000Z",
         "due_date": "2019-10-11T19:12:49.000Z",
         "processed_date": null,
         "status": "pending",
         "is_local": true,
         "currency": "NGN",
         "gross_amount": 2826.96,
         "app_fee": 2508.96,
         "merchant_fee": 0,
         "chargeback": 0,
         "refund": 0,
         "stampduty_charge": 0,
         "net_amount": 318,
         "transaction_count": 2,
         "processor_ref": null,
         "disburse_ref": null,
         "disburse_message": null,
         "channel": null,
         "destination": "account",
         "fx_data": null,
         "flag_message": null,
         "meta": null,
         "refund_meta": [],
         "chargeback_meta": null,
         "source_bankcode": null,
         "created_at": "2019-10-11T01:00:01.000Z"
      }
   ]
}
```


### Get a settlement

This describes how to fetch and search all your settlements

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const fetchSettlement = async () => {

    try {
        const payload = {
            
            "id":"41497" ,//This is a unique identifier for the particular settlement you want to fetch.
            "from":"2019-01-01",
            "to":"2020-05-22"
        }
        const response = await flw.Settlement.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchSettlement();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Settlement fetched",
  "data": {
    "id": 41497,
    "account_id": 73362,
    "merchant_name": "Earth Gang",
    "merchant_email": "selma.m0ckaham@flutterwavego.com",
    "settlement_account": "0031318432",
    "bank_code": "063",
    "transaction_date": "2019-12-30T04:00:00.000Z",
    "due_date": "2019-12-30T04:00:00.000Z",
    "processed_date": null,
    "status": "completed",
    "is_local": 1,
    "currency": "NGN",
    "gross_amount": 50800,
    "app_fee": 950,
    "merchant_fee": 0,
    "chargeback": 0,
    "refund": 0,
    "stampduty_charge": 0,
    "net_amount": 49850,
    "transaction_count": 5,
    "processor_ref": null,
    "disburse_ref": "RV3E18675549F6A0",
    "disburse_message": null,
    "channel": "web",
    "destination": "autowallet",
    "fx_data": null,
    "flag_message": null,
    "meta": "[906256,906358,906301,906362,906319]",
    "refund_meta": null,
    "chargeback_meta": null,
    "source_bankcode": null,
    "created_at": "2019-12-31T01:30:00.000Z",
    "transactions": [
      {
        "customer_email": "h0vkard@flw.ext",
        "flw_ref": "FLW-MOCK-RECURR-42b3daee9f470127dacd19560533f3a6",
        "tx_ref": "Rave-Pages017117571060",
        "id": 984411,
        "charged_amount": 10140,
        "app_fee": 190,
        "merchant_fee": 0,
        "stampduty_charge": 0,
        "settlement_amount": 9950,
        "status": "successful",
        "payment_entity": "card",
        "transaction_date": "2019-12-30",
        "currency": "NGN",
        "card_locale": "LOCAL",
        "rrn": "N/A",
        "subaccount_settlement": 0
      },
      {
        "customer_email": "h0vkard@flw.ext",
        "flw_ref": "FLW-MOCK-RECURR-c536481525f02f76409892f517a16300",
        "tx_ref": "Rave-Pages017117571060",
        "id": 984456,
        "charged_amount": 10140,
        "app_fee": 190,
        "merchant_fee": 0,
        "stampduty_charge": 0,
        "settlement_amount": 9950,
        "status": "successful",
        "payment_entity": "card",
        "transaction_date": "2019-12-30",
        "currency": "NGN",
        "card_locale": "LOCAL",
        "rrn": "N/A",
        "subaccount_settlement": 0
      },
      {
        "customer_email": "h0vkard@flw.ext",
        "flw_ref": "FLW-MOCK-RECURR-d22d0ec0955047e9648bec46da40c987",
        "tx_ref": "Rave-Pages017117571060",
        "id": 984474,
        "charged_amount": 10190,
        "app_fee": 190,
        "merchant_fee": 0,
        "stampduty_charge": 0,
        "settlement_amount": 10000,
        "status": "successful",
        "payment_entity": "card",
        "transaction_date": "2019-12-30",
        "currency": "NGN",
        "card_locale": "LOCAL",
        "rrn": "N/A",
        "subaccount_settlement": 0
      },
      {
        "customer_email": "h0vkard@flw.ext",
        "flw_ref": "FLW-MOCK-RECURR-e55f863f14a95816e0939e7c4625ee43",
        "tx_ref": "Rave-Pages017117571060",
        "id": 984513,
        "charged_amount": 10190,
        "app_fee": 190,
        "merchant_fee": 0,
        "stampduty_charge": 0,
        "settlement_amount": 10000,
        "status": "successful",
        "payment_entity": "card",
        "transaction_date": "2019-12-30",
        "currency": "NGN",
        "card_locale": "LOCAL",
        "rrn": "N/A",
        "subaccount_settlement": 0
      },
      {
        "customer_email": "h0vkard@flw.ext",
        "flw_ref": "FLW-MOCK-RECURR-6100e5300876cef2270b2e31bc9cc16e",
        "tx_ref": "Rave-Pages017117571060",
        "id": 984517,
        "charged_amount": 10140,
        "app_fee": 190,
        "merchant_fee": 0,
        "stampduty_charge": 0,
        "settlement_amount": 9950,
        "status": "successful",
        "payment_entity": "card",
        "transaction_date": "2019-12-30",
        "currency": "NGN",
        "card_locale": "LOCAL",
        "rrn": "N/A",
        "subaccount_settlement": 0
      }
    ]
  }
}
```
