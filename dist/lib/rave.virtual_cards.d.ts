import { Card, Fund, FetchSchema, Block, UnBlock, ListSchema, Withdraw } from "../index";

export = Virtual_card;
declare function Virtual_card(RaveBase: any): void;
declare class Virtual_card {
    constructor(RaveBase: any);
    create: (data: Card) => Promise<any>;
    fund: (data: Fund) => Promise<any>;
    fetch_all: (data: any) => Promise<any>;
    fetch: (data: FetchSchema) => Promise<any>;
    block: (data: Block) => Promise<any>;
    unblock: (data: UnBlock) => Promise<any>;
    terminate: (data: FetchSchema) => Promise<any>;
    transactions: (data: ListSchema) => Promise<any>;
    withdraw_funds: (data: Withdraw) => Promise<any>;
}


