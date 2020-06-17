const morx = require('morx');
const q = require('q');
const spec = morx.spec()
	.build('id', 'required:true, eg:a1b7864f-c56d-4453-bf55-a08db4acb5fe')
	.build('status_action', 'required:true, eg:block')
	.end();

function service(data, _rave) {

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;
			return params
		})
		.then(params => {
			params.method = "PUT";
			var uri = `v3/virtual-cards/${params.id}/status/${params.status_action}`
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