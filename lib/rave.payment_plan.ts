import retrieve_all from '../services/beneficiaries/rave.retrieve';
import cancel_plan from '../services/payment-plans/rave.cancel';
import create_plan from '../services/payment-plans/rave.create';
import retrieve_single from '../services/payment-plans/rave.retrieve.single';
import update_plan from '../services/payment-plans/rave.update';
import {
  SinglePaymentPayload,
  CreatePaymentPayload,
  GetPaymentsPayload,
  UpdatePaymentPayload,
} from '../services/payment-plans/types';
import RaveBase from './rave.base';

export default class Payment_plan {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }
  create(data: CreatePaymentPayload) {
    return create_plan(data, this.rave);
  }

  cancel(data: SinglePaymentPayload) {
    return cancel_plan(data, this.rave);
  }
  get_all(data?: GetPaymentsPayload) {
    return retrieve_all(data || {}, this.rave);
  }
  get_plan(data: SinglePaymentPayload) {
    return retrieve_single(data, this.rave);
  }
  update(data: UpdatePaymentPayload) {
    return update_plan(data, this.rave);
  }
}
