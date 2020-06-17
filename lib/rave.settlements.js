const retrieve_all = require('../services/beneficiaries/rave.retrieve')
const retrieve = require('../services/beneficiaries/rave.single.retrieve')


function Settlements(RaveBase) {


	this.fetch_all = function (data) {

		return retrieve_all(data, RaveBase);

	}

	this.fetch = function (data) {

		return retrieve(data, RaveBase);

	}


}
module.exports = Settlements;