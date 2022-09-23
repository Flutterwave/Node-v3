import RaveBase from './rave.base';
import amount_to_be_paid from '../services/bills/rave.amount.to-be-paid';
import createbill from '../services/bills/rave.create-bill.payment';
import create_bulk from '../services/bills/rave.create-bulk.bills';
import create_order_billing from '../services/bills/rave.create-order-billing-code';
import bills from '../services/bills/rave.get-bill-payments';
import bill_cat from '../services/bills/rave.get.bill-categories';
import bill_agencies from '../services/bills/rave.get.bill-payment-agencies';
import status from '../services/bills/rave.get.status';
import update_bills_order from '../services/bills/rave.update-bills.order';
import prdts_under_agency from '../services/bills/rave.update-bills.order';
import validate_bill from '../services/bills/rave.validate-bill';
import { AmountToBePaidPayload, CreateBillPayload, CreateBulkBillPayload, CreateOrdBillingPayload, FetchBillsPayload, ValidateBillingPayload } from '../services/bills/types';

// const get_a_recurring = require('../services/bills/rave.get-a-recurring-bill')
// const get_recurring_bills = require ('../services/bills/rave.get.recurrings-bills')

export default class Bills {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }
  create_bill(data: CreateBillPayload) {
    return createbill(data, this.rave);
  }

  amt_to_be_paid(data: AmountToBePaidPayload) {
    return amount_to_be_paid(data, this.rave);
  }

  create_bulk(data: CreateBulkBillPayload) {
    return create_bulk(data, this.rave);
  }

  create_ord_billing(data: CreateOrdBillingPayload) {
    return create_order_billing(data, this.rave);
  }

  fetch_bills(data: FetchBillsPayload) {
    return bills(data, this.rave);
  }

  fetch_bills_Cat() {
    return bill_cat({}, this.rave);
  }
  fetch_bills_agencies(data?: any) {
    return bill_agencies(data, this.rave);
  }
  fetch_status(data: {reference: string}) {
    return status(data, this.rave);
  }
  products_under_agency(data:{ reference: string }) {
    return prdts_under_agency(data, this.rave);
  }

  update_bills(data:{ reference: string }) {
    return update_bills_order(data, this.rave);
  }

  validate(data: ValidateBillingPayload) {
    return validate_bill(data, this.rave);
  }
}
