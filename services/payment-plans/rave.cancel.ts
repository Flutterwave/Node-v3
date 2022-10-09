import RaveBase from "../../lib/rave.base";
import { SinglePaymentPayload, SinglePaymentResponse } from "./types";

const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = morx
  .spec()
  .build('id', 'required:true, eg:a1b7864f-c56d-4453-bf55-a08db4acb5fe')
  .end();

  cancel_plan.morxspc = spec;

export default function cancel_plan(data: SinglePaymentPayload, _rave:RaveBase): Promise<SinglePaymentResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Cancel Payment plan',
    },
  );

  const d = q.defer();

  q.fcall(() => {
    const validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    const params = validated.params;

    return params;
  })
    .then((params: any) => {
      params.method = 'PUT';
      var uri = `v3/payment-plans/${params.id}/cancel`;

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
