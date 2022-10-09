import retrieve from '../services/settlements/rave.retrieve';
import retrieve_all from '../services/settlements/rave.retrieve-all';
import {
  RetrieveSettlementPayload,
  SettlementsPayload,
} from '../services/settlements/types';
import RaveBase from './rave.base';

export default class Settlements {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }
  fetch_all(data: SettlementsPayload) {
    return retrieve_all(data, this.rave);
  }

  fetch(data: RetrieveSettlementPayload) {
    return retrieve(data, this.rave);
  }
}
