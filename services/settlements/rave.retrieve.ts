import RaveBase from '../../lib/rave.base';
import { RetrieveSettlementPayload, RetrieveSettlementResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

const spec = morx.spec().build('id', 'required:true, eg:41497').end();

retrieve.morxspc = spec;

export default function retrieve(
  data: RetrieveSettlementPayload,
  _rave: RaveBase,
): Promise<RetrieveSettlementResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Fetch a Settlement',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;
    return params;
  })
    .then((params: any) => {
      params.method = 'GET';
      var uri = `v3/settlements/${params.id}`;

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
