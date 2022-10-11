import RaveBase from '../../lib/rave.base';
import {
  BatchVirtualAccountResponse,
  FetchBatchVirtualAccountPayload,
} from './types';

var morx = require('morx');
var q = require('q');
const axios = require('axios');

var spec = morx
  .spec()
  .build('batch_id', 'required:true, eg:-RND_1511587942807439')
  .end();

retrieve_bulk.morxspc = spec;

export default function retrieve_bulk(
  data: FetchBatchVirtualAccountPayload,
  _rave: RaveBase,
): Promise<BatchVirtualAccountResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Fetch-bulk-virtual-account',
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
      params.method = 'GET';
      var uri = `v3/bulk-virtual-account-numbers/${params.batch_id}`;

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
	