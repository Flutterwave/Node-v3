import axios from 'axios';
import RaveBase from '../../lib/rave.base';
import { AmountToBePaidPayload, AmountToBePaidResponse } from './types';

const morx = require('morx');
const q = require('q');


const spec = morx
  .spec()
  .build('id', 'required:true, eg:BIL136')
  .build('product_id', 'required:true, eg:AT152')
  .end();

amount_to_be_paid.morxspc = spec;

export default function amount_to_be_paid(data: AmountToBePaidPayload, _rave: RaveBase): Promise<AmountToBePaidResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: process.env.npm_package_version,
      title: 'Incoming call',
      message: 'Amount-to-be-paid',
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
        `v3/billers/${params.id}/products/${params.product_id}`,
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
