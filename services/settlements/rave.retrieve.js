const morx = require('morx');
const q = require('q');

const spec = morx.spec()
	.build('id', 'required:true, eg:41497')
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
			var uri = `v3/settlements/${params.id}`

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

