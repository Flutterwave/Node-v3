import RaveBase from '../../lib/rave.base';
import { GetCardsResponse } from './type';

const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

var spec = morx
  .spec()

  .end();

retrieve_all_Cards.morxspc = spec;

export default function retrieve_all_Cards(data: any, _rave: RaveBase): Promise<GetCardsResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'List-all-cards',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(spec, data, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      params.method = 'GET';
      var uri = `v3/virtual-cards`;

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