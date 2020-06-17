var morx = require('morx');
var q = require('q');



var spec = morx.spec()
	.build('id', 'required:true, eg:1cb36826-8e05-40d6-8b9e-7f7439a141cb')
	.build('amount', 'required:true, eg:10')
	.build('debit_currency', 'required:true, eg:USD')
	.end();

function service(data, _rave) {

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return params


		})
		.then(params => {

			var uri = `v3/virtual-cards/${params.id}/fund`

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