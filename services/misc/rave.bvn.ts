import RaveBase from '../../lib/rave.base';
import { BVNPayload, BVNResponse } from './types';

var morx = require('morx');
var q = require('q');
const axios = require('axios');

var spec = morx.spec().build('bvn', 'required:true, eg:123456789').end();

bankBVN.morxspc = spec;

export default function bankBVN(
  data: BVNPayload,
  _rave: RaveBase,
): Promise<BVNResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: process.env.npm_package_version,
      title: 'Incoming call',
      message: 'BVN verification',
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
      var uri = `v3/kyc/bvns/${params.bvn}`;

      return _rave.request(uri, params);
    })
    .then((response: any) => {
      d.resolve(response.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
