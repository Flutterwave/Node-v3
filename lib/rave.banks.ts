import { banks_branches } from '../services/banks/rave.banks-branches';
import banks_country from '../services/banks/rave.banks-country';
import { CountryCodes } from '../utils/types';
import RaveBase from './rave.base';

export default class Bank {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }
  /**
   * This section describes how to get bank branch details for the specified Bank.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/banks#get-bank-branches
   */
  branches(data: { id: number }) {
    return banks_branches(data, this.rave);
  }

  /**
   * This section describes how to get bank details for all Banks in the specified Country. This API returns all the Banks information in a country.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/banks#get-all-banks
   */
  country(data: { country: CountryCodes }) {
    return banks_country(data, this.rave);
  }
}
