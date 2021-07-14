const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

var spec = morx.spec()

	.end();


function service(data,_rave) {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package.version,
         "title": "Incoming call",
             "message": "List-all-transfers"
       })

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data,spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return params


		})
		.then(params => {

			// params.seckey = _rave.getSecretKey();
			params.method = "GET";
			var uri = `/v3/transfers?`

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