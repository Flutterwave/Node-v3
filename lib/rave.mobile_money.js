const gh = require('../services/mobile-money/rave.ghana');
const mpesa_money = require('../services/mobile-money/rave.mpesa');
const rw = require('../services/mobile-money/rave.rwanda');
const ug = require('../services/mobile-money/rave.uganda');
const zm = require('../services/mobile-money/rave.zambia');
const franc = require('../services/mobile-money/rave.francophone');

function Mobile_money(RaveBase) {
  this.ghana = function (data) {
    return gh(data, RaveBase);
  };

  this.mpesa = function (data) {
    return mpesa_money(data, RaveBase);
  };

  this.rwanda = function (data) {
    return rw(data, RaveBase);
  };

  this.uganda = function (data) {
    return ug(data, RaveBase);
  };
  this.franco_phone = function (data) {
    return franc(data, RaveBase);
  };

  this.zambia = function (data) {
    return zm(data, RaveBase);
  };
}
module.exports = Mobile_money;
