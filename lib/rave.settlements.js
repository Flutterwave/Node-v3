const retrieve_all = require('../services/settlements/rave.retrieve-all')
const retrieve = require('../services/settlements/rave.retrieve')


function Settlements(RaveBase) {


	this.fetch_all = function (data) {

		return retrieve_all(data, RaveBase);

	}

	this.fetch = function (data) {

		return retrieve(data, RaveBase);

	}


}
module.exports = Settlements;