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
  /**
   * This is the sub-accounts bank ISO code, use the Banks.country() method to retrieve a list of bank codes.
   */
  account_bank: string;
  /**
   * This is the customer's account number. When testing on staging, you can find a list of all available test bank accounts
   */
  account_number: string;
  /**
   * This is the sub-account business name.
   */
  business_name: string;
  /**
   * This is the sub-account business name.
   */
  business_email?: string;
  business_contact?: string;
  business_contact_mobile?: string;
  business_mobile: string;
  country?: CountryCodes;
  /**
   * This is an array that allows you pass more information about the sub-account.
   */
  meta: Array<Object>;
  /**
   * This can be set as percentage or flat.
   */
  split_type: SplitType;
  /**
   * This can be a percentage value or flat value depending on what was set on split_type.Note that the % value is in decimal. So 50% is 0.5 and so on.
   */
  split_value: number;
};


export type FetchSubAccountsPayload = {
    /**
     * This is the sub-accounts bank ISO code
     */
    account_bank?: string
    /**
     * This is the account number associated with the subaccount you want to fetch
     */
    account_number?: string
    /**
     * This is the name of the bank associated with the ISO code provided in account_bankfield
     */
    bank_name?: string
    /**
     * This is the page number to retrieve e.g. setting 1 retrieves the first page
     */
    page?: number
}

export type UpdateSubAccountPayload = {
    /**
     * This is the unique id of the subaccount you want to update. It is returned in the call to create a subaccount as data.id
     */
    id: number;
    /**
     * This is the sub-account business name.
     */
    business_name: string;
    /**
     * This can be a percentage value or flat value depending on what was set on split_type
     */
    split_value: number;
    /**
     * This is the sub-account business email.
     */
    business_email?: string;
    /**
     * This can be set as percentage or flat.
     */
    split_type: SplitType;
    /**
     * This is the customer's account number.
     */
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

