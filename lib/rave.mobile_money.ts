import franc from "../services/mobile-money/rave.francophone"
import gh from "../services/mobile-money/rave.ghana"
import mpesa_money from "../services/mobile-money/rave.mpesa"
import rw from "../services/mobile-money/rave.rwanda"
import ug from "../services/mobile-money/rave.uganda"
import zm from "../services/mobile-money/rave.zambia"
import { MobileMoneyPayload } from "../services/mobile-money/types"
import RaveBase from "./rave.base"

export default class Mobile_money {
	private rave: RaveBase;
	constructor(arg: RaveBase) {
	  this.rave = arg;
	}
	/**
	 * This payment method allows you to recieve GHS payments via Mobile Money. We recommend you read the method overview before you proceed.
	 * 
	 * @link https://developer.flutterwave.com/reference/endpoints/charge#ghana-mobile-money 
	 */
	ghana (data: MobileMoneyPayload) {

		return gh(data, this.rave);
	}

	/**
	 * This payment method allows you to receive KES payments via Mpesa. We recommend you read the method overview before you proceed.
	 * 
	 * @link https://developer.flutterwave.com/reference/endpoints/charge#mpesa
	 */

	mpesa (data: MobileMoneyPayload) {

		return mpesa_money(data, this.rave);

	}

	/**
	 * This payment method allows you to collect payments via Rwandan Mobile Money. We recommend you read the method overview before you proceed.
	 * 
	 * @link https://developer.flutterwave.com/reference/endpoints/charge#rwanda-mobile-money
	 */

	rwanda(data: MobileMoneyPayload) {

		return rw(data, this.rave);

	}

	/**
	 * This payment method allows you to receive payments via Uganda Mobile Money. We recommend you read the method overview before you proceed.
	 * 
	 * @link This payment method allows you to receive payments via Uganda Mobile Money. We recommend you read the method overview before you proceed.
	 */

	uganda (data: MobileMoneyPayload) {

		return ug(data, this.rave);

	}

	/**
	 * This payment method allows you to collect payments via mobile money in Francophone countries. We recommend you read the method overview before you proceed.
	 * 
	 * @link https://developer.flutterwave.com/reference/endpoints/charge#francophone-mobile-money
	 */
	franco_phone (data: MobileMoneyPayload) {

		return franc(data, this.rave);

	}

	/**
	 * This payment method allows you to collect payments via Zambia Mobile Money. We recommend you read the method overview before you proceed.
	 * 
	 * @link https://developer.flutterwave.com/reference/endpoints/charge#zambia-mobile-money
	 */
	zambia(data: MobileMoneyPayload) {

		return zm(data, this.rave);

	}

}