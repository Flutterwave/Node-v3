var q = require('q');
const querystring = require('querystring');
var RaveUtils = require('../utils/rave.utils');
var Security = require('./security');

var RaveBase = function (public_key, secret_key, _base_url) {
  RaveUtils.emptyCheck(public_key, 'Public Key required');
  RaveUtils.emptyCheck(secret_key, 'Secret Key required');

  var public_key = public_key;
  var secret_key = secret_key;
  var base_url = 'https://api.flutterwave.com/';

  // Override BaseURL
  if (_base_url && typeof _base_url === 'string') {
    base_url = _base_url;
  }

  this.getPublicKey = function () {
    return public_key;
  };

  this.getSecretKey = function () {
    return secret_key;
  };

  this.getBaseUrl = function () {
    return base_url;
  };

  this.setBaseUrl = function (new_base_url) {
    if (new_base_url) {
      base_url = new_base_url;
    }
  };

  this.request = function (path, payload, callback) {
    var requestOptions = {};
    var requestMethod = RaveUtils.initDefaultValue(
      payload.method,
      'POST' || 'PUT',
    );
    var datakey = requestMethod == 'POST' || 'PUT' ? 'body' : 'qs';
    var requestJSON = datakey == 'body' ? true : false;
    var includeQueryParams = RaveUtils.initDefaultValue(
      payload.excludeQuery,
      false,
    );

    // Build URL
    let fullUrl = this.getBaseUrl() + path;

    // Prepare request options for fetch
    const fetchOptions = {
      method: requestMethod,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getSecretKey()}`,
      },
    };

    // Handle query parameters for GET requests
    if (requestMethod === 'GET') {
      delete payload.method;
      if (!includeQueryParams) {
        delete payload.excludeQuery;
        const queryParams = querystring.stringify(payload);
        if (queryParams) {
          fullUrl += fullUrl.includes('?') ? '&' : '?';
          fullUrl += queryParams;
        }
      }
    } else {
      // Handle request body for non-GET requests
      if (Object.keys(payload).length > 0) {
        // Remove method and excludeQuery properties before sending
        const payloadCopy = { ...payload };
        delete payloadCopy.method;
        delete payloadCopy.excludeQuery;
        fetchOptions.body = JSON.stringify(payloadCopy);
      }
    }

    // Store original options for legacy compatibility
    requestOptions.uri = path;
    requestOptions.baseUrl = this.getBaseUrl();
    requestOptions.method = requestMethod;
    requestOptions[datakey] = RaveUtils.initDefaultValue(payload, {});
    requestOptions.json = requestJSON;
    requestOptions.headers = fetchOptions.headers;

    if (callback) {
      this._makeRequest(fullUrl, fetchOptions, callback);
      return requestOptions;
    } else {
      return this._makePromiseRequest(fullUrl, fetchOptions);
    }
  };
};

RaveBase.prototype.encrypt = function (data) {
  var encryption_key = Security.getEncryptionKey(this.getSecretKey());
  return Security.encrypt(encryption_key, JSON.stringify(data));
};

RaveBase.prototype.getIntegrityHash = function (data) {
  return Security.getIntegrityHash(
    data,
    this.getPublicKey(),
    this.getSecretKey(),
  );
};

RaveBase.prototype._makeRequest = function (url, fetchOptions, callback) {
  fetch(url, fetchOptions)
    .then((response) => {
      const res = {
        statusCode: response.status,
        headers: Object.fromEntries(response.headers.entries()),
      };

      return response
        .json()
        .then((body) => {
          callback(null, res, body);
        })
        .catch((err) => {
          return response.text().then((textBody) => {
            callback(null, res, textBody || {});
          });
        });
    })
    .catch((err) => {
      callback(err, {}, {});
    });
};

RaveBase.prototype._makePromiseRequest = function (url, fetchOptions) {
  return new Promise((resolve, reject) => {
    fetch(url, fetchOptions)
      .then((response) => {
        const res = {
          statusCode: response.status,
          headers: Object.fromEntries(response.headers.entries()),
        };

        return response
          .json()
          .then((body) => {
            resolve({ res, body });
          })
          .catch((err) => {
            return response.text().then((textBody) => {
              resolve({ res, body: textBody || {} });
            });
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = RaveBase;
