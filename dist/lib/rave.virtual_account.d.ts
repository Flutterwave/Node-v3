export = Virtual_account;
declare function Virtual_account(RaveBase: any): void;
declare class Virtual_account {
    constructor(RaveBase: any);
    create_bulk: (data: any) => Promise<any>;
    create: (data: any) => Promise<any>;
    fetch: (data: any) => Promise<any>;
    fetch_bulk: (data: any) => Promise<any>;
}
