import { FetchSchema, BeneficiarySchema } from "../index";

export = Beneficiaries;
declare function Beneficiaries(RaveBase: any): void;
declare class Beneficiaries {
    constructor(RaveBase: any);
    create: (data: BeneficiarySchema) => Promise<any>;
    delete: (data: FetchSchema) => Promise<any>;
    fetch_all: (data: any) => Promise<any>;
    fetch: (data: FetchSchema) => Promise<any>;
}
