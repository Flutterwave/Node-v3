import { PlanSchema, FetchSchema, UpdatePlanSchema } from "../index";

export = Payment_plan;
declare function Payment_plan(RaveBase: any): void;
declare class Payment_plan {
    constructor(RaveBase: any);
    create: (data: PlanSchema) => Promise<any>;
    cancel: (data: FetchSchema) => Promise<any>;
    get_all: (data: any) => Promise<any>;
    get_plan: (data: FetchSchema) => Promise<any>;
    update: (data: UpdatePlanSchema) => Promise<any>;
}
