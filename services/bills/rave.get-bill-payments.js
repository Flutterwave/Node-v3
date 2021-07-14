const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');


const spec = morx.spec()

	.build('from', 'required:true, eg:2018-08-01')
	.build('to', 'required:true, eg:2018-08-01')
	.build('page', 'required:false, eg:20')
	.build('reference', 'required:false, eg:9300049404444')
	.end();



function service(data, _rave) {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package.version,
         "title": "Incoming call",
             "message": "Get-bill-payment"
       })

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT,  {throw_error:true});
			var params = validated.params;

			return (params);

		})
		.then(params => {


			params.method = "GET"
			return _rave.request(`v3/bills?from=${params.from}&to=${params.to}`, params)
		})
		.then(resp => {

			d.resolve(resp.body.data);

		})
		.catch(err => {

			d.reject(err);

		});

	return d.promise;

}
service.morxspc = spec;
module.exports = service;