import { FLWResponse } from '../../utils/types';

export type BankResData = {
  id: number;
  code: string;
  name: string;
};
export type BranchResponseData = {
  id: number;
  branch_code: string;
  branch_name: string;
  swift_code: string;
  bic: string;
  bank_id: number;
};
export interface BankResponse extends FLWResponse {
  data: BankResData[];
}

export interface BranchResponse {
  status: 'success';
  message: string;
  data: BranchResponseData[];
}
