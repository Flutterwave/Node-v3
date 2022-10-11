import RaveBase from '../../lib/rave.base';
import { IDPayload } from '../../utils/types';
import { SubscriptionResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

const spec = morx.spec().build('id', 'required:true, eg:3477').end();
cancel_sub.morxspc = spec;

export default function cancel_sub(
  data: IDPayload,
  _rave: RaveBase,
): Promise<SubscriptionResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Cancel Subscription',
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
      var uri = `v3/subscriptions/${params.id}/cancel`;

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
