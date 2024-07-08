export = Payment_plan;
declare function Payment_plan(RaveBase: any): void;
declare class Payment_plan {
    constructor(RaveBase: any);
    create: (data: any) => Promise<any>;
    cancel: (data: any) => Promise<any>;
    get_all: (data: any) => Promise<any>;
    get_plan: (data: any) => Promise<any>;
    update: (data: any) => Promise<any>;
}
