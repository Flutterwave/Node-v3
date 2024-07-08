export = Tokenized;
declare function Tokenized(RaveBase: any): void;
declare class Tokenized {
    constructor(RaveBase: any);
    charge: (data: any) => Promise<any>;
    fetch_bulk: (data: any) => Promise<any>;
    bulk: (data: any) => Promise<any>;
    fetch_charge_transactions: (data: any) => Promise<any>;
    update_token: (data: any) => Promise<any>;
}
