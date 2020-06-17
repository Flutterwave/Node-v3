const morx = require('morx');
const q = require('q');



const spec = morx.spec()
	.build('email', 'required:true, eg:044')
	.build('tx_ref', 'required:true, eg:MC-06900021')
	.build('ip', 'required:true, eg:127.9.0.7')
	.build('custom_business_name', 'required:true, eg:John Madakin')
	.build('amount', 'required:true, eg:10')
	.build('currency', 'required:true,eg:NGN')
	.build('country', 'required:true,eg:NG')
	.build('number_of_units', 'required:true, e.g:1')
	.build('phone_number', 'required:true,eg:09384747474')
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

			// console.log(params)
			return _rave.request('v3/ebills', params)
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