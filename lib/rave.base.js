var q = require('q');
var RaveUtils = require('./rave.utils');
var Request = require('request');
var Security = require('./security');
var RaveBase = function (public_key, secret_key, _base_url) {
	RaveUtils.emptyCheck(public_key, 'Public Key required');
	RaveUtils.emptyCheck(secret_key, 'Secret Key required');

	var public_key = public_key;
	var secret_key = secret_key;
	
	// var base_url      = 'https://rave-api-v2.herokuapp.com/';
	var base_url      = 'https://api.flutterwave.com/';


	// var base_url='https://ravesandboxapi.flutterwave.com';
	// var prod_url='https://ravesandboxapi.flutterwave.com'
	
	// Override BaseURL 	
	if (_base_url && typeof _base_url === 'string') {
		base_url = _base_url;
	}

	this.MORX_DEFAULT = {
		throw_error: true
	};

	this.getPublicKey = function () {
		return public_key;
	}

	this.getSecretKey = function () {
		return secret_key;
	}

	this.getBaseUrl = function () {
		return base_url;
	}

	this.setBaseUrl = function (new_base_url) {
		if (new_base_url) {
			base_url = new_base_url;
		}
	}

	this.request = function (path, payload, callback) {

		var requestOptions = {};
		var requestMethod = RaveUtils.initDefaultValue(payload.method, 'POST' || 'PUT');
		var datakey = requestMethod == 'POST' || 'PUT' ? 'body' : 'qs';
		var requestJSON = datakey == 'body' ? true : false;
		// console.log(payload)
		requestOptions.uri = path;
		requestOptions.baseUrl = this.getBaseUrl();
		requestOptions.method = requestMethod;
		requestOptions[datakey] = RaveUtils.initDefaultValue(payload, {});
		requestOptions.json = requestJSON;
		requestOptions.headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${this.getSecretKey()}`
		};

		// console.log(requestOptions)
		if (callback) {
			this._makeRequest(requestOptions, callback);
			return requestOptions;
		} else {
			return this._makePromiseRequest(requestOptions);
		}

	}

}

RaveBase.prototype.encrypt = function (data) {

	var encryption_key = Security.getEncryptionKey(this.getSecretKey());
	return Security.encrypt(encryption_key, JSON.stringify(data));

}

RaveBase.prototype.getIntegrityHash = function (data) {
	return Security.getIntegrityHash(data, this.getPublicKey(), this.getSecretKey());
}


RaveBase.prototype._makeRequest = function (requestOptions, callback) {
	Request(requestOptions,
		function (err, res, body) {
			if (typeof res == "undefined") {
				res = {};
			}

			if (typeof body == 'undefined') {
				body = {};
			}
			callback(err, res, body);
		}
	);
}

RaveBase.prototype._makePromiseRequest = function (requestOptions) {
	var self = this;
	return new Promise(function (resolve, reject) {
		self._makeRequest(requestOptions, function (err, res, body) {
			if (err) {
				reject(err);
			} else {
				resolve(res, body);
			}
		});
	});
};


module.exports = RaveBase;
