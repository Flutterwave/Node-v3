import RaveBase from '../../lib/rave.base';
import { CreateOTPPayload, CreateOTPResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

const spec = morx
  .spec()

  .build('length', 'required:true, eg:4')
  .build('sender', 'required:true, eg:olufemi Oba')
  .build(
    'customer',
    'required:true, eg:{ "name": "Kazan", "email": "kazan@mailinator.com", "phone": "2348131149273" }',
  )
  .build('send', 'required:true, eg:true')
  .build('medium', 'required:false,eg:["email"]')
  .build('expiry', 'required:true, eg:5')
  .end();

create_otp.morxspc = spec;

export default function create_otp(data: CreateOTPPayload, _rave: RaveBase): Promise<CreateOTPResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Create OTP',
    },
  );

  var d = q.defer();
  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      return _rave.request('v3/otps', params);
    })
    .then((resp: any) => {
      d.resolve(resp.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
