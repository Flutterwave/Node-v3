import { Currencies, FLWResponse } from '../../utils/types';

type Medium = 'email' | 'whatsapp' | 'sms';

export type OTPType = {
  medium: Medium;
  reference: string;
  otp: string;
  expiry: string;
};

export type CreateOTPPayload = {
  /**
   * This is Integer length of the OTP being generated. Expected values are between 5 and 7.
   */
  length: number;
  /**
   * This is customer object used to include the recipient information.
   */
  customer: {
    /**
     * This is the full name of the recipient of the OTP.
     */
    name: string;
    /**
     * This is the email address of the recipient of the OTP. You should specify this if you intend to send the OTPs to the user's email address.
     */
    email?: string;
    /**
     * This is the phone number of the recipient of the OTP. This is important for sending the OTP via WhatsApp or SMS.
     */
    phone?: string;
  };
  /**
   * This is your merchant/business name. It would display when the OTP is sent.
   */
  sender: string;
  /**
   * Set to true to send otp to customer.
   */
  send: boolean;
  /**
   * Pass the medium you want your customers to receive the OTP on. Expected values are sms, email and whatsapp.
   */
  medium: Array<Medium>;
  /**
   * Pass an integer value represented in minutes for how long you want the OTP to live for before expiring.
   */
  expiry: number;
};

export type ValidateOTPPayload = {
  /**
   * This is the reference that was returned in the create OTP response.
   */
  reference: string;
  /**
   * This is the One time Pin sent to the user. You are meant to collect this from the user for validation.
   */
  otp: number;
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
