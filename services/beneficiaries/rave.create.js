const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = morx.spec()
	.build('account_number', 'required:true, eg:0690000034')
	.build('account_bank', 'required:true, eg:044')
	.build('beneficiary_name', 'required:true, eg:Flutterwave-Developers')
	.build('currency','required:false, eg:NGN')
	.end();

function service(data, _rave) {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package.version,
         "title": "Incoming call",
             "message": "Create Beneficiary"
       })

	const d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT,  {throw_error:true});
			var params = validated.params;

			return params


		})
		.then(params => {

			// params.seckey = _rave.getSecretKey();
			params.method = "POST";
			var uri = `v3/beneficiaries`

			return _rave.request(uri, params)

		})
		.then(response => {

			// console.log(response.body);
			d.resolve(response.body);

		})
		.catch(err => {

			d.reject(err);

		})

	return d.promise;

}
service.morxspc = spec;
module.exports = service;