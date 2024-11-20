import { CreateBillSchema, AmountQuerySchema, BulkCreateSchema, CreateOrderSchema, ListSchema, FetchStatusSchema, FetchSchema, UpdateOrderSchema, ValidateBillSchema } from "../index";

export = Bills;
declare function Bills(RaveBase: any): void;
declare class Bills {
    constructor(RaveBase: any);
    create_bill: (data: CreateBillSchema) => Promise<any>;
    amt_to_be_paid: (data: AmountQuerySchema) => Promise<any>;
    create_bulk: (data: BulkCreateSchema) => Promise<any>;
    create_ord_billing: (data: CreateOrderSchema) => Promise<any>;
    fetch_bills: (data: ListSchema) => Promise<any>;
    fetch_bills_Cat: (data: any) => Promise<any>;
    fetch_bills_agencies: (data: any) => Promise<any>;
    fetch_status: (data: FetchStatusSchema) => Promise<any>;
    products_under_agency: (data: FetchSchema) => Promise<any>;
    update_bills: (data: UpdateOrderSchema) => Promise<any>;
    validate: (data: ValidateBillSchema) => Promise<any>;
}
