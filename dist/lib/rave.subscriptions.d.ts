export = Subscriptions;
declare function Subscriptions(RaveBase: any): void;
declare class Subscriptions {
    constructor(RaveBase: any);
    activate: (data: any) => Promise<any>;
    cancel: (data: any) => Promise<any>;
    fetch_all: (data: any) => Promise<any>;
    get: (data: any) => Promise<any>;
}
