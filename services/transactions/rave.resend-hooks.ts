import RaveBase from '../../lib/rave.base';
import { IDPayload } from '../../utils/types';
import { ResendTransactionResponse, ResendTransactionPayload } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = morx.spec().build('id', 'required:true, eg:5708').end();

resend_hooks_trans.morxspc = spec;

export default function resend_hooks_trans(
  data: ResendTransactionPayload,
  _rave: RaveBase,
): Promise<ResendTransactionResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Resend-transaction-webhooks',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      // params.seckey = _rave.getSecretKey();
      params.method = 'POST';
      const uri = `v3/transactions/${params.id}/resend-hook?`;
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
