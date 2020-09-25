var morx = require('morx');
var q = require('q');
const axios = require('axios');
const package = require('../../package.json');

var spec = morx.spec()
	.build('country', 'required:true, eg:NG')
	.end();

function service(data, _rave) {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package.version,
         "title": "Incoming call",
             "message": "Get Bank by Country"
       })

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT,  {throw_error:true});
			var params = validated.params;
			return params


		})
		.then(params => {

			params.method = "GET";
			var uri = `v3/banks/${params.country}`

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