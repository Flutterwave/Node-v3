import axios from 'axios';
import RaveBase from '../../lib/rave.base';
import { StatusResponse } from './types';

const morx = require('morx');
const q = require('q');


const spec = morx
  .spec()

  .build('reference', 'required:true, eg:BPUSSD1588268275502326')
  .end();

status.morxspc = spec;

export default function status(
  data: { reference: string },
  _rave: RaveBase,
): Promise<StatusResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: process.env.npm_package_version,
      title: 'Incoming call',
      message: 'Get-bill-status',
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
      return _rave.request(`v3/bills/${params.reference}`, params);
    })
    .then((resp: any) => {
      d.resolve(resp.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
