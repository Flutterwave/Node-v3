import { Currencies, FLWResponse, PageMeta } from '../../utils/types';

export type SettlementsPayload = {
  page?: number;
  from?: string;
  to?: string;
  subaccount_id?: string;
};

export type SettlementType = {
  id: string;
  account_id: number;
  merchant_name: string;
  merchant_email: string;
  settlement_account: string;
  bank_code: string;
  transaction_date: string;
  due_date: string;
  processed_date?: string;
  status: 'completed' | string;
  is_local: boolean;
  currency: Currencies;
  gross_amount: number;
  app_fee: number;
  merchant_fee: number;
  chargeback: number;
  refund: number;
  stampduty_charge: number;
  net_amount: number;
  transaction_count: number;
  processor_ref?: string;
  disburse_ref: string;
  disburse_message?: string;
  channel: 'web' | string;
  destination: string;
  fx_data?: string;
  flag_message?: string;
  meta: Array<number>;
  refund_meta?: string;
  chargeback_meta?: string;
  source_bankcode?: string;
  created_at: string;
};

export type RetrieveSettlementPayload = {
    id: string
    from?: string
    to?: string
}


export interface SettlementResponse extends FLWResponse {
  meta: PageMeta;
  data: SettlementType[];
}

export interface RetrieveSettlementResponse extends FLWResponse {
    data: SettlementType
}