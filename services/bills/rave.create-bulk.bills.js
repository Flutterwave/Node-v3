const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');



const spec = morx.spec()

	.build('bulk_reference', 'required:true, eg:edf-12de5223d2f32')
	.build('callback_url', 'required:true, eg:https://webhook.site/5f9a659a-11a2-4925-89cf-8a59ea6a019a')
	.build('bulk_data', 'required:true, eg:[{"country": "NG", "customer": "+23490803840303","amount": 500,"recurrence": "WEEKLY", "type": "AIRTIME", "reference": "930049200929" },{ "country": "NG","customer": "+23490803840304","amount": 500, "recurrence": "WEEKLY","type": "AIRTIME", "reference": "930004912332" }]')

	.end();



function service(data, _rave) {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package.version,
         "title": "Incoming call",
             "message": "Create bulk bills"
       })

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT,  {throw_error:true});
			var params = validated.params;

			return (params);

		})
		.then(params => {
			params.method = "POST"

			return _rave.request('v3/bulk-bills', params)
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