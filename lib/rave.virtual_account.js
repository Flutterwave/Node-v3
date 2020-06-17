const create_bulk_account = require('../services/virtual-account/rave.create.bulk')
const initiate = require('../services/virtual-account/rave.create')
const retrieve = require('../services/virtual-account/rave.retrieve')
const retrieve_bulk = require('../services/virtual-account/rave.retrieve.bulk')



function Virtual_account(RaveBase) {


	this.create_bulk = function (data) {

		return create_bulk_account(data, RaveBase);

	}
	this.create = function (data) {

		return initiate(data, RaveBase);

	}

	this.fetch = function (data) {

		return retrieve(data, RaveBase);

	}

	this.fetch_bulk = function (data) {

		return retrieve_bulk(data, RaveBase);

	}



}
module.exports = Virtual_account;