import RaveBase from '../../lib/rave.base';
import { FetchVirtualAccountPayload, VirtualAccountResponse } from './types';

var morx = require('morx');
var q = require('q');
const axios = require('axios');

var spec = morx
  .spec()
  .build('order_ref', 'required:true, eg:URF_1587941907402_6378835')
  .end();

retrieve.morxspc = spec;

export default function retrieve(
  data: FetchVirtualAccountPayload,
  _rave: RaveBase,
): Promise<VirtualAccountResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Fetch-virtual-account',
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
      var uri = `v3/virtual-account-numbers/${params.order_ref}`;

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
