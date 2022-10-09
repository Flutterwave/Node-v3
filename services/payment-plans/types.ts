import { Currencies, FLWResponse, Intervals } from '../../utils/types';

export type PaymentPlanType = {
  id: number;
  name: string;
  plan_token: string;
  status: string;
  currency: Currencies;
  amount: number;
  duration: number;
  interval: Intervals;
  created_at: string;
};

export type CreatePaymentPayload = {
  amount: number;
  name: string;
  interval: Intervals;
  duration: number;
};

export type SinglePaymentPayload = {
  id: string;
};

export type GetPaymentsPayload = {
  from?: string;
  to?: string;
  page?: number;
  amount?: number;
  currency?: Currencies;
  interval?: Intervals;
  status?: string;
};

export type UpdatePaymentPayload = {
  id: string;
  status?: 'active' | any;
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
  meta: {
    page_info: {
      total: number;
      current_page: number;
      total_pages: number;
    };
  };
  data: PaymentPlanType;
}
