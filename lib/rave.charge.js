const card_charge = require('../services/charge/rave.card.charge');
const ng_banks = require('../services/charge/rave.ng-banks');
const uk_bank = require('../services/charge/rave.uk-banks');
const ussd_Charge = require('../services/charge/rave.ussd');
const validate_charge = require('../services/charge/rave.validate');
const voucher_charge = require('../services/charge/rave.voucher');
const ach_payment = require('../services/charge/rave.ach');
const bank_trans = require('../services/charge/rave.bank.transfer');
const applepay = require('../services/charge/rave.applepay');
const googlepay = require('../services/charge/rave.googlepay');
const enaira = require('../services/charge/rave.enaira');

function Charge(RaveBase) {
  this.card = function (data) {
    return card_charge(data, RaveBase);
  };

  this.ng = function (data) {
    return ng_banks(data, RaveBase);
  };

  this.ach = function (data) {
    return ach_payment(data, RaveBase);
  };

  this.uk = function (data) {
    return uk_bank(data, RaveBase);
  };

  this.ussd = function (data) {
    return ussd_Charge(data, RaveBase);
  };

  this.validate = function (data) {
    return validate_charge(data, RaveBase);
  };

  this.voucher = function (data) {
    return voucher_charge(data, RaveBase);
  };
  this.bank_transfer = function (data) {
    return bank_trans(data, RaveBase);
  };
  this.applepay = function (data) {
    return applepay(data, RaveBase);
  };
  this.googlepay = function (data) {
    return googlepay(data, RaveBase);
  };
  this.enaira = function (data) {
    return enaira(data, RaveBase);
  };
}
module.exports = Charge;
