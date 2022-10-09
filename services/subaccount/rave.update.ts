import RaveBase from "../../lib/rave.base";
import { CreateSubAccountResponse, UpdateSubAccountPayload } from "./types";

var morx = require('morx');
var q = require('q');
const axios = require('axios');
const package = require('../../package.json');

var spec = morx
  .spec()
  .build('id', 'required:true, eg:RS_C3FCBECF928B4B33B9C3BC74A357A9E5')
  .build('account_number', 'required:true,validators:isNumeric, eg:06900021')
  .build('business_name', 'required:true, eg:JK Services')
  .build('business_email', 'required:true, eg:e.ikedieze@gmail.com')
  .build('split_type', 'required:false,eg:percentage')
  .build('split_value', 'required:false,eg:0.5')
  .end();

update_sub.morxspc = spec;

export default function update_sub(data:UpdateSubAccountPayload, _rave: RaveBase): Promise<CreateSubAccountResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Update Subaccount details',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      params.method = 'PUT';
      var uri = `v3/subaccounts/${params.id}`;
      // console.log(params)
      return _rave.request(uri, params);
    })
    .then((response: any) => {
      // console.log(response.body);
      d.resolve(response.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
