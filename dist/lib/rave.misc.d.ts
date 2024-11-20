import { FetchBalanceSchema, InitiateBvnSchema, VerifyBvnConsentSchema, ResolveAccountSchema } from "../index";

export = Misc;
declare function Misc(RaveBase: any): void;
declare class Misc {
    constructor(RaveBase: any);
    bal_currency: (data: FetchBalanceSchema) => Promise<any>;
    bal: (data: any) => Promise<any>;
    bvn: (data: InitiateBvnSchema) => Promise<any>;
    verifybvn: (data: VerifyBvnConsentSchema) => Promise<any>;
    verify_Account: (data: ResolveAccountSchema) => Promise<any>;
}
