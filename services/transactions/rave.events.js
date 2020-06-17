const morx = require('morx');
const q = require('q');




var spec = morx.spec()

    .build('id', 'required:true, eg:957764')
    .end();

function service(data, _rave) {


    var d = q.defer();

    q.fcall(() => {
           
            var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
         
            var params = {}
            var params = validated.params;

            return params;


        })
        .then(params => {



            // params.seckey = _rave.getSecretKey();
            params.method = "GET"
            return _rave.request(`v3/transactions/${params.id}/events`, params)
        })
        .then(response => {

            // console.log(response);
            d.resolve(response.body);


        })
        .catch(err => {

            d.reject(err);

        })

    return d.promise;



}
service.morxspc = spec;
module.exports = service;