import { FetchSchema, RefundSchema, FeeSchema } from "../index";

export = Transactions;
declare function Transactions(RaveBase: any): void;
declare class Transactions {
    constructor(RaveBase: any);
    event: (data: FetchSchema) => Promise<any>;
    fee: (data: FeeSchema) => Promise<any>;
    refund: (data: RefundSchema) => Promise<any>;
    resend_hooks: (data: FetchSchema) => Promise<any>;
    fetch: (data: any) => Promise<any>;
    verify: (data: FetchSchema) => Promise<any>;
}




