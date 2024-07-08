export = Transfers;
declare function Transfers(RaveBase: any): void;
declare class Transfers {
    constructor(RaveBase: any);
    bulk: (data: any) => Promise<any>;
    fee: (data: any) => Promise<any>;
    initiate: (data: any) => Promise<any>;
    fetch: (data: any) => Promise<any>;
    get_a_transfer: (data: any) => Promise<any>;
    wallet_to_wallet: (data: any) => Promise<any>;
}
