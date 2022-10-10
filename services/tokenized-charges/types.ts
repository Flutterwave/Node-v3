import { CountryCodes, Currencies, FLWResponse } from '../../utils/types';
import { ChargeCardType } from '../charge/types';

export type TokenChargePayload = {
  /**
   * This is the card token returned from the transaction verification endpoint as data.card.token
   */
  token: string;
  /**
   * This is the email address of the customer
   */
  email: string;
  /**
   * This is the specified currency to charge in.
   */
  currency: Currencies;
  /**
   * This is the ISO country code of the merchant
   */
  country: CountryCodes;
  /**
   * This is the amount to be charged.
   */
  amount: number;
  /**
   * This is a unique reference peculiar to the transaction being carried out.
   */
  tx_ref: string;
  /**
   * This is the firstname of the customer making the payment
   */
  first_name?: string;
  /**
   * This is the lastname of the customer making the payment.
   */
  last_name?: string;
  /**
   * This is a custom description added by the merchant
   */
  narration: string;
  /**
   * TPass this value as true to preauthorize a tokenized charge.
   */
  preauthorize?: boolean;
  /**
   * This represents the current IP address of the customer carrying out the transaction.
   */
  ip?: string;
  /**
   * This is the fingerprint for the device being used. It can be generated using a library on whatever platform is being used.
   */
  device_fingerprint?: string;
  /**
   * This is the id of a previously created payment plan needed to add a card user to the payment plan.
   */
  payment_plan?: string;
  /**
   * This is the id of a previously created payment plan needed to add a card user to the payment plan.
   */
  meta?: {
    /**
     * This could be the extra information you want to pass
     */
    flightID: string;
    /**
     * This could be any message you'd like to associate with this call
     */
    sideNote: string;
  }[];
  /**
   * This is an array of objects containing the subaccount IDs to split the payment into.
   */
  subaccounts?: {
    /**
     * This is the unique Id returned in the call to create a subaccount as data.subaccount_id
     */
    id: string;
  }[];
};

export type BulkTokenChargePayload = {
  /**
   * This is an object that defines what should happen when the transaction fails
   */
  retry_strategy: {
    /**
     * This is the number of mins it should take for the retry to happen.
     */
    retry_interval: number;
    /**
     * This is the amount that would be retried after the specified number of attempts in percentage.
     */
    retry_amount_variable: number;
    /**
     * This is the number of times the retry should happen.
     */
    retry_attempt_variable: number;
    /**
     * This is the maximum number of retries. If not set 10 attempts will be made
     */
    last_retry_attempt?: number;
  };
  /**
   * An array of objects containing the tokenized bulk charge data
   */
  bulk_data: TokenChargePayload[];
  /**
   * This is the title of the bulk charge
   */
  title?: string;
};

export type UpdateTokenPayload = {
  /**
   * This is the card token returned from the transaction verification endpoint as data.card.token
   */
  token: string;
  /**
   * This is the email address of the customer
   */
  email: string;
  /**
   * This is the fullname of the customer making the payment.
   */
  full_name: string;
  /**
   * This is the lastname of the customer making the payment.
   */
  phone_number: string;
};

export interface BulkTokenChargeResponse extends FLWResponse {
  data: {
    id: number;
    created_at: string;
    approver: string;
  };
}

export interface BulkTokenResponse extends FLWResponse {
  data: {
    id: number;
    title: string;
    approver: string;
    processed_charges: number;
    pending_charges: number;
    total_charges: number;
  };
}

export interface TokenChargeResponse extends FLWResponse {
  data: ChargeCardType;
}

export interface BulkTokenTransactionsResponse extends FLWResponse {
  data: ChargeCardType[];
}

export interface UpdateTokenResponse extends FLWResponse {
  data: {
    customer_email: string;
    customer_full_name: string;
    customer_phone_number: string;
    created_at: string;
  };
}
