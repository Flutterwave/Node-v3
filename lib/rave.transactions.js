const event_trans = require('../services/transactions/rave.events');
const fee_trans = require('../services/transactions/rave.fee');
const refund_trans = require('../services/transactions/rave.refund');
const resend_hooks_trans = require('../services/transactions/rave.resend-hooks');
const retrieve_trans = require('../services/transactions/rave.retrieve');
const verify_trans = require('../services/transactions/rave.verify');
const verify_trans_tx = require('../services/transactions/rave.verify-by-txref');

function Transactions(RaveBase) {
  this.event = function (data) {
    return event_trans(data, RaveBase);
  };

  this.fee = function (data) {
    return fee_trans(data, RaveBase);
  };

  this.refund = function (data) {
    return refund_trans(data, RaveBase);
  };

  this.resend_hooks = function (data) {
    return resend_hooks_trans(data, RaveBase);
  };

  this.fetch = function (data) {
    return retrieve_trans(data, RaveBase);
  };

  this.verify = function (data) {
    return verify_trans(data, RaveBase);
  };

  this.verify_by_tx = function (data) {
    return verify_trans_tx(data, RaveBase);
  }
}
module.exports = Transactions;
