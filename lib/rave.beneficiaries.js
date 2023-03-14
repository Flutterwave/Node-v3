const create_beneficiary = require('../services/beneficiaries/rave.create');
const del_beneficiary = require('../services/beneficiaries/rave.delete');
const retrieve_all = require('../services/beneficiaries/rave.retrieve');
const retrieve = require('../services/beneficiaries/rave.single.retrieve');

function Beneficiaries(RaveBase) {
  this.create = function (data) {
    return create_beneficiary(data, RaveBase);
  };

  this.delete = function (data) {
    return del_beneficiary(data, RaveBase);
  };
  this.fetch_all = function (data) {
    return retrieve_all(data, RaveBase);
  };
  this.fetch = function (data) {
    return retrieve(data, RaveBase);
  };
}
module.exports = Beneficiaries;
