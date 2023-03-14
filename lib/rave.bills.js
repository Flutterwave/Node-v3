const amount_to_be_paid = require('../services/bills/rave.amount.to-be-paid');
const createbill = require('../services/bills/rave.create-bill.payment');
const create_bulk = require('../services/bills/rave.create-bulk.bills');
const create_order_billing = require('../services/bills/rave.create-order-billing-code');
// const get_a_recurring = require('../services/bills/rave.get-a-recurring-bill')
const bills = require('../services/bills/rave.get-bill-payments');
const bill_cat = require('../services/bills/rave.get.bill-categories');
const bill_agencies = require('../services/bills/rave.get.bill-payment-agencies');
// const get_recurring_bills = require ('../services/bills/rave.get.recurrings-bills')
const status = require('../services/bills/rave.get.status');
const prdts_under_agency = require('../services/bills/rave.products-under-an-agency');
const update_bills_order = require('../services/bills/rave.update-bills.order');
const validate_bill = require('../services/bills/rave.validate-bill');

function Bills(RaveBase) {
  this.create_bill = function (data) {
    return createbill(data, RaveBase);
  };

  this.amt_to_be_paid = function (data) {
    return amount_to_be_paid(data, RaveBase);
  };

  this.create_bulk = function (data) {
    return create_bulk(data, RaveBase);
  };

  this.create_ord_billing = function (data) {
    return create_order_billing(data, RaveBase);
  };

  this.fetch_bills = function (data) {
    return bills(data, RaveBase);
  };

  this.fetch_bills_Cat = function (data) {
    return bill_cat(data, RaveBase);
  };
  this.fetch_bills_agencies = function (data) {
    return bill_agencies(data, RaveBase);
  };
  this.fetch_status = function (data) {
    return status(data, RaveBase);
  };
  this.products_under_agency = function (data) {
    return prdts_under_agency(data, RaveBase);
  };

  this.update_bills = function (data) {
    return update_bills_order(data, RaveBase);
  };

  this.validate = function (data) {
    return validate_bill(data, RaveBase);
  };
}
module.exports = Bills;
