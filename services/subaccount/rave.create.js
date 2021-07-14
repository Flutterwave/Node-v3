const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');



const spec = morx.spec()

	.build('account_bank', 'required:true, eg:044')
	.build('account_number', 'required:true,validators:isNumeric, eg:06900021')
	.build('business_name', 'required:true, eg:JK Services')
	.build('business_email', 'required:true, eg:e.ikedieze@gmail.com')
	.build('business_contact', 'required:true, eg:Ikedieze Ndukwe')
	.build('business_contact_mobile', 'required:true, eg:08174111222')
	.build('business_mobile', 'required:false,eg:08030930236')
	.build('meta', 'required:false,eg:[{"meta_name": "MarketplaceID", "meta_value": "ggs-920900"}]')
	.build('country', 'required:true, eg:NG')
	.build('split_type', 'required:false,eg:percentage')
	.build('split_value', 'required:false,eg:0.5')
	.end();


function service(data, _rave) {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package.version,
         "title": "Incoming call",
             "message": "Create Subaccount"
       })

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return (params);

		})
		.then(params => {

			return _rave.request('v3/subaccounts', params)
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