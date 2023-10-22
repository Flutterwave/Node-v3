<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# BANKS

We recommend reading the main readme first, to understand the requirements for using the library and how to initiate this in your apps. This guide assumes you've read that.

Fetch Bank details via any of these methods:
1. [Fetch all Banks](#get-all-banks)
2. [Fetch Bank Branches](#get-bank-branches)

## Get all banks

This describes how to get list of banks you can transfer to

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const getBanks = async () => {

    try {
        const payload = {
            
            "country":"NG" //Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively
            
        }
        const response = await flw.Bank.country(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getBanks();
```
Sample Response

```javascript
{
  "status": "success",
  "message": "Banks fetched successfully",
  "data": [
    {
      "id": 132,
      "code": "560",
      "name": "Page MFBank"
    },
    {
      "id": 133,
      "code": "304",
      "name": "Stanbic Mobile Money"
    },
    {
      "id": 134,
      "code": "308",
      "name": "FortisMobile"
    },
    {
      "id": 135,
      "code": "328",
      "name": "TagPay"
    },
    {
      "id": 136,
      "code": "309",
      "name": "FBNMobile"
    },
    {
      "id": 137,
      "code": "011",
      "name": "First Bank of Nigeria"
    },
    {
      "id": 138,
      "code": "326",
      "name": "Sterling Mobile"
    },
    {
      "id": 139,
      "code": "990",
      "name": "Omoluabi Mortgage Bank"
    },
    {
      "id": 140,
      "code": "311",
      "name": "ReadyCash (Parkway)"
    },
    {
      "id": 141,
      "code": "057",
      "name": "Zenith Bank"
    },
    {
      "id": 142,
      "code": "068",
      "name": "Standard Chartered Bank"
    },
    {
      "id": 143,
      "code": "306",
      "name": "eTranzact"
    },
    {
      "id": 144,
      "code": "070",
      "name": "Fidelity Bank"
    },
    {
      "id": 145,
      "code": "023",
      "name": "CitiBank"
    },
    {
      "id": 146,
      "code": "215",
      "name": "Unity Bank"
    },
    {
      "id": 147,
      "code": "323",
      "name": "Access Money"
    },
    {
      "id": 148,
      "code": "302",
      "name": "Eartholeum"
    },
    {
      "id": 149,
      "code": "324",
      "name": "Hedonmark"
    },
    {
      "id": 150,
      "code": "325",
      "name": "MoneyBox"
    },
    {
      "id": 151,
      "code": "301",
      "name": "JAIZ Bank"
    },
    {
      "id": 152,
      "code": "050",
      "name": "Ecobank Plc"
    },
    {
      "id": 153,
      "code": "307",
      "name": "EcoMobile"
    },
    {
      "id": 154,
      "code": "318",
      "name": "Fidelity Mobile"
    },
    {
      "id": 155,
      "code": "319",
      "name": "TeasyMobile"
    },
    {
      "id": 156,
      "code": "999",
      "name": "NIP Virtual Bank"
    },
    {
      "id": 157,
      "code": "320",
      "name": "VTNetworks"
    },
    {
      "id": 158,
      "code": "221",
      "name": "Stanbic IBTC Bank"
    },
    {
      "id": 159,
      "code": "501",
      "name": "Fortis Microfinance Bank"
    },
    {
      "id": 160,
      "code": "329",
      "name": "PayAttitude Online"
    },
    {
      "id": 161,
      "code": "322",
      "name": "ZenithMobile"
    },
    {
      "id": 162,
      "code": "303",
      "name": "ChamsMobile"
    },
    {
      "id": 163,
      "code": "403",
      "name": "SafeTrust Mortgage Bank"
    },
    {
      "id": 164,
      "code": "551",
      "name": "Covenant Microfinance Bank"
    },
    {
      "id": 165,
      "code": "415",
      "name": "Imperial Homes Mortgage Bank"
    },
    {
      "id": 166,
      "code": "552",
      "name": "NPF MicroFinance Bank"
    },
    {
      "id": 167,
      "code": "526",
      "name": "Parralex"
    },
    {
      "id": 168,
      "code": "035",
      "name": "Wema Bank"
    },
    {
      "id": 169,
      "code": "084",
      "name": "Enterprise Bank"
    },
    {
      "id": 170,
      "code": "063",
      "name": "Diamond Bank"
    },
    {
      "id": 171,
      "code": "305",
      "name": "Paycom"
    },
    {
      "id": 172,
      "code": "100",
      "name": "SunTrust Bank"
    },
    {
      "id": 173,
      "code": "317",
      "name": "Cellulant"
    },
    {
      "id": 174,
      "code": "401",
      "name": "ASO Savings and & Loans"
    },
    {
      "id": 175,
      "code": "030",
      "name": "Heritage"
    },
    {
      "id": 176,
      "code": "402",
      "name": "Jubilee Life Mortgage Bank"
    },
    {
      "id": 177,
      "code": "058",
      "name": "GTBank Plc"
    },
    {
      "id": 178,
      "code": "032",
      "name": "Union Bank"
    },
    {
      "id": 179,
      "code": "232",
      "name": "Sterling Bank"
    },
    {
      "id": 180,
      "code": "076",
      "name": "Skye Bank"
    },
    {
      "id": 181,
      "code": "082",
      "name": "Keystone Bank"
    },
    {
      "id": 182,
      "code": "327",
      "name": "Pagatech"
    },
    {
      "id": 183,
      "code": "559",
      "name": "Coronation Merchant Bank"
    },
    {
      "id": 184,
      "code": "601",
      "name": "FSDH"
    },
    {
      "id": 185,
      "code": "313",
      "name": "Mkudi"
    },
    {
      "id": 186,
      "code": "214",
      "name": "First City Monument Bank"
    },
    {
      "id": 187,
      "code": "314",
      "name": "FET"
    },
    {
      "id": 188,
      "code": "523",
      "name": "Trustbond"
    },
    {
      "id": 189,
      "code": "315",
      "name": "GTMobile"
    },
    {
      "id": 190,
      "code": "033",
      "name": "United Bank for Africa"
    },
    {
      "id": 191,
      "code": "044",
      "name": "Access Bank"
    },
    {
      "id": 567,
      "code": "90115",
      "name": "TCF MFB"
    }
  ]
}
```

## Get bank branches

This describes how to get a list of bank branches

```javascript
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const getBranches = async () => {

    try {
        const payload = {
            
            "id":280 //Unique bank ID, it is returned in the call to fetch banks GET /banks/:country
            
        }
        const response = await flw.Bank.branches(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getBranches();
```
Sample Response

```javascript
{
  "status": "success",
  "message": "Bank branches fetched successfully",
  "data": [
    {
      "id": 992,
      "branch_code": "GH190101",
      "branch_name": "STANBIC BANK GHANA LTD-ACCRA MAIN",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 993,
      "branch_code": "GH190102",
      "branch_name": "STANBIC BANK GHANA LTD-AIRPORT CITY",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 994,
      "branch_code": "GH190103",
      "branch_name": "STANBIC BANK GHANA LTD-SPINTEX ROAD",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 995,
      "branch_code": "GH190104",
      "branch_name": "STANBIC BANK GHANA LTD-ACCRA MALL",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 996,
      "branch_code": "GH190105",
      "branch_name": "STANBIC BANK GHANA -NORTH INDUSTIAL AREA",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 997,
      "branch_code": "GH190106",
      "branch_name": "STANBIC BANK GHANA-TEMA INDUSTRIAL AREA",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 998,
      "branch_code": "GH190107",
      "branch_name": "STANBIC BANK GHANA LTD-GRAPHIC ROAD",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 999,
      "branch_code": "GH190108",
      "branch_name": "STANBIC BANK GHANA LTD-MAKOLA",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1000,
      "branch_code": "GH190109",
      "branch_name": "STANBIC BANK GHANA LTD-RIND ROAD",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1001,
      "branch_code": "GH190110",
      "branch_name": "STANBIC BANK GHANA LTD-ACHIMOTA",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1002,
      "branch_code": "GH190112",
      "branch_name": "STANBIC BANK GHANA LTD-KASOA",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1003,
      "branch_code": "GH190401",
      "branch_name": "STANBIC BANK GHANA LTD-TAKORADI",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1004,
      "branch_code": "GH190402",
      "branch_name": "STANBIC BANK GHANA LTD-TARKWA",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1005,
      "branch_code": "GH190501",
      "branch_name": "STANBIC BANK GHANA LTD-HO",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1006,
      "branch_code": "GH190601",
      "branch_name": "STANBIC BANK GHANA LTD-HARPER-KUMASI",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1007,
      "branch_code": "GH190701",
      "branch_name": "STANBIC BANK GHANA LTD-SUNYANI",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1008,
      "branch_code": "GH190901",
      "branch_name": "STANBIC BANK GHANA LTD-BOLGATANGA",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1009,
      "branch_code": "GH191001",
      "branch_name": "STANBIC BANK GHANA LTD-WA",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1010,
      "branch_code": "GH190113",
      "branch_name": "STANBIC BANK GH LTD - TEMA FISHING HABOUR",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1011,
      "branch_code": "GH190111",
      "branch_name": "STANBIC BANK GHANA LTD-ROMAN RIDGE",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1012,
      "branch_code": "GH190801",
      "branch_name": "STANBIC BANK GHANA LTD-TAMALE",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1013,
      "branch_code": "GH190121",
      "branch_name": "STANBIC BANK -STANBIC HEIGHTS BRANCH",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1014,
      "branch_code": "GH190603",
      "branch_name": "STABIC BANK GHANA LIMITED - ADUM",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHAC",
      "bank_id": 280
    },
    {
      "id": 1015,
      "branch_code": "GH190114",
      "branch_name": "STANBIC BANK GHANA LTD-MOVENPICK",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1016,
      "branch_code": "GH190118",
      "branch_name": "STANBIC BANK - MADINA BRANCH",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHAC",
      "bank_id": 280
    },
    {
      "id": 1017,
      "branch_code": "GH190602",
      "branch_name": "STANBIC BANK GHANA LTD-SUAME",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHAC",
      "bank_id": 280
    },
    {
      "id": 1018,
      "branch_code": "GH190117",
      "branch_name": "STANBIC BANK GHANA LTD- ASHIAMAN",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHAC",
      "bank_id": 280
    },
    {
      "id": 1019,
      "branch_code": "GH190125",
      "branch_name": "STANBIC BANK-JUNCTION MALL BRANCH",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1020,
      "branch_code": "GH190120",
      "branch_name": "STANBIC BANK GHANA LTD-LAPAZ",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1021,
      "branch_code": "GH190116",
      "branch_name": "STANBIC BANK GHANA LTD-DANSOMAN",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1022,
      "branch_code": "GH190115",
      "branch_name": "STANBIC MADINA",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHAC",
      "bank_id": 280
    },
    {
      "id": 1023,
      "branch_code": "GH190130",
      "branch_name": "STANBIC BANK GHANA LTD - LEGON",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHACXXX",
      "bank_id": 280
    },
    {
      "id": 1024,
      "branch_code": "GH190119",
      "branch_name": "STANBIC BANK - EAST LEGON",
      "swift_code": "SBICGHAC",
      "bic": "SBICGHAC",
      "bank_id": 280
    }
  ]
}
```
