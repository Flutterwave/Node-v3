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
    .build('id', 'required:true, eg:a1b7864f-c56d-4453-bf55-a08db4acb5fe')
    .end();
del_beneficiary.morxspc = spec;
function del_beneficiary(data, _rave) {
    axios_1.default.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
        publicKey: _rave.getPublicKey(),
        language: 'NodeJs v3',
        version: jsonpackage.version,
        title: 'Incoming call',
        message: 'Delete Beneficiary',
    });
    var d = q.defer();
    q.fcall(() => {
        var validated = morx.validate(data, spec, _rave.MORX_DEFAULT, {
            throw_error: true,
        });
        var params = validated.params;
        return params;
    })
        .then((params) => {
        params.method = 'DELETE';
        var uri = `v3/beneficiaries/${params.id}`;
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
exports.default = del_beneficiary;
