const activate_sub = require('../services/subscriptions/rave.activate')
const cancel_sub = require('../services/subscriptions/rave.cancel')
const retrieve_all = require('../services/subscriptions/rave.retrieve.all')
const fetch_one = require('../services/subscriptions/rave.retrieve.single') 


function Subscriptions(RaveBase) {


	this.activate = function (data) {

		return activate_sub(data, RaveBase);

	}

	this.cancel = function (data) {

		return cancel_sub(data, RaveBase);

	}

	this.fetch_all = function (data) {

		return retrieve_all(data, RaveBase);

	}

	this.get = function (data) {

		return fetch_one(data, RaveBase);

	}

}
module.exports = Subscriptions;