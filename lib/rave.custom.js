var customRequest = require('../services/rave.custom.request');

function Custom(RaveBase) {

    this.custom = function (path, data) {

        return customRequest(path, data, RaveBase);
    }
}

module.exports = Custom;