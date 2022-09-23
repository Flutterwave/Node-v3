import ach_payment from "../services/charge/rave.ach"
import bank_trans from "../services/charge/rave.bank.transfer"
import card_charge from "../services/charge/rave.card.charge"
import ng_banks from "../services/charge/rave.ng-banks"
import uk_bank from "../services/charge/rave.uk-banks"
import ussd_Charge from "../services/charge/rave.ussd"
import validate_charge from "../services/charge/rave.validate"
import voucher_charge from "../services/charge/rave.voucher"
import { BankTranferPayload, CardChargePayload, NGBanksPayload, ValidateChargePayload, VoucherPayload } from "../services/charge/types"
import RaveBase from "./rave.base"

export default class Charge {
	private rave: RaveBase;
	constructor(arg: RaveBase) {
	  this.rave = arg;
	}
	card (data:CardChargePayload) {

		return card_charge(data, this.rave);

	}

	ng(data: NGBanksPayload) {

		return ng_banks(data, this.rave);

	}
		
	ach (data: BankTranferPayload) {

		return ach_payment(data, this.rave);

	}

	uk(data: BankTranferPayload) {

		return uk_bank(data, this.rave);

	}

	ussd (data: NGBanksPayload) {

		return ussd_Charge(data, this.rave);

	}

	validate (data: ValidateChargePayload) {

		return validate_charge(data, this.rave);

	}

	voucher (data: VoucherPayload) {

		return voucher_charge(data, this.rave);

	}
	bank_transfer (data: BankTranferPayload) {

		return bank_trans(data, this.rave);

	}

}