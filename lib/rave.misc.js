const balances_currency = require('../services/misc/rave.balances-currency');
const get_bal = require('../services/misc/rave.balances');
const bankBVN = require('../services/misc/rave.bvn');
const resolve_act = require('../services/misc/rave.resolve.account');

function Misc(RaveBase) {
  this.bal_currency = function (data) {
    return balances_currency(data, RaveBase);
  };

  this.bal = function (data) {
    return get_bal(data, RaveBase);
  };

  this.bvn = function (data) {
    return bankBVN(data, RaveBase);
  };
  this.verify_Account = function (data) {
    return resolve_act(data, RaveBase);
  };
}
module.exports = Misc;
