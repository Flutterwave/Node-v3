"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.banks_branches = void 0;
const axios_1 = __importDefault(require("axios"));
const morx = require('morx');
const q = require('q');
const jsonpackage = require('../../package.json');
// console.log(package.version)
const spec = morx.spec().build('id', 'required:true, eg:133').end();
banks_branches.morxspc = spec;
function banks_branches(data, _rave) {
    axios_1.default.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
        publicKey: _rave.getPublicKey(),
        language: 'NodeJs v3',
        version: jsonpackage.version,
        title: 'Incoming call',
        message: 'Get Bank branches',
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
        params.method = 'GET';
        var uri = `v3/banks/${params.id}/branches`;
        return _rave.request(uri, params);
    })
        .then((response) => {
        d.resolve(response.body);
    })
        .catch((err) => {
        d.reject(err);
    });
    return d.promise;
}
exports.banks_branches = banks_branches;
