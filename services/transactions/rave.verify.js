const joi = require('joi');
const q = require('q');

const spec = joi.object({
  id: joi.string().required(),
});

function service(data, _rave) {
  var d = q.defer();

  q.fcall(() => {
    const { error, value } = spec.validate(data);
    var params = value;
    return params;
  })
    .then((params) => {
      params.method = 'GET';
      return _rave.request(`v3/transactions/${params.id}/verify`, params);
    })
    .then((response) => {
      d.resolve(response.body);
    })
    .catch((err) => {
      d.reject(err);
    });

  return d.promise;
}
service.morxspc = spec;
module.exports = service;
