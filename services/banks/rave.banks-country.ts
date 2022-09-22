import RaveBase from '../../lib/rave.base';
import { BankResponse } from './types';

var morx = require('morx');
var q = require('q');
const axios = require('axios');
const jsonpackage = require('../../package.json');

var spec = morx.spec().build('country', 'required:true, eg:NG').end();

banks_country.morxspc = spec;

export default function banks_country(
  data: any,
  _rave: RaveBase,
): Promise<BankResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: jsonpackage.version,
      title: 'Incoming call',
      message: 'Get Bank by Country',
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
      var uri = `v3/banks/${params.country}`;

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
