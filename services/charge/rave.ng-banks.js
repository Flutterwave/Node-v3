const morx = require('morx');
const q = require('q');
const encrypt = require('./encryp');
const axios = require('axios');
const package = require('../../package.json');


var spec = morx.spec()
	.build('account_bank', 'required:true, eg:00000')
	.build('account_number', 'required:true, eg:0000000000')
	.build('currency', 'required:true, eg:GBP')
	.build('amount', 'required:true, eg:10')
	.build('phone_number', 'required:false, eg:08030930236')
	.build('email', 'required:true, eg:debowalefaulkner@gmail.com')
	.build('fullname', 'required:false, eg:lawal garba')
	.build('client_ip', 'required:false, eg:127.0.0.1')
	.build('tx_ref', 'required:false, eg:FLW_y-443342')
	.build('subaccounts', 'required:false')
	.build('meta', 'required:false')
	.build('device_fingerprint', 'required:false')
	.build('bvn', 'required:false')
	.build('passcode', 'required:false')
	.end();

function service(data, _rave) {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package.version,
         "title": "Incoming call",
             "message": "Pay-with-Bank-Nigeria"
       })

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT, {throw_error:true});
			var params = validated.params;

			return (params);

		})
		.then(params => {

			
			return _rave.request('v3/charges?type=debit_ng_account', params)
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