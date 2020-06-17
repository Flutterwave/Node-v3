const morx = require('morx');
const q = require('q');

const spec = morx.spec()
	.build('token', 'required:true, eg:flw-t1nf-f9b3bf384cd30d6fca42b6df9d27bd2f-m03k')
	.build('email', 'required:false, eg:debowalefaulkner@gmail.com')
	.build('phone_number', 'required:false, eg:0813XXXXXXX')
	.build('last_name', 'required:false, eg:garuba')
	.build('first_name', 'required:false, eg:garuba')

	.end();


function service(data, _rave) {

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return (params);

		})
		.then(params => {
			params.method = "PUT"
			return _rave.request(`v3/tokens/${params.token}`, params)
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