import RaveBase from '../../lib/rave.base';
import { TransactionFeePayload, TransactionFeeResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = morx
  .spec()
  .build('currency', 'required:false, eg:NGN')
  .build('amount', 'required:true, eg:1000')
  .build('payment_type', 'required:false')
  .build('card_first6digits', 'required:false')
  .end();

fee_trans.morxspc = spec;

export default function fee_trans(
  data: TransactionFeePayload,
  _rave: RaveBase,
): Promise<TransactionFeeResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Get transaction fee by currency',
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
      var uri = `v3/transactions/fee?amount=${params.amount}&currency=${params.currency}`;
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
