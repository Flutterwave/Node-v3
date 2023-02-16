const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = morx.spec()

	.build('currency', 'required:true, eg:USD')
	.build('amount', 'required:true, eg:100')
	.build('first_name', 'required:true, eg:Bruce')
	.build('last_name', 'required:true, eg:Wayne')
	.build('date_of_birth', 'required:true, eg:1915/04/07')
	.build('email', 'required:true, eg:Brucewayne@gmail.com')
	.build('phone', 'required:true, eg:0808345673823')
	.build('title', 'required:true, eg:MR')
	.build('gender', 'required:true, eg:M')
	.build('debit_currency', 'required:false, eg:USD')
	.build('billing_name', 'required:false, eg:Mohammed Lawal')
	.build('billing_address', 'required:false, eg:DREAM BOULEVARD')
	.build('billing_city', 'required:false, eg:ADYEN')
	.build('billing_state', 'required:false, eg:NEW LANGE')
	.build('billing_postal_code', 'required:false, eg:293094')
	.build('billing_country', 'required:false, eg:US')
	.build('callback_url', 'required:false, eg:https://your-callback-url.com/')
	.end();


function service(data, _rave) {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package.version,
         "title": "Incoming call",
             "message": "Create-card"
       })

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return (params);

		})
		.then(params => {

			return _rave.request('v3/virtual-cards', params)
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