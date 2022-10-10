import { FLWResponse, PageMeta } from '../../utils/types';

export type SubscriptionType = {
  id: number;
  amount: number;
  customer: {
    id: number;
    customer_email: string;
  };
  plan: number;
  status: 'cancelled' | 'inactive' | string;
  created_at: string;
};

export type SubscriptionPayload = {
  email?: string;
  transaction_id?: string;
  plan?: number;
  subscribed_from?: string;
  subscribed_to?: string;
  next_due_from?: string;
  next_due_to?: string;
  page?: string;
  status?: string;
};

export interface SubscriptionResponse extends FLWResponse {
  data: SubscriptionType;
}

export interface SubscriptionsResponse extends FLWResponse {
  meta: PageMeta;
  data: SubscriptionType[];
}
