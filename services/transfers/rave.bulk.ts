import RaveBase from '../../lib/rave.base';
import { BulkTransferPayload, BulkTransferResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

const spec = morx
  .spec()
  .build('title', 'required:true, eg:Olufemi blktrnfr xx03')
  .build(
    'bulk_data',
    'required:true, eg:{ "bank_code": "044","account_numberr": "0690000032","amount": 45000, "currency": "NGN","narration": "akhlm blktrnsfr", "reference": "akhlm-blktrnsfr-xx03"},{"bank_code": "044","account_numberr": "0690000032","amount": 45000, "currency": "NGN","narration": "akhlm blktrnsfr", "reference": "akhlm-blktrnsfr-xx03"}',
  )
  .end();

bulk_transfer.morxspc = spec;

export default function bulk_transfer(
  data: BulkTransferPayload,
  _rave: RaveBase,
): Promise<BulkTransferResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Initiate-bulk-transfer',
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
      return _rave.request('v3/bulk-transfers/', params);
    })
    .then((resp: any) => {
      d.resolve(resp.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
