export = Ebills;
declare function Ebills(RaveBase: any): void;
declare class Ebills {
    constructor(RaveBase: any);
    order: (data: any) => Promise<any>;
    update: (data: any) => Promise<any>;
}
