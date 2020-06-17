const morx = require('morx');
const q = require('q');


const spec = morx.spec()

	.end();


function service(data,_rave) {

	const d = q.defer();

	q.fcall(() => {

			const validated = morx.validate(data,spec, _rave.MORX_DEFAULT);
			const params = validated.params;

			return params


		})
		.then(params => {


			params.method = "GET";
			var uri = `v3/settlements`

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