<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# SETTLEMENTS

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.


### Get all settlements

This describes how to fetch all settlements

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const fetchSettlements = async () => {

    try {
       
        const response = await flw.Settlement.fetch_all()
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchSettlements();

```


### Get a settlement

This describes how to fetch and search all your settlements

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const fetchSettlement = async () => {

    try {
        const payload = {
            
            "id":"2911" ,//This is a unique identifier for the particular settlement you want to fetch.
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
