const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = morx.spec()
	.build('account_bank', 'required:true, eg:044')
	.build('merchant_id', 'required:true,validators:isNumeric, eg:06900021')
	.build('amount', 'required:true, eg:10')
	.build('narration', 'required:false,eg:New transfer')
	.build('currency', 'required:required,eg:NGN')
	.build('debit_currency', 'required:required, e.g:NGN')
	.build('reference', 'required:required,eg:mk-902837-jk')
	.end();


function service(data, _rave) {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package.version,
         "title": "Incoming call",
             "message": "Wallet-transfer"
       })

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
            var params = validated.params;
            

			return (params);

		})
		.then(params => {
           params.account_number=params.merchant_id
			return _rave.request('v3/transfers', params)
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