import RaveBase from '../../lib/rave.base';
import { SubscriptionPayload, SubscriptionResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

var spec = morx
  .spec()
  .build('email', 'required:false, eg:debowalefaulkner@gmail.com')
  // .build('plan', 'required:false, eg:3874')
  // .build('subscribed_from', 'required:false, eg:2020-01-01')
  // .build('subscribed_to', 'required:false, eg:2020-05-05')
  // .build('status', 'required:false, eg:active')
  .end();

fetch_one.morxspc = spec;

export default function fetch_one(data: SubscriptionPayload, _rave: RaveBase): Promise<SubscriptionResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Fetch a Subscription',
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
      var uri = `v3/subscriptions?email=${params.email}`;

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
