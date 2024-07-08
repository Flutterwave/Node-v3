export = Bank;
declare function Bank(RaveBase: any): void;
declare class Bank {
    constructor(RaveBase: any);
    branches: (data: any) => Promise<any>;
    country: (data: any) => Promise<any>;
}
