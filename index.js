const base = require('./lib/rave.base');
const bank = require('./lib/rave.banks');
const beneficiary = require('./lib/rave.beneficiaries');
const bills = require('./lib/rave.bills');
const charge = require('./lib/rave.charge');
const ebills = require('./lib/rave.ebills');
const misc = require('./lib/rave.misc');
const mobile_money = require('./lib/rave.mobile_money');
const security = require('./lib/security');
// const custom = require("./lib/rave.custom");
const otps = require('./lib/rave.otps');
const payment_plan = require('./lib/rave.payment_plan');
const settlement = require('./lib/rave.settlements');
const subaccount = require('./lib/rave.subaccount');
const subscription = require('./lib/rave.subscriptions');
const tokenized = require('./lib/rave.tokenized');
const transaction = require('./lib/rave.transactions');
const transfer = require('./lib/rave.transfers');
const virtual_acct = require('./lib/rave.virtual_account');
const virtual_card = require('./lib/rave.virtual_cards');

const Rave = function (public_key, public_secret, base_url_or_production_flag) {
  const ravebase = new base(
    public_key,
    public_secret,
    base_url_or_production_flag,
  );

  this.Bank = new bank(ravebase);
  this.Beneficiary = new beneficiary(ravebase);
  this.Bills = new bills(ravebase);
  this.Charge = new charge(ravebase);
  this.Ebills = new ebills(ravebase);
  this.Misc = new misc(ravebase);
  this.MobileMoney = new mobile_money(ravebase);
  this.security = security;
  //   this.CustomRequest = new custom(ravebase);
  this.Otp = new otps(ravebase);
  this.PaymentPlan = new payment_plan(ravebase);
  this.Settlement = new settlement(ravebase);
  this.Subscription = new subscription(ravebase);
  this.Subaccount = new subaccount(ravebase);
  this.Tokenized = new tokenized(ravebase);
  this.Transaction = new transaction(ravebase);
  this.Transfer = new transfer(ravebase);
  this.VirtualAcct = new virtual_acct(ravebase);
  this.VirtualCard = new virtual_card(ravebase);

  this.getIntegrityHash = function (data) {
    return ravebase.getIntegrityHash(data);
  };
};

module.exports = Rave;
