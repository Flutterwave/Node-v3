const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = morx.spec()
	.build('token', 'required:true, eg:flw-t1nf-f9b3bf384cd30d6fca42b6df9d27bd2f-m03k')
	.build('currency', 'required:false, eg:NGN')
	.build('country', 'required:false, eg:NG')
	.build('amount', 'required:true, eg:10')
	.build('email', 'required:true, eg:debowalefaulkner@gmail.com')
	.build('first_name', 'required:false, eg:lawal')
	.build('last_name', 'required:false, eg:garuba')
	.build('IP', 'required:false, eg:127.0.0.1')
	.build('narration', 'required:false, eg:charging steady')
	.build('tx_ref', 'required:true, eg:flw443342')
	.build('payment_plan', 'required:false')
	.build('device_fingerprint', 'required:false,eg:12233')
	.build('subaccounts', 'required:false')
	.build('do_3ds', 'required:false')
	.build('redirect_url', 'required:false,eg:https://flutterwave.com/ng')
	.build('meta', 'required:false')
	.end();


function service(data, _rave) {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package.version,
         "title": "Incoming call",
             "message": "Tokenized charge"
       })

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return (params);

		})
		.then(params => {

			return _rave.request('v3/tokenized-charges', params)
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