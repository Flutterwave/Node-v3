const create_sub = require('../services/subaccount/rave.create')
const del_sub = require('../services/subaccount/rave.delete')
const get_all = require('../services/subaccount/rave.fetch.all')
const get = require('../services/subaccount/rave.fetch')
const update_sub = require('../services/subaccount/rave.update')

function Subaccount(RaveBase) {


	this.create = function (data) {

		return create_sub(data, RaveBase);

	}

	this.delete = function (data) {

		return del_sub(data, RaveBase);

	}

	this.fetch_all = function (data) {

		return get_all(data, RaveBase);

	}

	this.fetch = function (data) {

		return get(data, RaveBase);

	}

	this.update = function (data) {

		return update_sub(data, RaveBase);

	}



}
module.exports = Subaccount;