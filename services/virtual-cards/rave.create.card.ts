import RaveBase from '../../lib/rave.base';
import { CreateCardPayload, CreateCardResponse } from './type';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

const spec = morx
  .spec()

  .build('currency', 'required:true, eg:USD')
  .build('amount', 'required:true, eg:100')
  .build('billing_name', 'required:true, eg:Mohammed Lawal')
  .build('billing_address', 'required:true, eg:DREAM BOULEVARD')
  .build('billing_city', 'required:true, eg:ADYEN')
  .build('billing_state', 'required:true, eg:NEW LANGE')
  .build('billing_postal_code', 'required:true, eg:293094')
  .build('billing_country', 'required:true, eg:US')
  .build('callback_url', 'required:false, eg:https://your-callback-url.com/')
  .end();

create_Card.morxspc = spec;

export default function create_Card(
  data: CreateCardPayload,
  _rave: RaveBase,
): Promise<CreateCardResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Create-card',
    },
  );

  var d = q.defer();
  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      return _rave.request('v3/virtual-cards', params);
    })
    .then((resp: any) => {
      d.resolve(resp.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
