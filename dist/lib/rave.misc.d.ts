export = Misc;
declare function Misc(RaveBase: any): void;
declare class Misc {
    constructor(RaveBase: any);
    bal_currency: (data: any) => Promise<any>;
    bal: (data: any) => Promise<any>;
    bvn: (data: any) => Promise<any>;
    verifybvn: (data: any) => Promise<any>;
    verify_Account: (data: any) => Promise<any>;
}
