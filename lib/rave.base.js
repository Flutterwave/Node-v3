const { default: axios } = require('axios');
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

  // this.MORX_DEFAULT = {
  //   throw_error: true,
  // };

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

  /**
   * @description Make a request to the Flutterwave API server.
   * @param {string} path - relative URL path to the target API endpoint.
   * @param {any} payload - request payload to be sent to the API.
   * @param {(err: Error | null, response?: AxiosResponse) => void} callback - callback function to be called after the request( optional ).
   * @returns {Promise<AxiosResponse>} - Promise object representing the response.
   */
  this.request = async function (path, payload, callback) {
    const axiosConfig = {};
    const requestMethod = RaveUtils.initDefaultValue(
      payload.method,
      'POST' || 'PUT',
    );
    const datakey =
      requestMethod === 'POST' || requestMethod === 'PUT' ? 'data' : 'params';
    const includeQueryParams = RaveUtils.initDefaultValue(
      payload.excludeQuery,
      false,
    );

    if (requestMethod === 'GET') {
      delete payload.method;
      if (includeQueryParams) {
        delete payload.excludeQuery;
        axiosConfig.url = path;
      } else {
        const queryParams = querystring.stringify(payload);
        axiosConfig.url = `${path}${queryParams}`;
      }
    } else {
      axiosConfig.url = path;
    }

    axiosConfig.baseURL = this.getBaseUrl();
    axiosConfig.method = requestMethod;
    axiosConfig[datakey] = RaveUtils.initDefaultValue(payload, {});
    axiosConfig.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getSecretKey()}`,
    };

    // console.log(axiosConfig);

    // make the request
    try {
      const response = await axios(axiosConfig);
      if (callback) callback(null, response);

      // make sure the response returns the `data` property as the `body` property
      // so as to be consistent with the `request` library
      response.body = response.data;
      return response;
    } catch (error) {
      if (callback) callback(error);
      throw error;
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

module.exports = RaveBase;
