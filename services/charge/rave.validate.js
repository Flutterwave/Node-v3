const morx = require('morx');
const q = require('q');
const encrypt = require('./encryp')



var spec = morx.spec()
	.build('type', 'required:false, eg:card')
	.build('otp', 'required:true, eg:12345')
	.build('flw_ref', 'required:true, eg:RVFC6477605CE934')
	.end();

function service(data, _rave) {

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT, {throw_error:true});
			var params = validated.params;

			return (params);

		})
		.then(params => {



			var uri = `v3/validate-charge`

			return _rave.request(uri, params)
		})
		.then(response => {

			d.resolve(response.body);

		})
		.catch(err => {

			d.reject(err);

		})

	return d.promise;



}
service.morxspc = spec;
module.exports = service;