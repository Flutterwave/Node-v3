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
  from: string;
  to: string;
  page?: string;
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
  item_code: string;
  code: string;
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
  country: CountryCodes;
  customer: string;
  amount: number;
  recurrence: 'ONCE' | 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  type: BillingType;
  reference?: string;
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
