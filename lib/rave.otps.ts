import create_otp from "../services/otps/rave.create";
import validate_otp from "../services/otps/rave.validate";
import { CreateOTPPayload } from "../services/otps/types";
import RaveBase from "./rave.base";

export default class Otp {
	private rave: RaveBase;
	constructor(arg: RaveBase) {
	  this.rave = arg;
	}
	create (data: CreateOTPPayload) {

		return create_otp(data, this.rave);

	}

	validate(data) {

		return validate_otp(data, this.rave);

	}



}