import RaveBase from '../../lib/rave.base';
import { BulkTokenTransactionsResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

const spec = morx.spec().build('bulk_id', 'required:false, eg:131').end();

retrieve_charge_trans.morxspc = spec;

export default function retrieve_charge_trans(
  data: { batch_id: string },
  _rave: RaveBase,
): Promise<BulkTokenTransactionsResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Fetch tokenized charge',
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
      return _rave.request(
        `v3/bulk-tokenized-charges/${params.bulk_id}/transactions`,
        params,
      );
    })
    .then((resp: any) => {
      d.resolve(resp.body.data);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
