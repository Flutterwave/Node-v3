export = Subaccount;
declare function Subaccount(RaveBase: any): void;
declare class Subaccount {
    constructor(RaveBase: any);
    create: (data: any) => Promise<any>;
    delete: (data: any) => Promise<any>;
    fetch_all: (data: any) => Promise<any>;
    fetch: (data: any) => Promise<any>;
    update: (data: any) => Promise<any>;
}
