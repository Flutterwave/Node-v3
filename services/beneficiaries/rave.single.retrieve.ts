import RaveBase from "../../lib/rave.base";
import { RetrieveBeneficiaryResponse } from "./types";

var morx = require('morx');
var q = require('q');
const axios = require('axios');
const package_json = require('../../package.json');

var spec = morx.spec()
	.build('id', 'required:true, eg:a1b7864f-c56d-4453-bf55-a08db4acb5fe')
	.end();

retrieve.morxspc = spec;

export default function retrieve(data: {id: string}, _rave: RaveBase): Promise<RetrieveBeneficiaryResponse> {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package_json.version,
         "title": "Incoming call",
             "message": "Fetch Beneficiary"
       })

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT,  {throw_error:true});
			var params = validated.params;

			return params


		})
		.then((params: any) => {


			params.method = "GET";
			var uri = `v3/beneficiaries/${params.id}`

			return _rave.request(uri, params)

		})
		.then((response: any) => {

			// console.log(response.body);
			d.resolve(response.body);

		})
		.catch((err: any) => {

			d.reject(err);

		})

	return d.promise;

}