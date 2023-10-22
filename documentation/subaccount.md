<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# SUBACCOUNTS (COLLECTION)

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

Manage Collection Subaccounts via any of these methods:
1. [Create a Subaccount](#create-a-subaccount)
2. [Fetch a Subaccount](#fetch-a-subaccount)
3. [Fetch all Subaccounts](#fetch-all-subaccounts)
4. [Update a Subaccount](#update-a-subaccount)
5. [Delete a Subaccount](#delete-a-subaccount)


## Create a subaccount

This describes how to create a subaccount on Flutterwave

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const createSubaccount = async () => {
  try {
    const payload = {
      account_bank: '044',
      account_number: '0690000037',
      business_name: 'Eternal Blue',
      business_email: 'petya@stux.net',
      business_contact: 'Anonymous',
      business_contact_mobile: '090890382',
      business_mobile: '09087930450',
      country: 'NG',
      meta: [
        {
          meta_name: 'mem_adr',
          meta_value: '0x16241F327213',
        },
      ],
      split_type: 'percentage',
      split_value: 0.5,
    };

    const response = await flw.Subaccount.create(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

createSubaccount();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Subaccount created",
  "data": {
    "id": 2181,
    "account_number": "0690000037",
    "account_bank": "044",
    "full_name": "Eternal Blue",
    "created_at": "2020-05-31T00:40:15.000Z",
    "split_type": "percentage",
    "split_value": 0.5,
    "subaccount_id": "RS_235E8F4E92A4048B57EA29B0E1B8F78B",
    "bank_name": "ACCESS BANK NIGERIA"
  }
}
```

## Fetch all subaccounts

This describes how to get all subaccounts

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const fetchAllSubaccounts = async () => {
  try {
    const response = await flw.Subaccount.fetch_all();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

fetchAllSubaccounts();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Subaccounts fetched",
  "meta": {
    "page_info": {
      "total": 8,
      "current_page": 1,
      "total_pages": 1
    }
  },
  "data": [
    {
      "id": 2181,
      "account_number": "0690000037",
      "account_bank": "044",
      "business_name": "Eternal Blue",
      "full_name": "Ibra Mili",
      "created_at": "2020-01-20T06:47:56.000Z",
      "meta": [
        {
          "meta_name": "mem_adr",
          "meta_value": "0x16241F327213"
        }
      ],
      "account_id": 88747,
      "split_ratio": 1,
      "split_type": "percentage",
      "split_value": 0.5,
      "subaccount_id": "RS_9BD2ACE480785E759A16FDE1874A6657",
      "bank_name": "ACCESS BANK NIGERIA",
      "country": "NG"
    },
    {
      "id": 2180,
      "account_number": "0690000035",
      "account_bank": "044",
      "business_name": "Eternal Blue",
      "full_name": "Peter Crouch",
      "created_at": "2020-01-20T06:44:58.000Z",
      "meta": [
        {
          "meta_name": "mem_adr",
          "meta_value": "0x16241F327213"
        }
      ],
      "account_id": 88746,
      "split_ratio": 1,
      "split_type": "flat",
      "split_value": 0,
      "subaccount_id": "RS_5096825149E9FDDC65864F79B815AB45",
      "bank_name": "ACCESS BANK NIGERIA",
      "country": "NG"
    },
    {
      "id": 2164,
      "account_number": "0690000043",
      "account_bank": "044",
      "business_name": "JK Services",
      "full_name": "Roberta Weber",
      "created_at": "2020-01-17T16:25:36.000Z",
      "meta": [
        {}
      ],
      "account_id": 88496,
      "split_ratio": 1,
      "split_type": "flat",
      "split_value": 0,
      "subaccount_id": "RS_A560B61FF493A3720913B0487030D2A5",
      "bank_name": "ACCESS BANK NIGERIA",
      "country": "NG"
    },
    {
      "id": 2063,
      "account_number": "0690000039",
      "account_bank": "044",
      "business_name": "Sharp Guy",
      "full_name": "Dotun Ajib",
      "created_at": "2020-01-02T21:54:35.000Z",
      "meta": [
        {
          "swift_code": ""
        }
      ],
      "account_id": 86548,
      "split_ratio": 1,
      "split_type": "percentage",
      "split_value": 0.6,
      "subaccount_id": "RS_2A9D2F79274AD40924983F5BA6975336",
      "bank_name": "ACCESS BANK NIGERIA",
      "country": "NG"
    },
    {
      "id": 1962,
      "account_number": "0690000042",
      "account_bank": "044",
      "business_name": "Sam Son",
      "full_name": "Forrest Terry",
      "created_at": "2019-12-09T13:27:04.000Z",
      "meta": [
        {
          "swift_code": ""
        }
      ],
      "account_id": 84353,
      "split_ratio": 1,
      "split_type": "percentage",
      "split_value": 0.02,
      "subaccount_id": "RS_008F29575D91B6E80BB31F5B374CBF4E",
      "bank_name": "ACCESS BANK NIGERIA",
      "country": "NG"
    },
    {
      "id": 1961,
      "account_number": "0690000033",
      "account_bank": "044",
      "business_name": "Zen Daya",
      "full_name": "Bale Gary",
      "created_at": "2019-12-09T13:19:41.000Z",
      "meta": [
        {
          "swift_code": ""
        }
      ],
      "account_id": 84351,
      "split_ratio": 1,
      "split_type": "percentage",
      "split_value": 0.05,
      "subaccount_id": "RS_DE6A6DDCB8C0708D7D39B7DFEC0AC8B7",
      "bank_name": "ACCESS BANK NIGERIA",
      "country": "NG"
    },
    {
      "id": 1960,
      "account_number": "0690000031",
      "account_bank": "044",
      "business_name": "Zen Daya",
      "full_name": "Forrest Green",
      "created_at": "2019-12-09T13:18:14.000Z",
      "meta": [
        {
          "swift_code": ""
        }
      ],
      "account_id": 84349,
      "split_ratio": 1,
      "split_type": "percentage",
      "split_value": 0.05,
      "subaccount_id": "RS_7F017022CF4E8A7F0BD5BBD86BD442B0",
      "bank_name": "ACCESS BANK NIGERIA",
      "country": "NG"
    },
    {
      "id": 1663,
      "account_number": "0690000032",
      "account_bank": "044",
      "business_name": "Monkey Tail",
      "full_name": "Pastor Bright",
      "created_at": "2019-09-25T13:44:23.000Z",
      "meta": [
        {
          "swift_code": ""
        }
      ],
      "account_id": 75465,
      "split_ratio": 1,
      "split_type": "flat",
      "split_value": 100,
      "subaccount_id": "RS_19D8078A8CB10757BA7ACA8FB695D17C",
      "bank_name": "ACCESS BANK NIGERIA",
      "country": "NG"
    }
  ]
}
```

## Fetch a subaccount

This describes how to fetch a subaccount using the sub-account's ID

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const fetchSubaccount = async () => {
  try {
    const payload = {
      id: '2181',
    };

    const response = await flw.Subaccount.fetch(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

fetchSubaccount();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Subaccount fetched",
  "data": {
    "id": 2181,
    "account_number": "0690000037",
    "account_bank": "044",
    "business_name": "Eternal Blue",
    "full_name": "RITA BLUE",
    "created_at": "2020-05-31T00:40:15.000Z",
    "meta": null,
    "account_id": 133581,
    "split_ratio": 1,
    "split_type": "percentage",
    "split_value": 0.5,
    "subaccount_id": "RS_235E8F4E92A4048B57EA29B0E1B8F78B",
    "bank_name": "ACCESS BANK NIGERIA",
    "country": "NG"
  }
}
```

## Update a subaccount

This describes how to update a subaccount

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const updateSubaccount = async () => {
  try {
    const payload = {
        "id": '2181', //This is the unique id of the subaccount you want to update. It is returned in the call to create a subaccount as data.id
        "business_name": "Luxe collectibles",
        "business_email": "mad@o.enterprises",
        "account_bank": "044",
        "account_number": "0690000040",
        "split_type": "flat",
        "split_value": "200"
    };

    const response = await flw.Subaccount.update(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

updateSubaccount();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Subaccount edited",
  "data": {
    "id": 2181,
    "account_number": "0690000040",
    "account_bank": "044",
    "business_name": "Luxe collectibles",
    "full_name": "RITA BLUE",
    "created_at": "2020-01-17T16:28:26.000Z",
    "meta": [
      {
        "meta_name": "MarketplaceID",
        "meta_value": "ggs-920900"
      }
    ],
    "account_id": 133581,
    "split_ratio": 1,
    "split_type": "flat",
    "split_value": "1000",
    "subaccount_id": "RS_884E7E4BD793ADA77F491CF4AD3DE19E",
    "bank_name": "ACCESS BANK NIGERIA",
    "country": "NG"
  }
}
```

## Delete a subaccount

This describes how to delete a subaccount

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const updateSubaccount = async () => {
  try {
    const payload = {
      id: '2181', //This is the unique id of the subaccount you want to update. It is returned in the call to create a subaccount as data.id
    };

    const response = await flw.Subaccount.delete(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

updateSubaccount();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Subaccount deleted",
  "data": null
}
```