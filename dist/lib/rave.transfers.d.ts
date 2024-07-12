import { FetchSchema, TransferSchema, BulkTransfer, ListSchema, WalletTransfer } from "../index";

export = Transfers;
declare function Transfers(RaveBase: any): void;
declare class Transfers {
    constructor(RaveBase: any);
    bulk: (data: BulkTransfer) => Promise<any>;
    fee: (data: ListSchema) => Promise<any>;
    initiate: (data: TransferSchema) => Promise<any>;
    fetch: (data: any) => Promise<any>;
    get_a_transfer: (data: FetchSchema) => Promise<any>;
    wallet_to_wallet: (data: WalletTransfer) => Promise<any>;
}

