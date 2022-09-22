"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const morx = require('morx');
const q = require('q');
const jsonpackage = require('../../package.json');
const spec = morx
    .spec()
    .build('account_number', 'required:true, eg:0690000034')
    .build('account_bank', 'required:true, eg:044')
    .build('beneficiary_name', 'required:true, eg:Flutterwave-Developers')
    .build('currency', 'required:false, eg:NGN')
    .end();
create_beneficiary.morxspc = spec;
function create_beneficiary(data, _rave) {
    axios_1.default.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
        publicKey: _rave.getPublicKey(),
        language: 'NodeJs v3',
        version: jsonpackage.version,
        title: 'Incoming call',
        message: 'Create Beneficiary',
    });
    const d = q.defer();
    q.fcall(() => {
        var validated = morx.validate(data, spec, _rave.MORX_DEFAULT, {
            throw_error: true,
        });
        var params = validated.params;
        return params;
    })
        .then((params) => {
        // params.seckey = _rave.getSecretKey();
        params.method = 'POST';
        var uri = `v3/beneficiaries`;
        return _rave.request(uri, params);
    })
        .then((response) => {
        // console.log(response.body);
        d.resolve(response.body);
    })
        .catch((err) => {
        d.reject(err);
    });
    return d.promise;
}
exports.default = create_beneficiary;
