import RaveBase from "../../lib/rave.base";
import { PUAResponse } from "./types";

const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package_json = require('../../package.json');

const spec = morx.spec()
	.build('id', 'required:true, eg:BIL136')
	.end();

	prdts_under_agency.morxspc = spec;

export default function prdts_under_agency(data, _rave: RaveBase): Promise<PUAResponse> {
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v3",
         "version": package_json.version,
         "title": "Incoming call",
             "message": "Get-bill-products-under-an-agency"
       })

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT, {throw_error:true});
			var params = validated.params;

			return (params);

		})
		.then((params: any) => {


			params.method = "GET"
			return _rave.request(`v3/billers/${params.id}/products`, params)
		})
		.then((resp: any) => {

			d.resolve(resp.body.data);

		})
		.catch((err: any) => {

			d.reject(err);

		});

	return d.promise;

}
