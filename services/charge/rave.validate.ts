import RaveBase from '../../lib/rave.base';
import { ValidateChargePayload, ValidateChargeResponse } from './types';

const morx = require('morx');
const q = require('q');
const encrypt = require('./encryp');
const axios = require('axios');


var spec = morx
  .spec()
  .build('type', 'required:false, eg:card')
  .build('otp', 'required:true, eg:12345')
  .build('flw_ref', 'required:true, eg:RVFC6477605CE934')
  .end();

validate_charge.morxspc = spec;

export default function validate_charge(
  data: ValidateChargePayload,
  _rave: RaveBase,
): Promise<ValidateChargeResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: process.env.npm_package_version,
      title: 'Incoming call',
      message: 'Validate Charge',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT, {
      throw_error: true,
    });
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      var uri = `v3/validate-charge`;

      return _rave.request(uri, params);
    })
    .then((response: any) => {
      d.resolve(response.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
