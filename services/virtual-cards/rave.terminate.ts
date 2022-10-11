import RaveBase from '../../lib/rave.base';
import { IDPayload } from '../../utils/types';
import { BlockUnblockCardResponse } from './type';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

var spec = morx
  .spec()
  .build('id', 'required:true, eg:a1b7864f-c56d-4453-bf55-a08db4acb5fe')
  .end();

terminate_card.morxspc = spec;

export default function terminate_card(
  data: IDPayload,
  _rave: RaveBase,
): Promise<BlockUnblockCardResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Delete-card',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;
    // _rave.params = params
    // console.log(params)
    return params;
  })
    .then((params: any) => {
      // params.seckey = _rave.getSecretKey();
      params.method = 'PUT';
      var uri = `v3/virtual-cards/${params.id}/terminate`;

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
