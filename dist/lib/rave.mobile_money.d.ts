import { MomoSchema } from "../index";

export = Mobile_money;
declare function Mobile_money(RaveBase: any): void;
declare class Mobile_money {
    constructor(RaveBase: any);
    ghana: (data: MomoSchema) => Promise<any>;
    mpesa: (data: MomoSchema) => Promise<any>;
    rwanda: (data: MomoSchema) => Promise<any>;
    uganda: (data: MomoSchema) => Promise<any>;
    franco_phone: (data: MomoSchema) => Promise<any>;
    zambia: (data: MomoSchema) => Promise<any>;
    tanzania: (data: MomoSchema) => Promise<any>;
}
