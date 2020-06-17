var morx = require('morx');
var q = require('q');
const path = require('path')

var spec = morx.spec()
	.build('id', 'required:true, eg:RS_C3FCBECF928B4B33B9C3BC74A357A9E5')
	.end();

function service(data, _rave) {

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return params


		})
		.then(params => {


			params.method = "GET";
			var uri = `v3/subaccounts/${params.id}`
			// console.log(params)
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