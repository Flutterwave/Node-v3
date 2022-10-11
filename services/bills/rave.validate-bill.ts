import RaveBase from '../../lib/rave.base';
import { ValidateBillingPayload, ValidateBillResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');


const spec = morx
  .spec()
  .build('code', 'required:true, eg:BIL099')
  .build('item_code', 'required:true, eg:AT099')
  .build('customer', 'required:true, eg:08038291822')
  .end();

validate_bill.morxspc = spec;

export default function validate_bill(data: ValidateBillingPayload, _rave: RaveBase): Promise<ValidateBillResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: process.env.npm_package_version,
      title: 'Incoming call',
      message: 'Validate Bill',
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
      return _rave.request(
        `v3/bill-items/${params.item_code}/validate?code=${params.code}&customer=${params.customer}`,
        params,
      );
    })
    .then((resp: any) => {
      d.resolve(resp.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
