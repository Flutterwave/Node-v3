import RaveBase from '../../lib/rave.base';
import { UpdateBillOrderResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package_json = require('../../package.json');

const spec = morx
  .spec()
  .build('amount', 'required:true, eg:3000.50')
  .build('order_id', 'required:true, eg:BPUSSD1588268275502326')
  .build('reference', 'required:true, eg:FLWTTOT1024e200000029')
  .end();

update_bills_order.morxspc = spec;

export default function update_bills_order(
  data: { reference: string },
  _rave: RaveBase,
): Promise<UpdateBillOrderResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package_json.version,
      title: 'Incoming call',
      message: 'Update-bill-order',
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
      params.method = 'PUT';
      return _rave.request(`v3/product-orders/${params.reference}`, params);
    })
    .then((resp: any) => {
      d.resolve(resp.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
