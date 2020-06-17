const bulk_charge = require('../services/tokenized-charges/rave.bulk.charge')
const charge_token = require('../services/tokenized-charges/rave.charge')
const retrieve_a_bulk = require('../services/tokenized-charges/rave.retrieve.a.bulk')
const retrieve_charge_trans = require('../services/tokenized-charges/rave.retrieve.charge.transactions')
const update_a_token = require('../services/tokenized-charges/rave.update.tokens')




function Tokenized(RaveBase) {


	this.charge = function (data) {

		return charge_token(data, RaveBase);

	}
	this.fetch_bulk = function (data) {

		return retrieve_a_bulk(data, RaveBase);

	}

	this.bulk = function (data) {

		return bulk_charge(data, RaveBase);

	}

	this.fetch_charge_transactions = function (data) {

		return retrieve_charge_trans(data, RaveBase);

	}


	this.update_token = function (data) {

		return update_a_token(data, RaveBase);

	}



}
module.exports = Tokenized;