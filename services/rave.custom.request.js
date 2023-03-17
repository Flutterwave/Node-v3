// var morx = require('morx');

// var q = require('q');

// function newRefund(path, data, _rave) {
//   var d = q.defer();

//   q.fcall(() => {
//     path = path || 'NO PATH PASSED, PLEASE PASS A VALID PATH';

//     if (path == 'NO PATH PASSED, PLEASE PASS A VALID PATH') {
//       throw path;
//     }

//     return _rave.request(path, data);
//   })
//     .then((response) => {
//       d.resolve(response);
//     })
//     .catch((err) => {
//       d.reject(err);
//     });

//   return d.promise;
// }

// module.exports = newRefund;
