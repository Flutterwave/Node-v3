import RaveBase from '../../lib/rave.base';
import { FLWResponse } from '../../utils/types';
import { WithdrawFromCardPayload } from './type';

const morx = require('morx');
const q = require('q');

var spec = morx
  .spec()
  .build('id', 'required:true, eg:a1b7864f-c56d-4453-bf55-a08db4acb5fe')
  .build('amount', 'required:true, eg:2000')
  .end();

withdraw_from_Card.morxspc = spec;

export default function withdraw_from_Card(
  data: WithdrawFromCardPayload,
  _rave: RaveBase,
): Promise<FLWResponse> {
  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      params.method = 'POST';
      var uri = `v3/virtual-cards/${params.id}/withdraw`;

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
