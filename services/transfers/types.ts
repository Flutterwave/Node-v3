import { CountryCodes, Currencies, FLWResponse } from '../../utils/types';

export type CreateTransferPayload = {
  /**
   * This is the recipient bank code. You can see a list of all the available banks and their codes from the get banks endpoints.
   */
  account_name: string;
  /**
   * This is the recipient account number
   */
  account_number: string;
  /**
   * This is the amount to be transferred to the recipient
   */
  amount: number;
  /**
   * This is the narration for the transfer e.g. payments for x services provided
   */
  narration: string;

  /**
   * This is the currency for the Transfer. Expected values include NGN, GHS, KES, UGX, TZS, USD or ZAR.
   */
  currency: Currencies;
  /**
   * This is the full name of the Transfer beneficiary.
   */
  beneficiary_name?: string;
  /**
   * This code is used to identify Bank branches for disbursement in Ghana, Uganda and Tanzania. You can get the code from the /get branches endpoint in the Bank section
   */
  destination_branch_code?: string;
  /**
   * This is the beneficiary's id. It allows you to initiate a transfer to an existing beneficiary
   */
  beneficiary?: number;
  /**
   * This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer.
   */
  reference?: string;
  /**
   * This is a url passed by you the developer, Flutterwave would pass the final transfer response to this callback url. You can use this in place of Webhooks
   */
  callback_url?: string;

  /**
   * You can pass this when you want to debit a currency balance and send money in another currency
   */
  debit_currency?: Currencies;

  /**
   * This is required if the debit wallet is a payout subaccount
   */
  debit_subaccount?: string;
  /**
   * This is an object you can use to add any additional payment information you would like to associate with this transfer.
   */
  meta?: {
    /**
     * This is the mobile number of the sender. This is required for cash pick up, FCMB bank account, M-Pesa and ZAR bank account transfers.
     */
    mobile_number: string;

    /**
     * This is the email address of the sender. This is required for cash pick up, FCMB bank account and ZAR bank account transfers.
     */
    email: string;
    /**
     * This is the beneficiary's country. It is required for cash pick up and FCMB bank account transfers.
     */
    beneficiary_country: CountryCodes;
    /**
     * This is the beneficiary's occupation. It is required for cash pick up and FCMB bank account transfers.
     */
    beneficiary_occupation: string;

    /**
     * This is the address of the transfer recipient and it is required for cash pick up, FCMB bank account and ZAR bank account transfers.
     */
    recipient_address: string;
    /**
     * This is the sender's full name. This is required for cash pick up, FCMB bank account and M-Pesa transfers.
     */
    sender: string;
    /**
     * This is the sender's country and it is required for cash pick up, FCMB bank account and M-Pesa transfers.
     */
    sender_country: string;
    /**
     * This is the number found in the sender's identification document. This is required for cash pick up and FCMB bank account transfers.
     */
    sender_id_number?: string;
    /**
     * This is the sender's identification document. This is required for cash pick up and FCMB bank account transfers. Expected values include: PASSPORT, DRIVING LICENSE, ID CARD, VOTER CARD.
     */
    sender_id_type?: 'PASSPORT' | 'DRIVING LICENSE' | 'ID CARD' | 'VOTER CARD';
    /**
     * This is the expiry date of the sender's identification document. This is required for cash pick up and FCMB bank account transfers.
     */
    sender_id_expiry?: string;
    /**
     * This is the mobile number of the sender. This is required for cash pick up and FCMB bank account transfers.
     */
    sender_mobile_number?: string;
    /**
     * This is the address of the sender. It is required for cash pick up and FCMB bank account transfers.
     */
    sender_address?: string;
    /**
     * This is the occupation of the sender(transfer originator). It is required for cash pick up and FCMB bank account transfers.
     */
    sender_occupation?: string;

    /**
     * This is the purpose of the transfer-it is used for audit and is not to be confused with thedescription field. This field is required for cash pick up and FCMB bank account transfers.
     */
    transfer_purpose?: string;
  };
};

export type TransferType = {
  id: number;
  account_number: string;
  bank_code: string;
  full_name: string;
  created_at: string;
  currency: Currencies;
  debit_currency: Currencies;
  amount: number;
  fee: number;
  status: string;
  reference: string;
  meta?: TransferMeta[];
  narration: string;
  complete_message: string;
  requires_approval: number;
  is_approved: number;
  bank_name: string;
};

type TransferMeta = {
  FirstName: string;
  LastName: string;
  BeneficiaryCountry: CountryCodes;
  MobileNumber: string;
  Sender: string;
  AccountNumber: string;
  RoutingNumber: string;
  MerchantName: string;
  EmailAddress: string;
  Address: string;
  SenderCountry: CountryCodes;
  wallet_email: string;
  AccountId: string;
  merchant_id: string;
};

export type BulkTransferPayload = {
  /**
   * This is the title of the bulk transfer attempt.
   */
  title?: string;
  /**
   * An array of objects containing the transfer charge data.
   * This array contains the same payload you would passed to create a single transfer with multiple different values.
   */
  bulk_data: {
    first_name?: string;
    last_name?: string;
    email?: string;
    /**
     * This is the mobile number of the recipient. If the recipient's email address is passed, this becomes an optional parameter.
     */
    mobile_number?: string;
    recipient_address: string;
  }[];
};

export type FeePayload = {
  /**
   * This is the amount to be transferred.
   */
  amount: number;
  /**
   * This is the specified currency for the transfer. Expected values include: NGN, USD, GHS, KES, UGX, RWF.
   */
  currency: Currencies;
  /**
   * This is the type of transfer you want to get the fee for. Expected values are mobilemoney and account.
   */
  type?: string;
};

export type FetchTransferPayload = {
  /**
   * This allows you fetch from a specific page e.g. setting 1 retrieves the first page.
   */
  page?: string;
  /**
   * This allows you fetch only transfers with a specific status e.g. fetch all successful transactions. Expected values include failed, successful.
   */
  status?: 'failed' | 'successful';
};

export type WalletToWalletPayload = {
  /**
   * This should always be set to flutterwave
   */
  account_bank: 'flutterwave';
  merchant_id: string;
  amount: number;
  narration: string;
  currency: Currencies;
  reference: string;
  debit_currency: Currencies;
};

export interface TransferResponse extends FLWResponse {
  data: TransferType;
}

export interface TransferFeeResponse extends FLWResponse {
  data: {
    fee_type: string;
    currency: Currencies;
    fee: number;
  }[];
}

export interface BulkTransferResponse extends FLWResponse {
  data: {
    id: number;
    created_at: string;
    approver: string;
  };
}

export interface FetchTransfersResponse extends FLWResponse {
  data: TransferType[];
}

export interface FetchTransferResponse extends FLWResponse {
  data: TransferType;
}
