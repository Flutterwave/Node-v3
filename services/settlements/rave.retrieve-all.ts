import RaveBase from '../../lib/rave.base';
import { SettlementResponse, SettlementsPayload } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

const spec = morx
  .spec()

  .end();

retrieve_all.morxspc = spec;

export default function retrieve_all(
  data: SettlementsPayload,
  _rave: RaveBase,
): Promise<SettlementResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'List all Settlements',
    },
  );

  const d = q.defer();

  q.fcall(() => {
    const validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    const params = validated.params;

    return params;
  })
    .then((params: any) => {
      params.method = 'GET';
      var uri = `v3/settlements`;

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
