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
import {
  AmountToBePaidPayload,
  CreateBillPayload,
  CreateBulkBillPayload,
  CreateOrdBillingPayload,
  FetchBillsPayload,
  GetBillingCategoriesPayload,
  ValidateBillingPayload,
} from '../services/bills/types';

// const get_a_recurring = require('../services/bills/rave.get-a-recurring-bill')
// const get_recurring_bills = require ('../services/bills/rave.get.recurrings-bills')

/**
 * This section details all APIs endpoints needed to purchase bill payments. Supported Bill Payments include - Airtime, Data purchase, Electricity bills, Cable bills and Government remittance.
 *
 * For the best experience, We recommend reading the overview first.
 *
 * @link https://developer.flutterwave.com/docs/making-payments/bill-payments
 */
export default class Bills {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }

  /**
   * This method allows you to initiate the bill payment. You can create Airtime, Data, Cable, Power, Toll and other bill payment you need.
   * Kindly note that your balance should be funded as your wallet would be debited for successful API calls.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/bills#create-a-bill-payment
   */
  create_bill(data: CreateBillPayload) {
    return createbill(data, this.rave);
  }
  /**
   * This methods gets the amount to be paid for a product
   *
   * @link https://developer.flutterwave.com/reference/endpoints/remita/#get-amount-to-be-paid-for-a-product
   */
  amt_to_be_paid(data: AmountToBePaidPayload) {
    return amount_to_be_paid(data, this.rave);
  }
  /**
   * This methods creates bulk bills payment
   *
   * This methods creates bulk bills payment
   *
   * @link https://developer.flutterwave.com/reference/endpoints/bills#create-bulk-bills
   */
  create_bulk(data: CreateBulkBillPayload) {
    return create_bulk(data, this.rave);
  }

  /**
   * This method creates an order using the biller code and the product code
   *
   * @link https://developer.flutterwave.com/reference/endpoints/remita/#create-order-using-billing-code-and-product-code
   */
  create_ord_billing(data: CreateOrdBillingPayload) {
    return create_order_billing(data, this.rave);
  }

  /**
   * This method retrieves a history of all purchased bill services including commission earned
   *
   * @link https://developer.flutterwave.com/reference/endpoints/bills#get-bill-payments
   */
  fetch_bills(data?: FetchBillsPayload) {
    return bills(data || {}, this.rave);
  }

  /**
   * This method helps developers to retrieve the information for each Biller. These information are important as they are required for the bill payment attempt.
   * You can filter your query by biller type and biller_code.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/bills#get-bill-categories
   */
  fetch_bills_Cat(data?: GetBillingCategoriesPayload) {
    return bill_cat(data || {}, this.rave);
  }
  /**
   * This method shows you how to get all government agencies you can pay into
   *
   * @link https://developer.flutterwave.com/reference/endpoints/remita/#get-bill-payment-agencies
   */
  fetch_bills_agencies(data?: any) {
    return bill_agencies(data, this.rave);
  }
  /**
   * This method shows you how to get the status of a bill purchase
   *
   * @link https://developer.flutterwave.com/reference/endpoints/bills#get-status-of-a-bill-payment
   */
  fetch_status(data: {
    /**
     * This is the tx_ref of the bill transaction
     */
    reference: string;
  }) {
    return status(data, this.rave);
  }
  /**
   * This method shows you how to to get all products under a government agency.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/remita/#get-products-under-an-agency
   */
  products_under_agency(data: { reference: string }) {
    return prdts_under_agency(data, this.rave);
  }

  /**
   * This method shows you how to create an order using the biller code and the product Id
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/remita/#update-bills-order
   */
  update_bills(data: { reference: string }) {
    return update_bills_order(data, this.rave);
  }
  /**
   * This method shows you how to validate services like DSTV smartcard no, Meter number etc.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/bills#validate-a-bill-service
   */
  validate(data: ValidateBillingPayload) {
    return validate_bill(data, this.rave);
  }
}
