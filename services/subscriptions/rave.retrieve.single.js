const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

var spec = morx.spec()
    .build('email', 'required:false, eg:debowalefaulkner@gmail.com')
    // .build('plan', 'required:false, eg:3874')
    // .build('subscribed_from', 'required:false, eg:2020-01-01')
    // .build('subscribed_to', 'required:false, eg:2020-05-05')
    // .build('status', 'required:false, eg:active')
	.end();


function service(data,_rave) {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package.version,
         "title": "Incoming call",
             "message": "Fetch a Subscription"
       })

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data,spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return params


		})
		.then(params => {

			
			params.method = "GET";
			var uri = `v3/subscriptions?email=${params.email}`

            

			return _rave.request(uri, params)

		})
		.then(response => {

			// console.log(response.body);
			d.resolve(response.body);

		})
		.catch(err => {

			d.reject(err);

		})

	return d.promise;

}
service.morxspc = spec;
module.exports = service;