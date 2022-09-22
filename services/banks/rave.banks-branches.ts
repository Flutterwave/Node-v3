import axios from 'axios';
import RaveBase from '../../lib/rave.base';
import { BranchResponse } from './types';

const morx = require('morx');
const q = require('q');
const jsonpackage = require('../../package.json');

// console.log(package.version)

const spec = morx.spec().build('id', 'required:true, eg:133').end();
banks_branches.morxspc = spec;

export function banks_branches(
  data: { id: number },
  _rave: RaveBase,
): Promise<BranchResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: jsonpackage.version,
      title: 'Incoming call',
      message: 'Get Bank branches',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT, {
      throw_error: true,
    });
    var params = validated.params;
    return params;
  })
    .then((params: any) => {
      params.method = 'GET';
      var uri = `v3/banks/${params.id}/branches`;

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
