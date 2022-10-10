import RaveBase from '../../lib/rave.base';
import { IDPayload } from '../../utils/types';
import { TransactionEventResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

var spec = morx
  .spec()

  .build('id', 'required:true, eg:957764')
  .end();

event_trans.morxspc = spec;

export default function event_trans(
  data: IDPayload,
  _rave: RaveBase,
): Promise<TransactionEventResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'View-transaction-timeline',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);

    var params = {};
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      // params.seckey = _rave.getSecretKey();
      params.method = 'GET';
      return _rave.request(`v3/transactions/${params.id}/events`, params);
    })
    .then((response: any) => {
      // console.log(response);
      d.resolve(response.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
