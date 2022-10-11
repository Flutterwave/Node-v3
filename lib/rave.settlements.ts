import retrieve from '../services/settlements/rave.retrieve';
import retrieve_all from '../services/settlements/rave.retrieve-all';
import {
  RetrieveSettlementPayload,
  SettlementsPayload,
} from '../services/settlements/types';
import RaveBase from './rave.base';

/**
 * This class details all necessary methods needed for managing your settlements.
 */
export default class Settlements {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }
  /**
   * This section describes how to query all settlements made to an account.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/settlements#get-all-settlements
   */
  fetch_all(data: SettlementsPayload) {
    return retrieve_all(data, this.rave);
  }

  /**
   * This section describes how to get details on a particular settlement specified by its ID.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/settlements#get-a-settlement
   */
  fetch(data: RetrieveSettlementPayload) {
    return retrieve(data, this.rave);
  }
}
