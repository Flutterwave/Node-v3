<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# VIRTUAL ACCOUNT NUMBERS

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.


### ```Create a virtual account number```

This describes how to create a virtual account number

Note: BVN is required for creating static account numbers in the Live Environment i.e if the value of is_permanent is True.
Kindly visit our API section found [here](https://developer.flutterwave.com/reference#create-a-virtual-account-number-1) for more information.

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const createAcct = async () => {

    try {
        const payload = {
            "email": "johnmadakin@allstar.com",
            "is_permanent": true,
            "bvn":"12345678901"
            "tx_ref": "jhn-mdkn-101923123463"
        }
        const response = await flw.VirtualAcct.create(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createAcct();
```

### ```Create bulk virtual account numbers```

This describes how to create bulk virtual account numbers

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const createBulkAcct = async () => {

    try {
        const payload = {
            "accounts": 3, //This is the number of virtual account numbers you want to generate
            "email": "sam@son.com",
            "is_permanent": true,
            "tx_ref": "jhn-mndkn-012439283422"
        }
        const response = await flw.VirtualAcct.create_bulk(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createBulkAcct();

```


### ```Get bulk virtual account details```

This describes how to fetch bulk virtual account numbers using batch id

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const fetchBulk = async () => {

    try {
        const payload = {
            "batch_id": "-RND_1311590351499953", // This is the batch ID returned in the bulk virtual account numbers creation
        }
        const response = await flw.VirtualAcct.fetch_bulk(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchBulk();
```

###  ```Get a virtual account number```

This describes how to fetch a virtual account number using order reference

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const fetch = async () => {

    try {
        const payload = {
            "order_ref": "URF_1590350605901_4406935", // This is the order reference returned in the virtual account number creation
        }
        const response = await flw.VirtualAcct.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetch();
```

