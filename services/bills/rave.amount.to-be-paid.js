const morx = require('morx');
const q = require('q');

const spec = morx.spec()
	.build('id', 'required:true, eg:BIL136')
	.build('product_id', 'required:true, eg:AT152')
	.end();



function service(data, _rave) {

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT,  {throw_error:true});
			var params = validated.params;

			return (params);

		})
		.then(params => {


			params.method = "GET"
			return _rave.request(`v3/billers/${params.id}/products/${params.product_id}`, params)
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