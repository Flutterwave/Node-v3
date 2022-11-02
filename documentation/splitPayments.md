<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# Split payments

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.


## Creating subaccounts
This describes how to create a subaccount on Flutterwave

```javascript

// Install with: npm i flutterwave-node-v3

const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
const details = {
   account_bank: "044",
   account_number: "0690000037",
   business_name: "Flutterwave Developers",
   business_mobile: "09087930450",
   country: "NG",
   split_type: "percentage",
   split_value: 0.2
};
flw.Subaccount.create(details)
  .then(console.log)
  .catch(console.log);


```

##### Country-specific requirements
For certain countries, you'll also need to include a meta object containing additional information about the bank account.

If the account is in the US, you'll need to supply a Swift code and routing number. If it's in Ghana, Tanzania, Rwanda, Uganda, or Tanzania, you'll need to supply a branch code.

## Fetch all subaccounts
This describes how to get all subaccounts

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );



const fetchAllSubaccounts = async () => {

    try {
        

        const response = await flw.Subaccount.fetch_all()
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchAllSubaccounts();


```

## Fetch a subaccount
This describes how to fetch a subaccount using the sub-account's ID

```javascript

const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const fetchSubaccount = async () => {

    try {

        const payload = {
            "id":"5716"
        }
        

        const response = await flw.Subaccount.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchSubaccount();



```

## Update a subaccount
This describes how to update a subaccount

```javascript


const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const updateSubaccount = async () => {

    try {

        const payload = {
            "id": "3244", //This is the unique id of the subaccount you want to update. It is returned in the call to create a subaccount as data.id
            "business_name": "Xyx lol!",
            "business_email": "mad@o.enterprises",
            "account_bank": "044",
            "account_number": "0690000040",
            "split_type": "flat",
            "split_value": "200"
        }


        const response = await flw.Subaccount.update(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


updateSubaccount();




```
## Delete a subaccount
This describes how to delete a subaccount

```javascript


const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const updateSubaccount = async () => {

    try {

        const payload = {
            "id": "3244" //This is the unique id of the subaccount you want to update. It is returned in the call to create a subaccount as data.id
        }


        const response = await flw.Subaccount.delete(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


updateSubaccount();



```