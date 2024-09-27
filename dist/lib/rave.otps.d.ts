import { CreateOTPSchema, ValidateSchema } from "../index";

export = Otp;
declare function Otp(RaveBase: any): void;
declare class Otp {
    constructor(RaveBase: any);
    create: (data: CreateOTPSchema) => Promise<any>;
    validate: (data: ValidateSchema) => Promise<any>;
}