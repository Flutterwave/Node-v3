import RaveBase from '../../lib/rave.base';
import { CreateAccountPayload, CreateBulkResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

const spec = morx
  .spec()

  .build('email', 'required:true, eg:ade_temi@icloud.com')
  .build('is_permanent', 'required:false, eg:true')
  .build('bvn', 'required:false, eg:12345678901')
  .build('accounts', 'required:false, eg:5')
  .build('tx_ref', 'required:true, eg:jhn-mdkn-10192029920')
  .build('amount', 'required:false, eg:5000')
  .end();

create_bulk_account.morxspc = spec;

export default function create_bulk_account(
  data: CreateAccountPayload,
  _rave: RaveBase,
): Promise<CreateBulkResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Create-bulk-virtual-account',
    },
  );

  const d = q.defer();

  q.fcall(() => {
    const validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    const params = validated.params;

    return params;
  })
    .then((params: any) => {
      params.method = 'POST';
      return _rave.request('v3/bulk-virtual-account-numbers', params);
    })
    .then((response: any) => {
      // console.log(response);
      d.resolve(response.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
