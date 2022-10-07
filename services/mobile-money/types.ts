import { Currencies, FLWResponse } from '../../utils/types';
import { ChargeType } from '../charge/types';
export type MobileMoneyNetworks = 'MTN' | 'VODAFONE' | 'TIGO' | 'AIRTEL' | 'ZAMTEL';

export type MobileMoneyPayload = {
  phone_number: string;
  amount: number;
  currency: Currencies;
  email: string;
  tx_ref: string;
  type?: string;
  network?: MobileMoneyNetworks;
  fullname?: string
  meta?: Object
  voucher?: string
};

export interface MobileMoneyResponse extends FLWResponse {
  meta: {
    authorization: {
      redirect: string;
      mode: string;
    };
  };
}

export interface MobileResponse extends FLWResponse {
    data: ChargeType
}
