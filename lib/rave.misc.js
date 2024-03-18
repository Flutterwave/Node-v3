const balances_currency = require('../services/misc/rave.balances-currency');
const get_bal = require('../services/misc/rave.balances');
const initBVN = require('../services/misc/rave.initiate.bvn');
const verifBVN = require('../services/misc/rave.verify.bvn')
const resolve_act = require('../services/misc/rave.resolve.account');

function Misc(RaveBase) {
  this.bal_currency = function (data) {
    return balances_currency(data, RaveBase);
  };

  this.bal = function (data) {
    return get_bal(data, RaveBase);
  };

  this.bvn = function (data) {
    return initBVN(data, RaveBase);
  };

  this.verifybvn = function (data) {
    return verifBVN(data, RaveBase);
  }

  this.verify_Account = function (data) {
    return resolve_act(data, RaveBase);
  };
}
module.exports = Misc;
