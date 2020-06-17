const morx = require('morx');
const q = require('q');


const spec = morx.spec()

	.build('length', 'required:true, eg:4')
	.build('sender', 'required:true, eg:olufemi Oba')
	.build('customer', 'required:true, eg:{ "name": "Kazan", "email": "kazan@mailinator.com", "phone": "2348131149273" }')
	.build('send', 'required:true, eg:true')
	.build('medium', 'required:false,eg:["email"]')
	.build('expiry', 'required:true, eg:5')
	.end();



function service(data, _rave) {

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return (params);

		})
		.then(params => {
	
			return _rave.request('v3/otps', params)
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