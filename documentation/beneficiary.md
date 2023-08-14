<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# BENEFICIARIES

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

Manage transfer beneficiaries via any of these methods:
1. [Create a Beneficiary](#create-a-beneficiary)
2. [Delete a Beneficiary](#delete-a-beneficiary)
3. [Fetch a Beneficiary](#fetch-a-beneficiary)
4. [Fetch all Beneficiaries](#list-all-beneficiaries)


## Create a beneficiary

This describes how to create a transfer beneficiary

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const createBeneficiary = async () => {

    try {
        const payload = {
            "account_number": "0690000034",
            "account_bank":"044" // This is the beneficiary’s bank code, you can use the List of Banks to retrieve a bank code.
            "beneficiary_name": 'Ade Bond'
        }
        const response = await flw.Beneficiary.create(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createBeneficiary();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Banks fetched successfully",
   "data": {
      "id": 3644,
      "account_number": "0690000034",
      "bank_code": "044",
      "full_name": "Ade Bond",
      "created_at": "2020-01-16T18:01:28.000Z",
      "bank_name": "ACCESS BANK NIGERIA"
   }
}
```

## List all beneficiaries

This describes how to get all beneficiaries

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const fetchAllBeneficiary = async () => {

    try {
       
        const response = await flw.Beneficiary.fetch_all()
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchAllBeneficiary();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Payout beneficiaries fetched",
   "meta": {
      "page_info": {
         "total": 9,
         "current_page": 1,
         "total_pages": 1
      }
   },
   "data": [
      {
         "id": 3768,
         "account_number": "0690000040",
         "bank_code": "044",
         "full_name": "Alexis Sanchez",
         "meta": null,
         "created_at": "2020-01-20T16:09:24.000Z",
         "bank_name": "ACCESS BANK NIGERIA"
      },
      {
         "id": 3690,
         "account_number": "0690000039",
         "bank_code": "044",
         "full_name": "Dotun Ajib",
         "meta": null,
         "created_at": "2020-01-19T22:36:06.000Z",
         "bank_name": "ACCESS BANK NIGERIA"
      },
      {
         "id": 3644,
         "account_number": "0690000034",
         "bank_code": "044",
         "full_name": "Ade Bond",
         "meta": null,
         "created_at": "2020-01-16T18:01:28.000Z",
         "bank_name": "ACCESS BANK NIGERIA"
      },
      {
         "id": 3608,
         "account_number": "0690000044",
         "bank_code": "044",
         "full_name": "Mercedes Daniel",
         "meta": null,
         "created_at": "2020-01-15T11:58:02.000Z",
         "bank_name": "ACCESS BANK NIGERIA"
      },
      {
         "id": 3565,
         "account_number": "0690000038",
         "bank_code": "044",
         "full_name": "John Sunday",
         "meta": null,
         "created_at": "2020-01-14T05:53:34.000Z",
         "bank_name": "ACCESS BANK NIGERIA"
      },
      {
         "id": 3104,
         "account_number": "2540782773934",
         "bank_code": "000",
         "full_name": "Kwame Adew",
         "meta": null,
         "created_at": "2019-12-05T23:49:31.000Z",
         "bank_name": "FA-BANK"
      },
      {
         "id": 3093,
         "account_number": "0690000041",
         "bank_code": "044",
         "full_name": "Alexis Rogers",
         "meta": null,
         "created_at": "2019-12-05T21:29:57.000Z",
         "bank_name": "ACCESS BANK NIGERIA"
      },
      {
         "id": 2923,
         "account_number": "0690000032",
         "bank_code": "044",
         "full_name": "Pastor Bright",
         "meta": null,
         "created_at": "2019-11-28T08:15:29.000Z",
         "bank_name": "ACCESS BANK NIGERIA"
      },
      {
         "id": 2857,
         "account_number": "0690000031",
         "bank_code": "044",
         "full_name": "Forrest Green",
         "meta": null,
         "created_at": "2019-11-20T10:33:20.000Z",
         "bank_name": "ACCESS BANK NIGERIA"
      }
   ]
}
```


## Fetch a beneficiary

This describes how to get a single transfer beneficiary details

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const fetchBeneficiary = async () => {

    try {
        const payload = {
            
            "id":"2923" //This is the unique identifier for the beneficiary you intend to fetch. It is returned in the call to create a beneficiary as data.id
            
        }
        const response = await flw.Beneficiary.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchBeneficiary();
```

Sample Response

```javascript
{
   "status": "success",
   "message": "Payout beneficiary fetched",
   "data": {
      "id": 2923,
      "account_number": "0690000032",
      "bank_code": "044",
      "full_name": "Pastor Bright",
      "meta": null,
      "created_at": "2019-11-28T08:15:29.000Z",
      "bank_name": "ACCESS BANK NIGERIA"
   }
}
```

## Delete a beneficiary

This describes how to delete a transfer beneficiary


```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const delBeneficiary = async () => {

    try {
        const payload = {
            
            "id":"4150" //This is the unique identifier for the beneficiary you intend to fetch. It is returned in the call to create a beneficiary as data.id
            
        }
        const response = await flw.Beneficiary.delete(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


delBeneficiary();
```

Sample Response

```javascript
{
  "status": "success",
  "message": "Beneficiary deleted",
  "data": "Deleted"
}
```

