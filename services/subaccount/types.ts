import { CountryCodes, FLWResponse, PageMeta } from '../../utils/types';

export type SplitType = 'percentage' | 'flat'

export type SubAccountType = {
  id: number;
  account_number: string;
  account_bank: string;
  full_name: string;
  created_at: string;
  split_type: SplitType;
  split_value: number;
  subaccount_id: string;
  bank_name: string;
  country: CountryCodes
  split_ratio: number
};

export type CreateSubAccountPayload = {
  account_bank: string;
  account_number: string;
  business_name: string;
  business_email?: string;
  business_contact?: string;
  business_contact_mobile?: string;
  business_mobile: string;
  country?: CountryCodes;
  meta: Array<Object>;
  split_type: SplitType;
  split_value: number;
};


export type FetchSubAccountsPayload = {
    account_bank: string
    account_number: string
    bank_name: string
    page: number
}

export type UpdateSubAccountPayload = {
    id: number;
    business_name: string;
    split_value: number;
    business_email?: string;
    split_type: SplitType;
    account_number: string
  };

export interface CreateSubAccountResponse extends FLWResponse {
    data: SubAccountType
}

export interface DeleteSubAccountResponse extends FLWResponse {
    data: null
}

export interface FetchSubAccountsResponse extends FLWResponse {
    meta: PageMeta
    data: SubAccountType[]
}

export interface FetchSubAccountResponse extends FLWResponse {
    data: SubAccountType
}

