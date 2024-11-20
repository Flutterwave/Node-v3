import { FetchSchema, ListSchema } from "../index";

export = Bank;
declare function Bank(RaveBase: any): void;
declare class Bank {
    constructor(RaveBase: any);
    branches: (data: FetchSchema) => Promise<any>;
    country: (data: ListSchema) => Promise<any>;
}
