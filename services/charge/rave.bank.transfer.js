const morx = require('morx');
const q = require('q');
const encrypt = require('./encryp')


var spec = morx.spec()
	.build('tx_ref', 'required:true')
	.build('currency', 'required:true, eg:GBP')
	.build('amount', 'required:true, eg:10')
	.build('phone_number', 'required:false, eg:08030930236')
	.build('email', 'required:true, eg:debowalefaulkner@gmail.com')
	.build('fullname', 'required:false, eg:lawal garba')
	.build('client_ip', 'required:false, eg:127.0.0.1')
	.build('subaccounts', 'required:false')
	.build('meta', 'required:false')
    .build('device_fingerprint', 'required:false')
    .build('narration', 'required:false')
	.build('duration', 'required:false')
    .build('is_permanent', 'required:false')
    .build('frequency', 'required:false')
	.end();

function service(data, _rave) {

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT, {throw_error:true});
			var params = validated.params;

			return (params);

		})
		.then(params => {

			
			return _rave.request('v3/charges?type=bank_transfer', params)
		})
		.then(response => {

			d.resolve(response.body);

		})
		.catch(err => {

			d.reject(err);

		})

	return d.promise;



}
service.morxspc = spec;
module.exports = service;