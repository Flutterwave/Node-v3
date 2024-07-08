export = Bills;
declare function Bills(RaveBase: any): void;
declare class Bills {
    constructor(RaveBase: any);
    create_bill: (data: any) => Promise<any>;
    amt_to_be_paid: (data: any) => Promise<any>;
    create_bulk: (data: any) => Promise<any>;
    create_ord_billing: (data: any) => Promise<any>;
    fetch_bills: (data: any) => Promise<any>;
    fetch_bills_Cat: (data: any) => Promise<any>;
    fetch_bills_agencies: (data: any) => Promise<any>;
    fetch_status: (data: any) => Promise<any>;
    products_under_agency: (data: any) => Promise<any>;
    update_bills: (data: any) => Promise<any>;
    validate: (data: any) => Promise<any>;
}
