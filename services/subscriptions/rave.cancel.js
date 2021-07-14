const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = morx.spec()
	.build('id', 'required:true, eg:3477')
	.end();

function service(data, _rave) {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package.version,
         "title": "Incoming call",
             "message": "Cancel Subscription"
       })

	const d = q.defer();

	q.fcall(() => {

			const validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			const params = validated.params;

			return params


		})
		.then(params => {


			params.method = "PUT";
			var uri = `v3/subscriptions/${params.id}/cancel`

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