import {
  Currencies,
  FLWResponse,
  Intervals,
  PageMeta,
} from '../../utils/types';

export type PaymentPlanType = {
  id: number;
  name: string;
  plan_token: string;
  status: 'active' | 'cancelled';
  currency: Currencies;
  amount: number;
  duration: number;
  interval: Intervals;
  created_at: string;
};

export type CreatePaymentPayload = {
  /**
   * This is the amount to charge all customers subscribed to this plan.
   */
  amount: number;
  name: string;
  /**
   * This will determine the frequency of the charges for this plan. Could be yearly, quarterly, monthly, weekly, daily, etc.
   */
  interval: Intervals;
  /**
   * This is the frequency, it is numeric, e.g. if set to 5 and intervals is set to monthly you would be charged 5 months, and then the subscription stops.
   */
  duration: number;
};

export type GetPaymentsPayload = {
  /**
   * This is the specified date to start the list from. YYYY-MM-DD.
   */
  from?: string;
  /**
   * The is the specified end period for the search. YYYY-MM-DD.
   */
  to?: string;
  /**
   * This is the page number to retrieve e.g. setting 1 retrieves the first page.
   */
  page?: number;
  /**
   * This is the exact amount set when creating the payment plan.
   */
  amount?: number;
  /**
   * This is the currency the payment plan amount is charged in.
   */
  currency?: Currencies;
  /**
   * This is how often the payment plan is set to execute.
   */
  interval?: Intervals;
  /**
   * This is the status of the payment plan.
   */
  status?: string;
};

export type UpdatePaymentPayload = {
  id: string;
  /**
   * The new status of the payment plan.
   */
  status?: 'active' | 'cancelled' | string;
  /**
   * The new name of the payment plan.
   */
  amount?: number;
};

export interface CreatePaymentResponse extends FLWResponse {
  data: {
    id: number;
    name: string;
    amount: number;
    interval: Intervals;
    duration: number;
    status: string;
    currency: Currencies;
    plan_token: string;
    created_at: string;
  };
}

export interface SinglePaymentResponse extends FLWResponse {
  data: PaymentPlanType;
}

export interface GetPaymentsResponse extends FLWResponse {
  meta: PageMeta;
  data: PaymentPlanType;
}
