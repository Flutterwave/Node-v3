import RaveBase from '../../lib/rave.base';
import { CreateTransferPayload, TransferResponse } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = morx
  .spec()
  .build('account_bank', 'required:true, eg:044')
  .build('account_number', 'required:true,validators:isNumeric, eg:06900021')
  .build('amount', 'required:true, eg:10')
  .build('narration', 'required:false,eg:New transfer')
  .build('currency', 'required:true,eg:NGN')
  .build('debit_currency', 'required:false, e.g:NGN')
  .build('reference', 'required:required,eg:mk-902837-jk')
  .build('destination_branch_code', 'required:false')
  .build('beneficiary', 'required:false')
  .build('beneficiary_name', 'required:false')
  .build('callback_url', 'required:false')
  .build('debit_currency', 'required:false')
  .build('meta', 'required:false')
  .end();

initiate_transfer.morxspc = spec;

export default function initiate_transfer(
  data: CreateTransferPayload,
  _rave: RaveBase,
): Promise<TransferResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Initiate-transfer',
    },
  );

  var d = q.defer();
  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params) => {
      return _rave.request('v3/transfers', params);
    })
    .then((resp) => {
      d.resolve(resp.body);
    })
    .catch((err) => {
      d.reject(err);
    });

  return d.promise;
}
