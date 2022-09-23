import axios from 'axios';
import RaveBase from '../../lib/rave.base';
import { DeleteBeneficiaryResponse } from './types';

const morx = require('morx');
const q = require('q');

const spec = morx
  .spec()
  .build('id', 'required:true, eg:a1b7864f-c56d-4453-bf55-a08db4acb5fe')
  .end();

del_beneficiary.morxspc = spec;

export default function del_beneficiary(data: {id: string}, _rave: RaveBase): Promise<DeleteBeneficiaryResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: process.env.npm_package_version,
      title: 'Incoming call',
      message: 'Delete Beneficiary',
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
      params.method = 'DELETE';
      var uri = `v3/beneficiaries/${params.id}`;

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
