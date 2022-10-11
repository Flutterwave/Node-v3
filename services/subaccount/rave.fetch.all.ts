import RaveBase from '../../lib/rave.base';
import { FetchSubAccountsPayload, FetchSubAccountsResponse } from './types';

const morx = require('morx');
const q = require('q');
const path = require('path');
const axios = require('axios');

var spec = morx
  .spec()

  .end();

get_all.morxspc = spec;

export default function get_all(
  data: FetchSubAccountsPayload,
  _rave: RaveBase,
): Promise<FetchSubAccountsResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'List all Subaccounts',
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
      var uri = `/v3/subaccounts?`;

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
