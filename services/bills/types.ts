import { CountryCodes, Currencies, FLWResponse } from '../../utils/types';
type BillingType =
  | 'AIRTIME'
  | 'DATA_BUNDLE'
  | 'POWER'
  | 'INTERNET'
  | 'TOLL'
  | 'CABLE';
export type BillingCategoryType = {
  id: number;
  biller_code: string;
  name: string;
  default_commission: number;
  date_added: string;
  country: CountryCodes;
  is_airtime: boolean;
  summary;
  biller_name: BillingType;
  item_code: string;
  short_name: string;
  fee: number;
  commission_on_fee: boolean;
  label_name: string;
  amount: number;
};

export type FetchBillsPayload = {
  /**
   * This is the start date it can be in any of this formats: YYYY-MM-DDTHH:MM:SSZ or YYYY-MM-DD
   */
  from: string;
  /**
   * This is the end date, it can be in any of this formats: YYYY-MM-DDTHH:MM:SSZ or YYYY-MM-DD
   */
  to: string;
  /**
   * This is the page you want to start from
   */
  page?: string;
  /**
   * This is the customer ID, pass this if you want to retrieve bill history for a particular customer ID
   */
  reference?: string;
};

export type AmountToBePaidPayload = {
  id: string;
  product_id: string;
};

export type OrdBillingPayload = {
  id: string;
  quantity: string;
  value: string;
};

export type ValidateBillingPayload = {
  /**
   * This code is returned from the /getBillCategory endpoint as data[i].item_code, where i is the index in the data array contained in the response object.
   */
  item_code: string;
  /**
   * This is the biller code. It is returned in the /getBillCategory endpoint as data[i].biller_code, where i is the index in the data array contained in the response object.
   */
  code: string;
  /**
   * This is the customer identifier for the bill payment e.g. for airtime, the identifier would be the customer's mobile number.
   */
  customer: string;
};

export type ValidateBillingType = {
  response_code: string;
  address?: string;
  response_message: string;
  name: string;
  biller_code: string;
  customer: string;
  product_code: string;
  email?: string;
  fee: number;
  maximum: number;
  minimum: number;
};

export interface CreateBillPayload {
  /**
   * This is the country attached to the service being bought e.g. if service is Airtime and country is NG it means you are buying airtime in Nigeria
   */
  country: CountryCodes;
  /**
   * This is the customer identifier for the bill payment e.g. for airtime, the identifier would be the customer's mobile number.
   */
  customer: string;
  /**
   * This is the amount for the service you would like to buy
   */
  amount: number;
  /**
   * This determines if you are buying a service recurrently or not.
   * ONCE - This is a one time payment, HOURLY - This is an hourly payment, DAILY - This is a daily payment, WEEKLY - This is a weekly payment, MONTHLY - This is a monthly payment.
   * It defaults to ONCE when the value is not provided
   */
  recurrence: 'ONCE' | 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  /**
   * Fetch the possible values to pass from data.biller_name on the Bill categories endpoint.
   * Note that these values are case sensitive and must be passed exactly the way it was returned on the Categories API
   */
  type: BillingType;
  /**
   * This is a unique reference passed by the developer to identify transactions on their end
   */
  reference?: string;
  /**
   * This is the particular biller you're paying to. You can get a list of all the possible billers here. Only pass this value for Ghana Airtime bills
   */
  biller_name?: string;
}

export type CreatingBillingType = {
  phone_number: string;
  amount: number;
  network: string;
  flw_ref: string;
  tx_ref: string;
  reference?: string;
};

export type StatusType = {
  tx_ref: string;
  amount: number;
  fee: number;
  currency?: Currencies;
  extra?: string;
  flw_ref?: string;
  token?: string;
};

export type GetBillSummaryType = {
  currency: Currencies;
  sum_bills: number;
  sum_commission: number;
  sum_dstv: number;
  sum_airtime: number;
  count_dstv: number;
  count_airtime: number;
};
export type OrdBillingItems = {
  name: string;
  id: string;
  type: string;
  value: string;
  required: boolean;
  length: string;
  fixed: boolean;
};

export type AmountToBePaidResponseType = {
  exact: boolean;
  items: OrdBillingItems[];
  biller_code: string;
  product_code: string;
  product_name: string;
  amount: string;
};

export type OrdBillingType = {
  amount: string;
  fee: string;
  tx_ref: string;
  order_reference: string;
  created_at: string;
  total_amount: string;
};

export type BillerType = {
  code: string;
  name: string;
};

export type BillingAgencyType = {
  amount: string;
  code: string;
  fee: string;
  name: string;
  description: string;
};

export type UpdateBillOrderType = {
  amount: string;
  order_reference: string;
  total_amount: string;
  meta: {
    rrr: string;
  };
  fee: string;
  flw_ref: string;
  tx_ref: string;
};

export type GetBillingCategoriesPayload = {
  /**
   * This parameter allows you filter the response object for airtime billers only (MTN, Vodafone, Airtel, 9mobile).
   * You should set this to 1 if you would like to filter only airtime billers. Expected values are 0 and 1.
   */
  airtime?: number;
  /**
   * This parameter allows you filter the response object for data billers only (MTN, Vodafone, Airtel, 9mobile).
   * You should set this to 1 if you would like to filter only data billers. Expected values are 0 and 1.
   */
  data_bundle?: number;
  /**
   * This parameter allows you filter the response object for power billers only (EKEDC, IKEDC, KDLC).
   * You should set this to 1 if you would like to filter only power billers. Expected values are 0 and 1.
   */
  power?: number;
  /**
   * This parameter allows you filter the response object for internet billers only (SWIFT, Smile, ipNX).
   * You should set this to 1 if you would like to filter only internet billers. Expected values are 0 and 1.
   */
  internet?: number;
  /**
   * This parameter allows you filter the response object for toll billers only.
   * You should set this to 1 if you would like to filter only toll billers. Expected values are 0 and 1.
   */
  toll?: number;
  /**
   * This parameter allows you filter the response object for cable billers only (DSTV, Startimes, GOTV).
   * You should set this to 1 if you would like to filter only cable billers. Expected values are 0 and 1.
   */
  cable?: number;
  /**
   * This parameter allows you filter the response object for a specific Biller using the biller_code.
   */
  biller_code?: string;
};

export interface GetBillResponse extends FLWResponse {
  data: {
    summary: GetBillSummaryType[];
    total: number;
    total_pages: number;
    reference?: string;
  };
}

export interface CreateBillResponse extends FLWResponse {
  data: CreatingBillingType;
}

export interface AmountToBePaidResponse extends FLWResponse {
  data: AmountToBePaidResponseType;
}

export interface CreateBulkBillPayload {
  bulk_reference: string;
  callback_url: string;
  bulk_data: CreateBillPayload[];
}

export interface CreateBulkBillResponse extends FLWResponse {
  data: { batch_reference: string };
}

export interface CreateOrdBillingPayload {
  id: string;
  product_id: string;
  amount: string;
  reference?: string;
  customer: object;
  fields: OrdBillingPayload[];
}

export interface CreateOrdBillingResponse extends FLWResponse {
  data: OrdBillingType;
}

export interface BillingCategoryResponse extends FLWResponse {
  data: BillingCategoryType[];
}

export interface BillingAgencyResponse extends FLWResponse {
  data: BillerType[];
}

export interface StatusResponse extends FLWResponse {
  data: StatusType;
}

export interface PUAResponse extends FLWResponse {
  data: {
    biller_code: string;
    meta?: string;
    products: BillingAgencyType[];
  };
}

export interface UpdateBillOrderResponse extends FLWResponse {
  data: UpdateBillOrderType;
}

export interface ValidateBillResponse extends FLWResponse {
  data: ValidateBillingType;
}
