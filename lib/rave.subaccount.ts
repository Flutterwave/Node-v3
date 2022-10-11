import create_sub from '../services/subaccount/rave.create';
import del_sub from '../services/subaccount/rave.delete';
import get from '../services/subaccount/rave.fetch';
import get_all from '../services/subaccount/rave.fetch.all';
import update_sub from '../services/subaccount/rave.update';
import {
  CreateSubAccountPayload,
  FetchSubAccountsPayload,
  UpdateSubAccountPayload,
} from '../services/subaccount/types';
import { IDPayload } from '../utils/types';
import RaveBase from './rave.base';

/**
 * These class allows the developer/merchant to manage Collection Subaccounts.
 */
export default class Subaccount {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }
  /**
   * This document shows you how to create a subaccount on Flutterwave.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/collection-subaccount#create-a-collection-subaccount
   */
  create(data: CreateSubAccountPayload) {
    return create_sub(data, this.rave);
  }
  /**
   * This section describes how to delete a collection subaccount on Flutterwave.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/collection-subaccount/#delete-a-subaccount
   */
  delete(data: IDPayload) {
    return del_sub(data, this.rave);
  }

  /**
   * This section describes how to list all collection subaccounts on Flutterwave.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/collection-subaccount/#fetch-all-subaccounts
   */
  fetch_all(data: FetchSubAccountsPayload) {
    return get_all(data, this.rave);
  }
  /**
   * This section describes how to fetch a collection subaccount on Flutterwave.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/collection-subaccount/#fetch-a-subaccount
   */
  fetch(data: IDPayload) {
    return get(data, this.rave);
  }

  /**
   * This section describes how to update a collection subaccount on Flutterwave.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/collection-subaccount/#update-a-subaccount
   */
  update(data: UpdateSubAccountPayload) {
    return update_sub(data, this.rave);
  }
}
