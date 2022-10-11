import RaveBase from '../../lib/rave.base';
import { IDPayload } from '../../utils/types';
import { SinglePaymentResponse } from './types';

var morx = require('morx');
var q = require('q');
const axios = require('axios');

var spec = morx.spec().build('id', 'required:true, eg:3806').end();

retrieve_single.morxspc = spec;

export default function retrieve_single(
  data: IDPayload,
  _rave: RaveBase,
): Promise<SinglePaymentResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Fetch a Plan',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      params.method = 'GET';
      var uri = `v3/payment-plans/${params.id}`;

      return _rave.request(uri, params);
    })
    .then((response: any) => {
      // console.log(response.body);
      d.resolve(response.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
