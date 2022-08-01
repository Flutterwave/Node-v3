const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');


const spec = morx.spec()
	.build('amount', 'required:true, eg:5000')
	.build('name', 'required:true, eg:Monthly Nepa Bill Collection')
	.build('interval', 'required:true, eg:monthly')
	.build('duration', 'required:false, eg:24')
	.end();

function service(data, _rave) {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package.version,
         "title": "Incoming call",
             "message": "Create Payment plan"
       })

	const d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;
			// _rave.params = params
			// console.log(params)
			return params


		})
		.then(params => {

			// params.seckey = _rave.getSecretKey();
			params.method = "POST";
			var uri = `v3/payment-plans`

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