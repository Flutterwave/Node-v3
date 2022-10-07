import { Currencies, FLWResponse } from '../../utils/types';

type Medium = 'email' | 'whatsapp' | 'sms';

export type OTPType = {
  medium: Medium;
  reference: string;
  otp: string;
  expiry: string;
};

export type CreateOTPPayload = {
  length: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  sender: string;
  send: string;
  medium: Array<Medium>;
  expiry: number;
};

export type ValidateOTPPayload = {
  reference: string;
};

type Transaction = {
  customer_email: string;
  flw_ref: string;
  tx_ref: string;
  id: number;
  charged_amount: number;
  app_fee: number;
  merchant_fee: number;
  stampduty_charge: number;
  settlement_amount: number;
  status: string;
  payment_entity: string;
  transaction_date: string;
  currency: Currencies;
  card_locale: string;
  rrn: string;
  subaccount_settlement: number;
};

export interface CreateOTPResponse extends FLWResponse {
  data: OTPType[];
}

export interface ValidateOTPResponse extends FLWResponse {
  data: {
    id: number;
    account_id: number;
    merchant_name: string;
    merchant_email: string;
    settlement_account: string;
    bank_code: string;
    transaction_date: string;
    due_date: string;
    processed_date?: string;
    status: string;
    is_local: number;
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
    disburse_ref: number;
    disburse_message?: number;
    channel: number;
    destination: number;
    fx_data?: any;
    flag_message: number;
    meta: any;
    refund_meta?: any;
    chargeback_meta?: any;
    source_bankcode?: number;
    created_at: string;
    transactions: Transaction[];
  };
}
