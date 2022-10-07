import get_bal from '../services/misc/rave.balances';
import balances_currency from '../services/misc/rave.balances-currency';
import bankBVN from '../services/misc/rave.bvn';
import { BalanceCurrencyPayload, BVNPayload } from '../services/misc/types';
import RaveBase from './rave.base';

const resolve_act = require('../services/misc/rave.resolve.account')


export default class Misc {
	private rave: RaveBase;
	constructor(arg: RaveBase) {
	  this.rave = arg;
	}
	bal_currency (data: BalanceCurrencyPayload) {

		return balances_currency(data, this.rave);
	}

	bal (data?: {}) {

		return get_bal(data, this.rave);
	}

	bvn (data: BVNPayload) {

		return bankBVN(data, this.rave);

	}

	verify_Account (data) {

		return resolve_act(data, RaveBase);

	}
}