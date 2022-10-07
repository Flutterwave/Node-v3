import { CountryCodes, FLWResponse } from '../../utils/types';

export type eBillPayload = {
  type: string;
  country: CountryCodes;
  customer: string;
  amount: number;
  reference?: string;
};

export type BillTypes =
  | 'AIRTIME'
  | 'DATA_BUNDLE'
  | 'INTERNET'
  | 'POWER'
  | 'CABLES'
  | 'TOLL';

export type BillData = {
  id: number;
  biller_code: string;
  name: BillTypes;
  default_commission: number;
  date_added: string;
  country: CountryCodes;
  is_airtime: boolean;
  biller_name: string;
  item_code: string;
  short_name: string;
  fee: number;
  commission_on_fee: boolean;
  label_name: string;
  amount: number;
};

export interface BillResponse extends FLWResponse {
  data: BillData;
}

export type UpdateEBillsPayload = {
    "order_id": string,
    "amount": number,
    "reference"?: string
}

export interface UpdateEBillsResponse extends FLWResponse {
    data: any
}

