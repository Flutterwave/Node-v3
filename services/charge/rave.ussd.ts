import RaveBase from '../../lib/rave.base';
import { NGBanksPayload, UssdChargeResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');


var spec = morx
  .spec()
  .build(
    'account_bank',
    'required:true,validators:isNumeric, eg:5590131743294314',
  )
  .build('currency', 'required:true, eg:NGN')
  .build('order_id', 'required:false')
  .build('amount', 'required:true, eg:10')
  .build('phone_number', 'required:false, eg:08030930236')
  .build('email', 'required:true, eg:debowalefaulkner@gmail.com')
  .build('fullname', 'required:false, eg:lawal garba')
  .build('client_ip', 'required:false, eg:127.0.0.1')
  .build('tx_ref', 'required:true, eg:FLW_y-443342')
  .build('meta', 'required:false')
  .build('subaccounts', 'required:false')
  .build('device_fingerprint', 'required:false')
  .end();

ussd_Charge.morxspc = spec;

export default function ussd_Charge(data: NGBanksPayload, _rave: RaveBase): Promise<UssdChargeResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: process.env.npm_package_version,
      title: 'Incoming call',
      message: 'Initiate USSD charge',
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
      return _rave.request('v3/charges?type=ussd', params);
    })
    .then((response: any) => {
      d.resolve(response.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
