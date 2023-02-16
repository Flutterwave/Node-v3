<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# BENEFICIARIES

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.



### Create a beneficiary

This describes how to create a transfer beneficiary

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const createBeneficiary = async () => {

    try {
        const payload = {
            "account_number": "0690000034",
            "account_bank":"044" // This is the beneficiary’s bank code, you can use the List of Banks to retrieve a bank code.
            
        }
        const response = await flw.Beneficiary.create(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createBeneficiary();

```

### List all beneficiaries

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

### Fetch a beneficiary

This describes how to get a single transfer beneficiary details

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const fetchBeneficiary = async () => {

    try {
        const payload = {
            
            "id":"4150" //This is the unique identifier for the beneficiary you intend to fetch. It is returned in the call to create a beneficiary as data.id
            
        }
        const response = await flw.Beneficiary.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchBeneficiary();

```

### Delete a beneficiary

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

