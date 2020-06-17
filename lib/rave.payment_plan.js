const create_plan = require('../services/payment-plans/rave.create')
const cancel_plan = require('../services/payment-plans/rave.cancel')
const retrieve_all = require('../services/payment-plans/rave.retrieve.all')
const retrieve_single = require('../services/payment-plans/rave.retrieve.single')
const update_plan = require('../services/payment-plans/rave.update')



function Payment_plan(RaveBase) {


	this.create = function (data) {

		return create_plan(data, RaveBase);

	}

	this.cancel = function (data) {

		return cancel_plan(data, RaveBase);

	}
	this.get_all = function (data) {

		return retrieve_all(data, RaveBase);

	}
	this.get_plan = function (data) {

		return retrieve_single(data, RaveBase);

	}
	this.update = function (data) {

		return update_plan(data, RaveBase);

	}

}
module.exports = Payment_plan;