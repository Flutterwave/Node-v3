const morx = require('morx');
const q = require('q');



const spec = morx.spec()

	.build('reference', 'required:true, eg:CF-BARTER-20190420022611377491')
	.build('otp', 'required:true, eg:481208')
	.end();



function service(data, _rave) {

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return (params);

		})
		.then(params => {

			return _rave.request(`v3/otps/${params.reference}/validate`, params)
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