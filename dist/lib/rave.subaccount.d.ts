import { FetchSchema, SubaccountSchema, ListSchema } from "../index";

export = Subaccount;
declare function Subaccount(RaveBase: any): void;
declare class Subaccount {
    constructor(RaveBase: any);
    create: (data: SubaccountSchema) => Promise<any>;
    delete: (data: FetchSchema) => Promise<any>;
    fetch_all: (data: any) => Promise<any>;
    fetch: (data: FetchSchema) => Promise<any>;
    update: (data: ListSchema) => Promise<any>;
}
