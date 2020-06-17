const banks_branches = require('../services/banks/rave.banks-branches')
const banks_country = require('../services/banks/rave.banks-country')

function Bank(RaveBase) {

	this.branches = function (data) {

		return banks_branches(data, RaveBase);
	}

	this.country = function (data) {

		return banks_country(data, RaveBase);

	}
}
module.exports = Bank;