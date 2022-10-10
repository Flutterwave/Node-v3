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
import RaveBase from './rave.base';

export default class Subaccount {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }

  create(data: CreateSubAccountPayload) {
    return create_sub(data, this.rave);
  }

  delete(data: { id: string }) {
    return del_sub(data, this.rave);
  }

  fetch_all(data: FetchSubAccountsPayload) {
    return get_all(data, this.rave);
  }

  fetch(data: { id: string }) {
    return get(data, this.rave);
  }

  update(data: UpdateSubAccountPayload) {
    return update_sub(data, this.rave);
  }
}
