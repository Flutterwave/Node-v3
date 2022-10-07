import { Currencies, FLWResponse } from '../../utils/types';

export type BalanceCurrencyPayload = { currency: Currencies };

export type BalanceResponseType = {
  currency: Currencies;
  available_balance: number;
  ledger_balance: number;
};

export type AccountPayload = {
  account_number: string;
  account_bank: string;
};

export type BVNPayload = {
  bvn: string;
};

export interface BalanceCurrencyResponse extends FLWResponse {
  data: BalanceResponseType;
}

export interface BalanceResponse extends FLWResponse {
  data: BalanceResponseType[];
}

export interface AccountResponse extends FLWResponse {
  data: {
    account_number: string;
    account_name: string;
  };
}
