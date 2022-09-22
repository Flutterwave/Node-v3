import create_beneficiary from '../services/beneficiaries/rave.create';
import del_beneficiary from '../services/beneficiaries/rave.delete';
import retrieve_all from '../services/beneficiaries/rave.retrieve';
import retrieve from '../services/beneficiaries/rave.single.retrieve';
import { BeneficiariesCreatePayload } from '../services/beneficiaries/types';
import RaveBase from './rave.base';


export default class Beneficiaries {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }

  create(data: BeneficiariesCreatePayload) {
    return create_beneficiary(data, this.rave);
  }

  delete(data: {id: string}) {
    return del_beneficiary(data, this.rave);
  }
  fetch_all() {
    return retrieve_all({}, this.rave);
  }
  fetch(data: {id: string}) {
    return retrieve(data, this.rave);
  }
}
