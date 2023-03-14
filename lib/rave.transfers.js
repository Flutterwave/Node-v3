const bulk_transfer = require('../services/transfers/rave.bulk');
const fee_transfer = require('../services/transfers/rave.fee');
const initiate_transfer = require('../services/transfers/rave.initiate');
const fetch_transfers = require('../services/transfers/rave.retrieve.transfers');
const getATransfer = require('../services/transfers/rave.fetch');
const wallet = require('../services/transfers/rave.wallet');

function Transfers(RaveBase) {
  this.bulk = function (data) {
    return bulk_transfer(data, RaveBase);
  };

  this.fee = function (data) {
    return fee_transfer(data, RaveBase);
  };
  this.initiate = function (data) {
    return initiate_transfer(data, RaveBase);
  };
  this.fetch = function (data) {
    return fetch_transfers(data, RaveBase);
  };
  this.get_a_transfer = function (data) {
    return getATransfer(data, RaveBase);
  };
  this.wallet_to_wallet = function (data) {
    return wallet(data, RaveBase);
  };
}
module.exports = Transfers;
