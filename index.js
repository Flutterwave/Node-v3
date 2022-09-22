"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const rave_base_1 = __importDefault(require("./lib/rave.base"));
const rave_bills_1 = __importDefault(require("./lib/rave.bills"));
(0, dotenv_1.config)();
const flutterwave = new rave_base_1.default(String(process.env.FWPK), String(process.env.FSK));
const bills = new rave_bills_1.default(flutterwave);
bills.fetch_bills({ "from": "" }).then(res => {
    res.data.summary[0].count_airtime;
});
