import { CountryCodes, Currencies, FLWResponse } from '../../utils/types';

export type CreateCardPayload = {
  currency: Currencies;
  amount: number;
  /**
   * Please use this if you want to debit a different balance on Flutterwave to fund your card
   * e.g. you are funding a USD card but you want to debit your NGN balance to fund the card.
   */
  debit_currency?: Currencies;
  billing_name?: string;
  billing_address?: string;
  /**
   * This is the city registered with the card, it makes up part of the address the customer used for their card.
   */
  billing_city?: string;
  /**
   * This is the State/County/Province/Region registered with the card. It is a two letter word representing the state in the billing country e.g CA, NY
   */
  billing_state?: string;
  /**
   * This is the zip code or postal card registered with the card.

   */
  billing_postal_code: number;
  /**
   * This is the country registered with the card.
   */
  billing_country: CountryCodes;
  first_name: string;
  last_name: string;
  /**
   * This is the date of birth of the cardholder. Expected date format is YYYY/MM/DD.
   */
  date_of_birth: string;
  email: string;
  phone: string;
  title: string;
  /**
   * This is the cardholder's gender. Expected values are M and F.
   */
  gender: 'M' | 'F';
  /**
   * This is a callback endpoint you provide where we send details about any transaction that occurs on the card.
   */
  callback_url: string;
};

export type FundCardPayload = {
  /**
   * This is the id of the virtual card to be fetched. You can get this id from the call to create a virtual card or list virtual cards as data.id
   */
  id: string;
  /**
   * Use this if you want to debit a different balance on Flutterwave to fund your card
   * e.g. you are funding a USD card but you want to debit your NGN balance to fund the card
   */
  debit_currency: Currencies;
  /**
   * This is the amount you want to fund the card. The amount would be in the card currency
   */
  amount: number;
};

export type VirtualCardType = {
  id: string;
  account_id: number;
  amount: string;
  currency: Currencies;
  card_pan: string;
  masked_pan: string;
  city: string;
  state: string;
  address_1: string;
  address_2?: string;
  zip_code: string;
  cvv: string;
  expiration: string;
  send_to?: string;
  bin_check_name?: string;
  card_type: 'mastercard' | 'visa' | 'verve';
  name_on_card: string;
  created_at: string;
  is_active: boolean;
  callback_url: string;
};

export type BlockUnblockCardPayload = {
  id: string;
  /**
   * This is the action you want to perform on the virtual card. Can be block or unblock
   *
   * @link https://developer.flutterwave.com/reference/endpoints/virtual-cards#blockunblock-virtual-card
   */
  status_action: 'block' | 'unblock';
};

export type CardTransactionPayload = {
    from: string
    to: string
    /**
     * Pass 0 if you want to start from the beginning
     */
    index: number
    /**
     * Specify how many transactions you want to retrieve in a single call
     */
    size: number
}

export type WithdrawFromCardPayload = {
    id: string
    amount: number
}

export interface CreateCardResponse extends FLWResponse {
  data: VirtualCardType;
}

export interface FundCardResponse extends FLWResponse {
  data: null;
}

export interface GetCardsResponse extends FLWResponse {
  data: VirtualCardType[];
}

export interface GetCardResponse extends FLWResponse {
  data: VirtualCardType;
}

export interface BlockUnblockCardResponse extends FLWResponse {
    data: null
}

