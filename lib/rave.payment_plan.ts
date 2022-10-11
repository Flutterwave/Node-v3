import retrieve_all from '../services/beneficiaries/rave.retrieve';
import cancel_plan from '../services/payment-plans/rave.cancel';
import create_plan from '../services/payment-plans/rave.create';
import retrieve_single from '../services/payment-plans/rave.retrieve.single';
import update_plan from '../services/payment-plans/rave.update';
import {
  CreatePaymentPayload,
  GetPaymentsPayload,
  UpdatePaymentPayload,
} from '../services/payment-plans/types';
import { IDPayload } from '../utils/types';
import RaveBase from './rave.base';

/**
 * This section describes how merchants and developers can create and manage their respective payment plans.
 */
export default class Payment_plan {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }
  /**
   * This section describes how to create a payment plan with Flutterwave.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/payment-plans#create-payment-plan
   */
  create(data: CreatePaymentPayload) {
    return create_plan(data, this.rave);
  }
  /**
   * This endpoint help the merchant/developer cancel an existing payment plan.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/payment-plans#cancel-a-payment-plan
   */
  cancel(data: IDPayload) {
    return cancel_plan(data, this.rave);
  }

  /**
   * This section describes how to fetch all payment plans on your account.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/payment-plans#get-payment-plans
   */
  get_all(data?: GetPaymentsPayload) {
    return retrieve_all(data || {}, this.rave);
  }

  /**
   * This section describes how to get a single payment plan
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/payment-plans#get-a-payment-plan
   */
  get_plan(data: IDPayload) {
    return retrieve_single(data, this.rave);
  }

  /**
   * This endpoint help the merchant/developer update an existing payment plan.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/payment-plans#update-a-payment-plan
   */
  update(data: UpdatePaymentPayload) {
    return update_plan(data, this.rave);
  }
}
