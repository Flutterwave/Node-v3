export = Transactions;
declare function Transactions(RaveBase: any): void;
declare class Transactions {
    constructor(RaveBase: any);
    event: (data: any) => Promise<any>;
    fee: (data: any) => Promise<any>;
    refund: (data: any) => Promise<any>;
    resend_hooks: (data: any) => Promise<any>;
    fetch: (data: any) => Promise<any>;
    verify: (data: any) => Promise<any>;
}
