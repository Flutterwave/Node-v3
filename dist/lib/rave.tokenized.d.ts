import { TokenSchema, RetrieveSchema, BulkTokenSchema, UpdateTokenSchema } from "../index";

export = Tokenized;
declare function Tokenized(RaveBase: any): void;
declare class Tokenized {
    constructor(RaveBase: any);
    charge: (data: TokenSchema) => Promise<any>;
    fetch_bulk: (data: RetrieveSchema) => Promise<any>;
    bulk: (data: BulkTokenSchema) => Promise<any>;
    fetch_charge_transactions: (data: RetrieveSchema) => Promise<any>;
    update_token: (data: UpdateTokenSchema) => Promise<any>;
}

