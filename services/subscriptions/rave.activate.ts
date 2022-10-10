import RaveBase from '../../lib/rave.base';
import { IDPayload } from '../../utils/types';
import { SubscriptionResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = morx.spec().build('id', 'required:true, eg:3477').end();

activate_sub.morxspc = spec;

export default function activate_sub(data: IDPayload, _rave: RaveBase): Promise<SubscriptionResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Activate subscription',
    },
  );

  const d = q.defer();

  q.fcall(() => {
    const validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    const params = validated.params;

    return params;
  })
    .then((params: any) => {
      params.method = 'PUT';
      var uri = `v3/subscriptions/${params.id}/activate`;

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
