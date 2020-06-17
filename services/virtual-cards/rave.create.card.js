const morx = require('morx');
const q = require('q');



const spec = morx.spec()

	.build('currency', 'required:true, eg:USD')
	.build('amount', 'required:true, eg:100')
	.build('billing_name', 'required:true, eg:Mohammed Lawal')
	.build('billing_address', 'required:true, eg:DREAM BOULEVARD')
	.build('billing_city', 'required:true, eg:ADYEN')
	.build('billing_state', 'required:true, eg:NEW LANGE')
	.build('billing_postal_code', 'required:true, eg:293094')
	.build('billing_country', 'required:true, eg:US')
	.build('callback_url', 'required:false, eg:https://your-callback-url.com/')
	.end();


function service(data, _rave) {

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