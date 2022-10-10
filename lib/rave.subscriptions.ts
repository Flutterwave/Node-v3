import activate_sub from '../services/subscriptions/rave.activate';
import cancel_sub from '../services/subscriptions/rave.cancel';
import retrieve_all from '../services/subscriptions/rave.retrieve.all';
import fetch_one from '../services/subscriptions/rave.retrieve.single';
import { SubscriptionPayload } from '../services/subscriptions/types';
import { IDPayload } from '../utils/types';
import RaveBase from './rave.base';

export default class Subscriptions {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }
  activate(data: IDPayload) {
    return activate_sub(data, this.rave);
  }

  cancel(data: IDPayload) {
    return cancel_sub(data, this.rave);
  }

  fetch_all(data: SubscriptionPayload) {
    return retrieve_all(data, this.rave);
  }

  get(data: SubscriptionPayload) {
    return fetch_one(data, this.rave);
  }
}
