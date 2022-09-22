import { banks_branches } from '../services/banks/rave.banks-branches';
import banks_country from '../services/banks/rave.banks-country';
import { CountryCodes } from '../utils/types';
import RaveBase from './rave.base';

export default class Bank {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }

  branches(data: { id: number }) {
    return banks_branches(data, this.rave);
  }

  country(data: { country: CountryCodes }) {
    return banks_country(data, this.rave);
  }
}
