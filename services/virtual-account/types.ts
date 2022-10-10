import { FLWResponse } from '../../utils/types';

export type CreateAccountPayload = {
  /**
   * This is the number of virtual account numbers you want to generate
   */
  accounts?: number;
  /**
   * This could be a generic email address
   */
  email: string;
  /**
   * This allows you create a static account number i.e. it doesn't expire
   */
  is_permanent: boolean;
  /**
   * This is the number of times a generated account number can receive payments.
   */
  frequency?: number;

  /**
   * This is a transaction reference that would be returned each time a transfer is done to the account
   */
  tx_ref?: string;

  /**
   * The desired amount to be collected
   */
  amount: number;
};

export type FetchVirtualAccountPayload = {
  /**
   * This is the order reference returned in the virtual account number creation
   */
  order_ref: string;
};

export type FetchBatchVirtualAccountPayload = {
  /**
   * This is the batch ID returned in the bulk virtual account numbers creation
   */
  batch_id: string;
};

export type VirtualAccountType = {
  response_code: string;
  response_message: string;
  flw_ref: string;
  order_ref: string;
  account_number: string;
  frequency: string;
  bank_name: string;
  created_at: string;
  expiry_date: string;
  note: string;
  amount: number;
};

export interface CreateBulkResponse extends FLWResponse {
  data: {
    batch_id: string;
    response_code: string;
    response_message: string;
  };
}

export interface CreateVirtualAccountPayload extends FLWResponse {
  data: {
    response_code: string;
    response_message: string;
    flw_ref: string;
    order_ref: string;
    account_number: string;
    frequency: string;
    bank_name: string;
    created_at: string;
    expiry_date: string;
    note: string;
    amount?: number;
  };
}

export interface VirtualAccountResponse extends FLWResponse {
  data: VirtualAccountType;
}

export interface BatchVirtualAccountResponse extends FLWResponse {
    data: VirtualAccountType[];
  }
  