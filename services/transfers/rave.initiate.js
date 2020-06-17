const morx = require('morx');
const q = require('q');


const spec = morx.spec()
	.build('account_bank', 'required:true, eg:044')
	.build('account_number', 'required:true,validators:isNumeric, eg:06900021')
	.build('amount', 'required:true, eg:10')
	.build('narration', 'required:false,eg:New transfer')
	.build('currency', 'required:required,eg:NGN')
	.build('debit_currency', 'required:required, e.g:NGN')
	.build('reference', 'required:required,eg:mk-902837-jk')
	.end();


function service(data, _rave) {

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return (params);

		})
		.then(params => {

			return _rave.request('v3/transfers', params)
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