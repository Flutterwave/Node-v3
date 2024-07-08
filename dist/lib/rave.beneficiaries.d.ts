export = Beneficiaries;
declare function Beneficiaries(RaveBase: any): void;
declare class Beneficiaries {
    constructor(RaveBase: any);
    create: (data: any) => Promise<any>;
    delete: (data: any) => Promise<any>;
    fetch_all: (data: any) => Promise<any>;
    fetch: (data: any) => Promise<any>;
}
