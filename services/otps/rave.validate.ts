import RaveBase from '../../lib/rave.base';
import { ValidateOTPPayload } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

const spec = morx
  .spec()

  .build('reference', 'required:true, eg:CF-BARTER-20190420022611377491')
  .build('otp', 'required:true, eg:481208')
  .end();

validate_otp.morxspc = spec;

export default function validate_otp(
  data: ValidateOTPPayload,
  _rave: RaveBase,
): Promise<ValidateOTPPayload> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'OTP-validate',
    },
  );

  var d = q.defer();
  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      return _rave.request(`v3/otps/${params.reference}/validate`, params);
    })
    .then((resp: any) => {
      d.resolve(resp.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
