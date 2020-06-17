const morx = require('morx');
const q = require('q');

const spec = morx.spec()
	.build('bulk_id', 'required:false, eg:131')
	.end();


function service(data, _rave) {

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return (params);

		})
		.then(params => {
			params.method = "GET"
			return _rave.request(`v3/bulk-tokenized-charges/${params.bulk_id}/transactions`, params)
		})
		.then(resp => {

			d.resolve(resp.body.data);

		})
		.catch(err => {

			d.reject(err);

		});

	return d.promise;

}
service.morxspc = spec;
module.exports = service;