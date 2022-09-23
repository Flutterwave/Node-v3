import { FLWResponse } from '../../utils/types';

export type BeneficiariesCreatePayload = {
  account_number: string;
  account_bank: string;
  beneficiary_name: string;
};

export type CreateBeneficiaryResponseData = {
  id: number;
  account_number: string;
  bank_code: string;
  full_name: string;
  created_at: string;
  bank_name: string;
};

export interface CreateBeneficiaryResponse extends FLWResponse {
  data: CreateBeneficiaryResponseData;
}

export interface DeleteBeneficiaryResponse extends FLWResponse {
  data?: 'Deleted';
}

export type BeneficiaryResponseData = {
  id: number;
  account_number: string;
  bank_code: string;
  full_name: string;
  meta?: object;
  created_at: string;
  bank_name: string;
};

export interface RetrieveAllBeneficiaryResponse extends FLWResponse {
  meta: {
    page_info: {
      total: number;
      current_page: number;
      total_pages: number;
    };
  };
  data: BeneficiaryResponseData[];
}

export interface RetrieveBeneficiaryResponse extends FLWResponse {
  data?: BeneficiaryResponseData;
}
