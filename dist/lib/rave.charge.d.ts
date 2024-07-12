import { CardChargeSchema, BankChargeSchema, ChargeSchema, UssdChargeSchema, ValidateChargeSchema, ENairaChargeSchema } from "../index";

export = Charge;
declare function Charge(RaveBase: any): void;
declare class Charge {
    constructor(RaveBase: any);
    card: (data: CardChargeSchema) => Promise<any>;
    ng: (data: BankChargeSchema) => Promise<any>;
    ach: (data: ChargeSchema) => Promise<any>;
    uk: (data: BankChargeSchema) => Promise<any>;
    ussd: (data: UssdChargeSchema) => Promise<any>;
    validate: (data: ValidateChargeSchema) => Promise<any>;
    bank_transfer: (data: ChargeSchema) => Promise<any>;
    applepay: (data: ChargeSchema) => Promise<any>;
    googlepay: (data: ChargeSchema) => Promise<any>;
    enaira: (data: ENairaChargeSchema) => Promise<any>;
    fawrypay: (data: BankChargeSchema) => Promise<any>;
}
