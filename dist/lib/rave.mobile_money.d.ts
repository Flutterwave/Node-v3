export = Mobile_money;
declare function Mobile_money(RaveBase: any): void;
declare class Mobile_money {
    constructor(RaveBase: any);
    ghana: (data: any) => Promise<any>;
    mpesa: (data: any) => Promise<any>;
    rwanda: (data: any) => Promise<any>;
    uganda: (data: any) => Promise<any>;
    franco_phone: (data: any) => Promise<any>;
    zambia: (data: any) => Promise<any>;
    tanzania: (data: any) => Promise<any>;
}
