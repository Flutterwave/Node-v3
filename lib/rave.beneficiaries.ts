import create_beneficiary from '../services/beneficiaries/rave.create';
import del_beneficiary from '../services/beneficiaries/rave.delete';
import retrieve_all from '../services/beneficiaries/rave.retrieve';
import retrieve from '../services/beneficiaries/rave.single.retrieve';
import { BeneficiariesCreatePayload } from '../services/beneficiaries/types';
import { IDPayload } from '../utils/types';
import RaveBase from './rave.base';

export default class Beneficiaries {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }
  /**
   * This section describes how to create beneficiaries for Transfers.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/beneficiaries#create-a-transfer-beneficiary
   */
  create(data: BeneficiariesCreatePayload) {
    return create_beneficiary(data, this.rave);
  }

  /**
   * This section describes how to remove a beneficiary from your beneficiary list
   *
   * @link https://developer.flutterwave.com/reference/endpoints/beneficiaries#delete-a-transfer-beneficiary
   */
  delete(data: { id: string }) {
    return del_beneficiary(data, this.rave);
  }

  /**
   * This section describes how to get all beneficiaries saves for Transfers.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/beneficiaries#list-all-transfer-beneficiaries
   */
  fetch_all(data: {
    /**
     * This is the page number to retrieve e.g. setting 1 retrieves the first page
     */
    page: number;
  }) {
    return retrieve_all(data, this.rave);
  }

  /**
   * This section describes how to get all details for a particular beneficiary.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/beneficiaries#fetch-a-transfer-beneficiary
   */
  fetch(data: IDPayload) {
    return retrieve(data, this.rave);
  }
}
