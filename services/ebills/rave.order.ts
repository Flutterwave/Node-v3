import RaveBase from '../../lib/rave.base';
import { eBillPayload, BillResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

const spec = morx
  .spec()
  .build('email', 'required:true, eg:044')
  .build('tx_ref', 'required:true, eg:MC-06900021')
  .build('ip', 'required:true, eg:127.9.0.7')
  .build('custom_business_name', 'required:true, eg:John Madakin')
  .build('amount', 'required:true, eg:10')
  .build('currency', 'required:true,eg:NGN')
  .build('country', 'required:true,eg:NG')
  .build('number_of_units', 'required:true, e.g:1')
  .build('phone_number', 'required:true,eg:09384747474')
  .end();

order_ebills.morxspc = spec;

export default function order_ebills(
  data: eBillPayload,
  _rave: RaveBase,
): Promise<BillResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: process.env.npm_package_version,
      title: 'Incoming call',
      message: 'Create eBills',
    },
  );

  const d = q.defer();
  q.fcall(() => {
    const validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    const params = validated.params;
    // _rave.params = params
    return params;
  })
    .then((params: any) => {
      // console.log(params)
      return _rave.request('v3/ebills', params);
    })
    .then((resp: any) => {
      d.resolve(resp.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
