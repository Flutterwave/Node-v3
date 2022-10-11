import RaveBase from '../../lib/rave.base';
import { TransactionsPayload, TransactionsResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

var spec = morx.spec().build('status', 'required:false, eg:failed').end();
retrieve_trans.morxspc = spec;

export default function retrieve_trans(
  data: TransactionsPayload,
  _rave: RaveBase,
): Promise<TransactionsResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'List all transactions',
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
      var uri = `/v3/transactions`;

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
