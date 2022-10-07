import franc from "../services/mobile-money/rave.francophone"
import gh from "../services/mobile-money/rave.ghana"
import mpesa_money from "../services/mobile-money/rave.mpesa"
import rw from "../services/mobile-money/rave.rwanda"
import ug from "../services/mobile-money/rave.uganda"
import { MobileMoneyPayload } from "../services/mobile-money/types"
import RaveBase from "./rave.base"

export default class Mobile_money {
	private rave: RaveBase;
	constructor(arg: RaveBase) {
	  this.rave = arg;
	}
	
	ghana (data: MobileMoneyPayload) {

		return gh(data, this.rave);
	}

	mpesa (data: MobileMoneyPayload) {

		return mpesa_money(data, this.rave);

	}

	rwanda(data: MobileMoneyPayload) {

		return rw(data, this.rave);

	}

	uganda (data: MobileMoneyPayload) {

		return ug(data, this.rave);

	}
	franco_phone (data: MobileMoneyPayload) {

		return franc(data, this.rave);

	}

	zambia(data: MobileMoneyPayload) {

		return zm(data, RaveBase);

	}

}
module.exports = Mobile_money;