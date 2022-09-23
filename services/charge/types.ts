import {
  CardProviders,
  ChargeMeta,
  CountryCodes,
  Currencies,
  FLWResponse,
  PaymentTypes,
} from '../../utils/types';

export type CardChargePayload = {
  card_number: string;
  cvv: string;
  expiry_month: string;
  expiry_year: string;
  currency: Currencies;
  amount: string;
  fullname: string;
  email?: string;
  tx_ref?: string;
  redirect_url: string;
  preauthorize?: boolean;
  client_ip?: string;
  device_fingerprint?: string;
  payment_plan?: string;
  meta?: ChargeMeta;
  authorization?: {
    mode?: string;
    pin?: number;
    city?: string;
    address?: string;
    state?: string;
    country?: string;
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
  account_bank: string;
  account_number: string;
  amount: number;
  email: string;
  tx_ref: string;
  currency?: Currencies;
  phone_number?: string;
  fullname?: string;
  client_ip?: string;
  device_fingerprint?: string;
  passcode?: string;
  bvn?: string;
  meta?: ChargeMeta;
};

export type BankTranferPayload = {
  amount: number;
  email: string;
  tx_ref: string;
  currency?: Currencies;
  phone_number?: string;
  fullname?: string;
  client_ip?: string;
  device_fingerprint?: string;
  is_permanent?: boolean;
  narration?: string;
  meta?: ChargeMeta;
  redirect_url?: string;
  country?: CountryCodes;
};

export type ValidateChargePayload = {
  otp: string;
  flw_ref: string;
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
  order_id?: string
  redirect_url?: string
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
    meta: ChargeMeta
}