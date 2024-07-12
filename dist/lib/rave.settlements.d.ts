import { FetchSchema } from "../index";

export = Settlements;
declare function Settlements(RaveBase: any): void;
declare class Settlements {
    constructor(RaveBase: any);
    fetch_all: (data: any) => Promise<any>;
    fetch: (data: FetchSchema) => Promise<any>;
}

