const create_otp = require('../services/otps/rave.create')
const validate_otp = require('../services/otps/rave.validate')


function Otp(RaveBase) {

	this.create = function (data) {

		return create_otp(data, RaveBase);

	}

	this.validate = function (data) {

		return validate_otp(data, RaveBase);

	}



}
module.exports = Otp;