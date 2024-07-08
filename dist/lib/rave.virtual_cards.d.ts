export = Virtual_card;
declare function Virtual_card(RaveBase: any): void;
declare class Virtual_card {
    constructor(RaveBase: any);
    create: (data: any) => Promise<any>;
    fund: (data: any) => Promise<any>;
    fetch_all: (data: any) => Promise<any>;
    fetch: (data: any) => Promise<any>;
    block: (data: any) => Promise<any>;
    unblock: (data: any) => Promise<any>;
    terminate: (data: any) => Promise<any>;
    transactions: (data: any) => Promise<any>;
    withdraw_funds: (data: any) => Promise<any>;
}
