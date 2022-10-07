import RaveBase from '../../lib/rave.base';
import { MobileMoneyPayload, MobileMoneyResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

var spec = morx
  .spec()
  .build('currency', 'required:true, eg:UGX')
  .build('amount', 'required:true, eg:10')
  .build('phone_number', 'required:true, eg:08030930236')
  .build('email', 'required:true, eg:debowalefaulkner@gmail.com')
  .build('fullname', 'required:false, eg:lawal')
  .build('client_ip', 'required:false, eg:127.0.0.1')
  .build('tx_ref', 'required:true, eg:FLW_y-443342')
  .build('meta', 'required:false')
  .build('device_fingerprint', 'required:false')
  .build('redirect_url', 'required:false')
  .end();

ug.morxspc = spec;

export default function ug(
  data: MobileMoneyPayload,
  _rave: RaveBase,
): Promise<MobileMoneyResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Initiate Uganda Mobile Money charge',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      return _rave.request('v3/charges?type=mobile_money_uganda', params);
    })
    .then((response: any) => {
      d.resolve(response.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
