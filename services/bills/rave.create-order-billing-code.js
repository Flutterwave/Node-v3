const morx = require('morx');
const q = require('q');


const spec = morx.spec()
	.build('id', 'required:true, eg:BIL136')
	.build('amount', 'required:true, eg:3000.50')
	.build('reference', 'required:true, eg:BPUSSD1588268275502326')
	.build('country', 'required:false, eg:NG')
	.build('customer', 'required:true, eg:{ "name": "emmanuel", "email": "emmanuel@x.com", "phone_number": "08060811638"}')
	.build('fields', 'required:true, eg:[{"id": "42107711:42107712","quantity": "1","value": "3500"}, { "id": "42107710", "quantity": "1", "value": "t@x.com" }]')
	.build('product_id', 'required:true, eg:OT151')
	.end();



function service(data, _rave) {

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT,  {throw_error:true});
			var params = validated.params;

			return (params);

		})
		.then(params => {


			params.method = "POST"
			return _rave.request(`v3/billers/${params.id}/products/${params.product_id}/orders`, params)
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