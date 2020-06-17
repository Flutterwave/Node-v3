const morx = require('morx');
const q = require('q');



const spec = morx.spec()
	.build('id', 'required:true, eg:5708')
	.build('amount', 'required:true, eg:1000')
	.end();

function service(data, _rave) {

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;
			// _rave.params = params
			// console.log(params)
			return params


		})
		.then(params => {

			// params.seckey = _rave.getSecretKey();
			params.method = "POST";
			const uri = `v3/transactions/${params.id}/refund`
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