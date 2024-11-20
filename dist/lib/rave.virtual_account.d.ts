import { BulkAccount, Account, FetchAccount, FetchBulkAccount } from "../index";

export = Virtual_account;
declare function Virtual_account(RaveBase: any): void;
declare class Virtual_account {
    constructor(RaveBase: any);
    create_bulk: (data: BulkAccount) => Promise<any>;
    create: (data: Account) => Promise<any>;
    fetch: (data: FetchAccount) => Promise<any>;
    fetch_bulk: (data: FetchBulkAccount) => Promise<any>;
}

