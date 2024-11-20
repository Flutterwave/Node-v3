import { FetchSchema, ListSchema } from "../index";

export = Subscriptions;
declare function Subscriptions(RaveBase: any): void;
declare class Subscriptions {
    constructor(RaveBase: any);
    activate: (data: FetchSchema) => Promise<any>;
    cancel: (data: FetchSchema) => Promise<any>;
    fetch_all: (data: any) => Promise<any>;
    get: (data: ListSchema) => Promise<any>;
}
