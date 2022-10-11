import RaveBase from '../../lib/rave.base';
import { UpdateTokenPayload, UpdateTokenResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

const spec = morx
  .spec()
  .build(
    'token',
    'required:true, eg:flw-t1nf-f9b3bf384cd30d6fca42b6df9d27bd2f-m03k',
  )
  .build('email', 'required:false, eg:debowalefaulkner@gmail.com')
  .build('phone_number', 'required:false, eg:0813XXXXXXX')
  .build('last_name', 'required:false, eg:garuba')
  .build('first_name', 'required:false, eg:garuba')

  .end();

update_a_token.morxspc = spec;

export default function update_a_token(
  data: UpdateTokenPayload,
  _rave: RaveBase,
): Promise<UpdateTokenResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Update token',
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
      return _rave.request(`v3/tokens/${params.token}`, params);
    })
    .then((resp: any) => {
      d.resolve(resp.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
