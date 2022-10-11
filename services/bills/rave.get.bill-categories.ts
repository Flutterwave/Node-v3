const axios = require('axios');
import RaveBase from '../../lib/rave.base';
import { BillingCategoryResponse, GetBillingCategoriesPayload } from './types';

const morx = require('morx');
const q = require('q');

var spec = morx
  .spec()

  .end();

bill_cat.morxspc = spec;

export default function bill_cat(
  data: GetBillingCategoriesPayload,
  _rave: RaveBase,
): Promise<BillingCategoryResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: process.env.npm_package_version,
      title: 'Incoming call',
      message: 'Get-bill-category',
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
      // params.seckey = _rave.getSecretKey();
      params.method = 'GET';
      var uri = `v3/bill-categories`;

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
