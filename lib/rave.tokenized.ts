import bulk_charge from '../services/tokenized-charges/rave.bulk.charge';
import charge_token from '../services/tokenized-charges/rave.charge';
import retrieve_a_bulk from '../services/tokenized-charges/rave.retrieve.a.bulk';
import retrieve_charge_trans from '../services/tokenized-charges/rave.retrieve.charge.transactions';
import update_a_token from '../services/tokenized-charges/rave.update.tokens';
import {
  BulkTokenChargePayload,
  TokenChargePayload,
  UpdateTokenPayload,
} from '../services/tokenized-charges/types';
import RaveBase from './rave.base';

export default class Tokenized {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }
  /**
   * This method allows the developer to intiate a tokenized transactions.
   *
   *  A card must initially be charged before it can be tokenized. Only cards can be tokenized.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/tokenized-charge#create-a-tokenized-charge
   */
  charge(data: TokenChargePayload) {
    return charge_token(data, this.rave);
  }

  /**
   * This method allows you to query the status of a bulk tokenized charge.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/tokenized-charge#get-status-of-bulk-tokenized-charges
   */

  fetch_bulk(data: { batch_id: string }) {
    return retrieve_a_bulk(data, this.rave);
  }

  /**
   * This endpoint allows businesses to make multiple tokenized payments at once.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/tokenized-charge#create-bulk-tokenized-charges
   */
  bulk(data: BulkTokenChargePayload) {
    return bulk_charge(data, this.rave);
  }

  /**
   * This endpoint allows you to get the status of a bulk tokenized charge
   *
   * @link https://developer.flutterwave.com/reference/endpoints/tokenized-charge#get-bulk-tokenized-charges
   */
  fetch_charge_transactions(data: { batch_id: string }) {
    return retrieve_charge_trans(data, this.rave);
  }

  /**
   * This endpoints allow developers update the details tied to a customer's card token.
   * @link https://developer.flutterwave.com/reference/endpoints/tokenized-charge#update-card-token
   */
  update_token(data: UpdateTokenPayload) {
    return update_a_token(data, this.rave);
  }
}
