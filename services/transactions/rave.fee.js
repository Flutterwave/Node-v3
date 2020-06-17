const morx = require('morx');
const q = require('q');



const spec = morx.spec()
	.build('currency', 'required:false, eg:NGN')
	.build('amount', 'required:true, eg:1000')
	.build('payment_type', 'required:false')
	.build('card_first6digits', 'required:false')
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
			var uri = `v3/transactions/fee?amount=${params.amount}&currency=${params.currency}`
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