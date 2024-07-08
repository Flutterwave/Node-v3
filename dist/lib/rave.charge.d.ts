export = Charge;
declare function Charge(RaveBase: any): void;
declare class Charge {
    constructor(RaveBase: any);
    card: (data: any) => Promise<any>;
    ng: (data: any) => Promise<any>;
    ach: (data: any) => Promise<any>;
    uk: (data: any) => Promise<any>;
    ussd: (data: any) => Promise<any>;
    validate: (data: any) => Promise<any>;
    bank_transfer: (data: any) => Promise<any>;
    applepay: (data: any) => Promise<any>;
    googlepay: (data: any) => Promise<any>;
    enaira: (data: any) => Promise<any>;
    fawrypay: (data: any) => Promise<any>;
}
