import RaveBase from '../../lib/rave.base';
import { IDPayload } from '../../utils/types';
import { VerifyTransactionResponse } from './types';

const morx = require('morx');

const q = require('q');

const spec = morx
  .spec()

  .build('id', 'required:true, eg:akhlm-pstmn-blkchrge-xx6')
  .end();

verify_trans.morxspc = spec;

export default function verify_trans(
  data: IDPayload,
  _rave: RaveBase,
): Promise<VerifyTransactionResponse> {
  var d = q.defer();

  q.fcall(() => {
    // console.log("hellooo", data);

    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    // console.log(validated)
    var params = {};
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      params.method = 'GET';
      return _rave.request(`v3/transactions/${params.id}/verify`, params);
    })
    .then((response: any) => {
      d.resolve(response.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
