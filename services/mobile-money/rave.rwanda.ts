import RaveBase from '../../lib/rave.base';
import { MobileMoneyPayload } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

var spec = morx
  .spec()
  .build('currency', 'required:true, eg:GHS')
  .build('order_id', 'required:true,eg:USS_URG_893982923s2323')
  .build('amount', 'required:true, eg:10')
  .build('phone_number', 'required:false, eg:08030930236')
  .build('email', 'required:true, eg:debowalefaulkner@gmail.com')
  .build('fullname', 'required:false, eg:lawal')
  .build('client_ip', 'required:false, eg:127.0.0.1')
  .build('tx_ref', 'required:true, eg:FLW_y-443342')
  .build('meta', 'required:false')
  .build('device_fingerprint', 'required:false')
  .build('redirect_url', 'required:false')
  .end();
rw.morxspc = spec;

export default function rw(data: MobileMoneyPayload, _rave: RaveBase) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Initiate Rwanda Mobile Money charge',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      return _rave.request('v3/charges?type=mobile_money_rwanda', params);
    })
    .then((response: any) => {
      d.resolve(response.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
