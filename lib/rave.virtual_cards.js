const create_Card = require('../services/virtual-cards/rave.create.card');
const fund_Card = require('../services/virtual-cards/rave.fund');
const retrieve_all_Cards = require('../services/virtual-cards/rave.retrieve.all.cards');
const block_card = require('../services/virtual-cards/rave.block_unblock');
const unblock_card = require('../services/virtual-cards/rave.block_unblock');
const terminate_card = require('../services/virtual-cards/rave.terminate');
const card_transactions = require('../services/virtual-cards/rave.transactions');
const withdraw_from_Card = require('../services/virtual-cards/rave.withdraw');
const retrieve_single_Card = require('../services/virtual-cards/rave.retrieve.single.card');

function Virtual_card(RaveBase) {
  this.create = function (data) {
    return create_Card(data, RaveBase);
  };
  this.fund = function (data) {
    return fund_Card(data, RaveBase);
  };

  this.fetch_all = function (data) {
    return retrieve_all_Cards(data, RaveBase);
  };
  this.fetch = function (data) {
    return retrieve_single_Card(data, RaveBase);
  };

  this.block = function (data) {
    return block_card(data, RaveBase);
  };
  this.unblock = function (data) {
    return unblock_card(data, RaveBase);
  };
  this.terminate = function (data) {
    return terminate_card(data, RaveBase);
  };
  this.transactions = function (data) {
    return card_transactions(data, RaveBase);
  };
  this.withdraw_funds = function (data) {
    return withdraw_from_Card(data, RaveBase);
  };
}
module.exports = Virtual_card;
