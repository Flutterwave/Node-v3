import RaveBase from '../../lib/rave.base';
import { IDPayload } from '../../utils/types';
import { TransactionRefundResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = morx
  .spec()
  .build('id', 'required:true, eg:5708')
  .build('amount', 'required:true, eg:1000')
  .end();

refund_trans.morxspc = spec;

export default function refund_trans(
  data: IDPayload,
  _rave: RaveBase,
): Promise<TransactionRefundResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Initiate refund',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;
    // _rave.params = params
    // console.log(params)
    return params;
  })
    .then((params: any) => {
      // params.seckey = _rave.getSecretKey();
      params.method = 'POST';
      const uri = `v3/transactions/${params.id}/refund`;
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
