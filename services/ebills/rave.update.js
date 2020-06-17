const morx = require('morx');
const q = require('q');

const spec = morx.spec()
	.build('reference', 'required:true, eg:RVEBLS-F81CEEEE8218-73362')
	.build('amount', 'required:true, eg:10')
	.build('currency', 'required:true,eg:NGN')
	.end();


function service(data, _rave) {

	const d = q.defer();
	q.fcall(() => {

			const validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			const params = validated.params;
			// _rave.params = params
			return (params);

		})
		.then(params => {
			params.method = "PUT";
			// console.log(params)
			return _rave.request(`v3/ebills/${params.reference}`, params)
		})
		.then(resp => {

			d.resolve(resp.body);

		})
		.catch(err => {

			d.reject(err);

		});

	return d.promise;

}
service.morxspc = spec;
module.exports = service;