import RaveBase from '../../lib/rave.base';
import { ResolveAccountPayload, ResolveAccountResponse } from './types';
const morx = require('morx');
const q = require('q');
const axios = require('axios');

const spec = morx
  .spec()
  .build('account_bank', 'required:true, eg:044')
  .build('account_number', 'required:true,validators:isNumeric, eg:06900021')
  .build('country', 'required:false, eg:KE')
  .build('type', 'required:false, eg:MOBILEMONEY')
  .end();

resolve_act.morxspc = spec;

export default function resolve_act(
  data: ResolveAccountPayload,
  _rave: RaveBase,
): Promise<ResolveAccountResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Account resolve',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      return _rave.request('v3/accounts/resolve', params);
    })
    .then((resp: any) => {
      d.resolve(resp.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
