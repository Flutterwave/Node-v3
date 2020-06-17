const order_ebills = require('../services/ebills/rave.order')
const update_ebills = require('../services/ebills/rave.update')

function Ebills(RaveBase) {

	this.order = function (data) {

		return order_ebills(data, RaveBase);

	}

	this.update = function (data) {

		return update_ebills(data, RaveBase);
	}

}
module.exports = Ebills;