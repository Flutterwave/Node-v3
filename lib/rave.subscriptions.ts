import activate_sub from '../services/subscriptions/rave.activate';
import cancel_sub from '../services/subscriptions/rave.cancel';
import retrieve_all from '../services/subscriptions/rave.retrieve.all';
import fetch_one from '../services/subscriptions/rave.retrieve.single';
import { SubscriptionPayload } from '../services/subscriptions/types';
import { IDPayload } from '../utils/types';
import RaveBase from './rave.base';

/**
 * This class has methods that are critical for managing user subscriptions.
 * With these methods, You can query your existing subscriptions, as well as activate or deactivate a user's subscription.
 */
export default class Subscriptions {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }
  /**
   * This section describes how to activate a previously cancelled subscription.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/subscriptions#activate-a-subscription
   */
  activate(data: IDPayload) {
    return activate_sub(data, this.rave);
  }

  /**
   * This section describes how to deactivate an active subscription.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/subscriptions#deactivate-a-subscription
   */
  cancel(data: IDPayload) {
    return cancel_sub(data, this.rave);
  }
  /**
   * This endpoint allows the developers to query all subscribers (cancelled subscriber included).
   * You can do a single or bulk query with the endpoint depending on your use case.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/subscriptions#get-all-subscriptions
   */
  fetch_all(data: SubscriptionPayload) {
    return retrieve_all(data, this.rave);
  }
  /**
   * This endpoint allows the developers to query all subscribers (cancelled subscriber included).
   * You can do a single or bulk query with the endpoint depending on your use case.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/subscriptions#get-all-subscriptions
   */
  get(data: { email: string }) {
    return fetch_one(data, this.rave);
  }
}
