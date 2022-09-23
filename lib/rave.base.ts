import { Payload, RequestOptions } from '../utils/types';

var q = require('q');
var RaveUtils = require('./rave.utils');
var Request = require('request');
var Security = require('./security');

export default class RaveBase {
  
  constructor(public_key: string, secret_key: string, _base_url?: string) {
    this.public_key = public_key ;
    this.secret_key = secret_key ;
    this._base_url = _base_url ;
    RaveUtils.emptyCheck(public_key, 'Public Key required');
    RaveUtils.emptyCheck(secret_key, 'Secret Key required');
    // Override BaseURL
    if (_base_url && typeof _base_url === 'string') {
      this.base_url = _base_url;
    }
  }
  public_key: string;
  secret_key: string;
  _base_url?: string;

  // var base_url      = 'https://rave-api-v2.herokuapp.com/';
  base_url = 'https://api.flutterwave.com/';

  // var base_url='https://ravesandboxapi.flutterwave.com';
  // var prod_url='https://ravesandboxapi.flutterwave.com'

  MORX_DEFAULT = {
    throw_error: true,
  };

  getPublicKey() {
    return this.public_key;
  }

  getSecretKey() {
    return this.secret_key;
  }

  getBaseUrl() {
    return this.base_url;
  }

  setBaseUrl(new_base_url: string) {
    if (new_base_url) {
      this.base_url = new_base_url;
    }
  }

  request(path: string, payload: any, callback?: Function ) {
    let requestOptions: RequestOptions = {
      uri: path,
      baseUrl: '',
      method: "body",
      datakey: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getSecretKey()}`,
      },
      json: {},
      
    };

    var requestMethod = RaveUtils.initDefaultValue(
      payload.method,
      'POST' || 'PUT',
    );
    var datakey: 'body' | 'qs' = requestMethod == 'POST' || 'PUT' ? 'body' : 'qs';
    var requestJSON = datakey == 'body' ? true : false;
    requestOptions.baseUrl = this.getBaseUrl();
    requestOptions.method = requestMethod;
    requestOptions[datakey] = RaveUtils.initDefaultValue(payload, {});
    requestOptions.json = requestJSON;

    if (callback) {
      this._makeRequest(requestOptions, callback);
      return requestOptions;
    } else {
      return this._makePromiseRequest(requestOptions);
    }
  }
  encrypt (data: any) {
	var encryption_key = Security.getEncryptionKey(this.getSecretKey());
	return Security.encrypt(encryption_key, JSON.stringify(data));
  };
  getIntegrityHash (data: string) {
	return Security.getIntegrityHash(
	  data,
	  this.getPublicKey(),
	  this.getSecretKey(),
	);
  };
  _makeRequest (requestOptions: any, callback: Function) {
	Request(requestOptions, function (err: any, res: any, body: any) {
	  if (typeof res == 'undefined') {
		res = {};
	  }
  
	  if (typeof body == 'undefined') {
		body = {};
	  }
	  callback(err, res, body);
	});
  };

  _makePromiseRequest (requestOptions: any) {
	var self = this;
	return new Promise(function (resolve, reject) {
	  self._makeRequest(requestOptions, function (err: any, res: any, body: any) {
		if (err) {
		  reject(err);
		} else {
		  //@ts-ignore
		  resolve(res, body);
		}
	  });
	});
  };
}

