const morx = require('morx');
const q = require('q');


const spec = morx.spec()
	.build('title', 'required:true, eg:Olufemi blktrnfr xx03')
	.build('bulk_data', 'required:true, eg:{ "bank_code": "044","account_numberr": "0690000032","amount": 45000, "currency": "NGN","narration": "akhlm blktrnsfr", "reference": "akhlm-blktrnsfr-xx03"},{"bank_code": "044","account_numberr": "0690000032","amount": 45000, "currency": "NGN","narration": "akhlm blktrnsfr", "reference": "akhlm-blktrnsfr-xx03"}')
	.end();

function service(data, _rave) {

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;
	
			return (params);

		})
		.then(params => {
			// params.seckey = _rave.getSecretKey();  
			return _rave.request('v3/bulk-transfers/', params)
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