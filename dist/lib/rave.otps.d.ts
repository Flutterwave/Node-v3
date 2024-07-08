export = Otp;
declare function Otp(RaveBase: any): void;
declare class Otp {
    constructor(RaveBase: any);
    create: (data: any) => Promise<any>;
    validate: (data: any) => Promise<any>;
}
