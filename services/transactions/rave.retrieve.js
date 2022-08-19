const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

var spec = morx.spec()
	.build('status', 'required:false, eg:failed')
	.build('page', 'required:false, eg:1')
	.build('from', 'required:false, eg:2022-08-05')
	.build('to', 'required:false, eg:2022-08-06')
	.build('tx_ref', 'required:false, eg:tx-09tx39md0')
	.build('currency', 'required:false, eg:NGN')
	.end();

function service(data,_rave) {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package.version,
         "title": "Incoming call",
             "message": "List all transactions"
       })

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data,spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return params


		})
		.then(params => {

			
			params.method = "GET";
			var uri = `/v3/transactions`

			return _rave.request(uri, params)

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
