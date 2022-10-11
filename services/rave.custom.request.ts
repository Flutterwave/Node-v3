import RaveBase from '../lib/rave.base';

var morx = require('morx');

var q = require('q');

export default function newRefund(path: string, data: Object, _rave: RaveBase) {
  var d = q.defer();

  q.fcall(() => {
    path = path || 'NO PATH PASSED, PLEASE PASS A VALID PATH';

    if (path == 'NO PATH PASSED, PLEASE PASS A VALID PATH') {
      throw path;
    }

    return _rave.request(path, data);
  })
    .then((response: any) => {
      d.resolve(response);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
