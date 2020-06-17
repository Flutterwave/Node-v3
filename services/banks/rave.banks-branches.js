const morx = require('morx');
const q = require('q');


const spec = morx.spec()
	.build('id', 'required:true, eg:133')
	.end();

function service(data, _rave) {

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT,  {throw_error:true});
			var params = validated.params;
			return params


		})
		.then(params => {

			params.method = "GET";
			var uri = `v3/banks/${params.id}/branches`

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