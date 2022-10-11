import {
  CardProviders,
  ChargeMeta,
  CountryCodes,
  Currencies,
  FLWResponse,
  PaymentTypes,
} from '../../utils/types';

export type CardChargePayload = {
  card_number: number;
  cvv: number;
  /**
   * Two-digit number representing the card's expiration month. It is usually the first two digits of the expiry date on the card.
   */
  expiry_month: number;
  /**
   * Two-digit number representing the card's expiration year. It is the last two digits of the expiry date on the card.
   */
  expiry_year: number;
  currency: Currencies;
  amount: number;
  fullname: string;
  email?: string;
  /**
   * This is a unique reference peculiar to the transaction being carried out.
   */
  tx_ref?: string;
  /**
   * This is a url you provide, we redirect to it after the customer completes payment and append the response to it as query parameters. (3DSecure only).
   */
  redirect_url: string;
  /**
   * This should be set to true for preauthoize card transactions.
   */
  preauthorize?: boolean;
  /**
   * IP - Internet Protocol. This represents the current IP address of the customer carrying out the transaction.
   */
  client_ip?: string;
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
  meta?: ChargeMeta;
  /**
   * This is an object that contains the authorization details of the card you want to charge. The authorization instructions for card charges are returned in the initiate charge call as `meta.authorization`
   */
  authorization?: {
    /**
     * This is the auth model of the card to use when validating, it is returned in the initiate charge call as authorization.mode.
     */
    mode?: string;
    /**
     * This is the card's pin. Required when the suggested auth mode is PIN.
     */
    pin?: number;
    /**
     * This is the city in the card's billing details. It is required when the suggested auth mode is avs_noauth.
     */
    city?: string;
    /**
     * This is the cards billing address. It is required when the suggested auth mode is avs_noauth.
     */
    address?: string;
    /**
     * This is the card issuing state. It is required when the suggested auth mode is avs_noauth.
     */
    state?: string;
    /**
     * This is the cards issuing country. It is required when the suggested auth mode is avs_noauth.
     */
    country?: string;
    /**
     * This is cards billing address zipcod. It is required when the suggested auth mode is avs_noauth.
     */
    zipcode?: number;
  };
};

export type ChargeType = {
  id: number;
  tx_ref: string;
  flw_ref: string;
  device_fingerprint: string;
  amount: number;
  charged_amount: number;
  app_fee: number;
  merchant_fee: number;
  processor_response: string;
  auth_model: string;
  currency: Currencies;
  ip: string;
  narration: string;
  status: string;
  auth_url: string;
  payment_type: PaymentTypes;
  fraud_status: string;
  charge_type: string;
  created_at: string;
  account_id: string;
  customer: {
    id: number;
    phone_number?: string;
    name: string;
    email: string;
    created_at: string;
  };
  meta: {
    authorization: {
      mode: string;
      endpoint: string;
    };
  };
};

export type NGBanksPayload = {
  /**
   * This is the Bank numeric code. It can be gotten from the banks endpoint. Bank.country()
   * 
   */
  account_bank: string;
  account_number: string;
  amount: number;
  email: string;
  /**
   * This is a unique reference peculiar to the transaction being carried out.
   */
  tx_ref: string;
  /**
   * This is the specified currency to charge in. Expected value is NGN.
   */
  currency?: 'NGN';
  /**
   * This is the phone number linked to the customer's Bank account or mobile money account
   */
  phone_number?: string;
  /**
   * This is the name of the customer making the payment.
   */
  fullname?: string;
  /**
   * IP - Internet Protocol. This represents the current IP address of the customer carrying out the transaction.
   */
  client_ip?: string;
  /**
   * This is the fingerprint for the device being used. It can be generated using a library on whatever platform is being used.
   */
  device_fingerprint?: string;
  /**
   * This is required for Zenith bank account payments, you are required to collect the customer's date of birth and pass it in this format DDMMYYYY as the passcode.
   */
  passcode?: string;
  /**
   * This is the customer's BVN number (It is only required for UBA account payment option).
   */
  bvn?: string;
  meta?: ChargeMeta;
};

export type BankTranferPayload = {
  amount: number;
  email: string;
  /**
   * This is a unique reference peculiar to the transaction being carried out.
   */
  tx_ref: string;
  /**
   * This is the specified currency to charge in.
   */
  currency?: Currencies;
  phone_number?: string;
  fullname?: string;
  client_ip?: string;
  /**
   * This is the fingerprint for the device being used. It can be generated using a library on whatever platform is being used.
   */
  device_fingerprint?: string;
  is_permanent?: boolean;
  narration?: string;
  meta?: ChargeMeta;
  /**
   * This is a url you provide, we redirect to it after the customer completes payment and append the response to it as query parameters
   */
  redirect_url?: string;
  /**
   * Pass your country as US for US ACH payments and ZA for SA ACH payments.

   */
  country?: CountryCodes;
};

export type ValidateChargePayload = {
  /**
   * This is a random number of at least 6 characters sent to customers phone number.
   */
  otp: string;
  /**
   * This is the reference returned in the initiate charge call as data.flw_ref
   */
  flw_ref: string;
  /**
   * This recognises the type of payment you want to validate. Set to account if you want to validate an account transaction and set to card for card transactions.
   */
  type: PaymentTypes;
};

export type VoucherPayload = {
  tx_ref: string;
  amount: number;
  currency: Currencies;
  voucher?: string;
  network?: string;
  email: string;
  phone_number: string;
  fullname?: string;
  client_ip?: string;
  device_fingerprint?: string;
  order_id?: string;
  redirect_url?: string;
  meta: ChargeMeta;
};

export interface ChargeCardType extends ChargeType {
  card: {
    first_6digits: string;
    last_4digits: string;
    issuer: string;
    country: CountryCodes;
    type: CardProviders;
    expiry: string;
  };
}

export interface ChargeCardResponse extends FLWResponse {
  data: ChargeCardType;
}

export interface ChargeNGBankType extends ChargeType {
  account: {
    account_number: string;
    bank_code: string;
    account_name: string;
  };
}

export interface ChargeNGBankResponse extends FLWResponse {
  data: ChargeNGBankType;
}

export interface BankTransferResponse extends FLWResponse {
  meta: ChargeMeta;
}

export interface UssdChargeResponse extends FLWResponse {
  meta: ChargeMeta;
}

export interface ValidateChargeResponse
  extends ChargeCardResponse,
    UssdChargeResponse,
    BankTransferResponse {}

export interface VoucherResponse extends FLWResponse {
  meta: ChargeMeta;
}
