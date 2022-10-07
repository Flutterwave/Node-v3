import order_ebills from '../services/ebills/rave.order';
import update_ebills from '../services/ebills/rave.update';
import { eBillPayload, UpdateEBillsPayload } from '../services/ebills/types';
import RaveBase from './rave.base';

export default class Ebills {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }
  order(data: eBillPayload) {
    return order_ebills(data, this.rave);
  }

  update(data: UpdateEBillsPayload) {
    return update_ebills(data, this.rave);
  }
}
