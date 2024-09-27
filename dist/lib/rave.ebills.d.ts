import { CreateEBillOrder, UpdateEBillOrder } from "../index";

export = Ebills;
declare function Ebills(RaveBase: any): void;
declare class Ebills {
    constructor(RaveBase: any);
    order: (data: CreateEBillOrder) => Promise<any>;
    update: (data: UpdateEBillOrder) => Promise<any>;
}


