const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = morx.spec()

	.build('country', 'required:true, eg:NG')
	.build('amount', 'required:true, eg:500')
	.build('customer', 'required:true, eg:9300049404444')
	.build('recurrence', 'required:true, eg:weekly')
	.build('type', 'required:false,eg:DSTV')
	.build('reference', 'required:true, eg:9300049404444')
	.end();



function service(data, _rave) {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package.version,
         "title": "Incoming call",
             "message": "Create bills"
       })

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT,  {throw_error:true});
			var params = validated.params;

			return (params);

		})
		.then(params => {
			//   console.log(params)
			return _rave.request('v3/bills', params)
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