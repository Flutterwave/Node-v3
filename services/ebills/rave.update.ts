import RaveBase from '../../lib/rave.base';
import { UpdateEBillsPayload, UpdateEBillsResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

const spec = morx
  .spec()
  .build('reference', 'required:true, eg:RVEBLS-F81CEEEE8218-73362')
  .build('amount', 'required:true, eg:10')
  .build('currency', 'required:true,eg:NGN')
  .end();

update_ebills.morxspc = spec;

export default function update_ebills(
  data: UpdateEBillsPayload,
  _rave: RaveBase,
): Promise<UpdateEBillsResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: process.env.npm_package_version,
      title: 'Incoming call',
      message: 'Update eBills details',
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
      params.method = 'PUT';
      // console.log(params)
      return _rave.request(`v3/ebills/${params.reference}`, params);
    })
    .then((resp: any) => {
      d.resolve(resp.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
