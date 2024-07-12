export default Rave;
declare class Rave {
    constructor(public_key: string, public_secret: string, base_url_or_production_flag?: any);
    Bank: bank;
    Beneficiary: beneficiary;
    Bills: bills;
    Charge: charge;
    Ebills: ebills;
    Misc: misc;
    MobileMoney: mobile_money;
    security: {
        getEncryptionKey: (seckey: any) => any;
        encrypt: (key: any, text: any) => any;
        getIntegrityHash: (data: any, pubkey: any, seckey: any) => any;
    };
    Otp: otps;
    PaymentPlan: payment_plan;
    Settlement: settlement;
    Subscription: subscription;
    Subaccount: subaccount;
    Tokenized: tokenized;
    Transaction: transaction;
    Transfer: transfer;
    VirtualAcct: virtual_acct;
    VirtualCard: virtual_card;
    getIntegrityHash: (data: any) => any;
}
import bank = require("./lib/rave.banks");
import beneficiary = require("./lib/rave.beneficiaries");
import bills = require("./lib/rave.bills");
import charge = require("./lib/rave.charge");
import ebills = require("./lib/rave.ebills");
import misc = require("./lib/rave.misc");
import mobile_money = require("./lib/rave.mobile_money");
import otps = require("./lib/rave.otps");
import payment_plan = require("./lib/rave.payment_plan");
import settlement = require("./lib/rave.settlements");
import subscription = require("./lib/rave.subscriptions");
import subaccount = require("./lib/rave.subaccount");
import tokenized = require("./lib/rave.tokenized");
import transaction = require("./lib/rave.transactions");
import transfer = require("./lib/rave.transfers");
import virtual_acct = require("./lib/rave.virtual_account");
import virtual_card = require("./lib/rave.virtual_cards");

export type CreateOTPSchema = {
    length: number;
    customer: Customer;
    sender: string;
    send: boolean;
    medium: Array<"email" | "whatsapp" | "sms">;
    expiry?: number;
};

type Customer = {
    name: string;
    email: string;
    phone: string;
};

export type ValidateSchema = {
    reference: string,
    otp: number,
};

type Interval = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";

export type PlanSchema = {
    amount?: number;
    name: string;
    interval: Interval;
    duration?: string;
    currency?: string;
}


export type FetchSchema = {
    id: number
}

export type UpdatePlanSchema = {
    id: string;
    name: string;
    status: 'active' | 'cancelled';
}

export type SubaccountSchema = {
    account_bank: string;
    account_number: string;
    business_name: string;
    split_value: number;
    business_mobile: string;
    business_email?: string;
    business_contact?: string;
    business_contact_mobile?: string;
    country?: string;
    meta?: Record<string, any>[];
    split_type?: 'percentage' | 'flat';
};

export type ListSchema = {
    id?: string;
    page?: string;
    index?: string;
    size?: string;
    from?: string;
    to?: string;
    bulk_id?: string;
    reference?: string;
    tx_ref?: string;
    currency?: string;
    country?: string;
    amount?: number;
    status?: string;
    interval?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    account_bank?: string;
    account_number?: string;
    bank_name?: string;
    split_value?: number;
    business_name?: string;
    business_email?: string;
    split_type?: 'percentage' | 'flat';
    subscribed_from?: string;
    subscribed_to?: string;
    plan?: string;
    customer_fullname?: string;
    email?: string;
    airtime?: number;
    data_bundle?: number;
    power?: number;
    internet?: number;
    toll?: number;
    cable?: number;
};

export type TokenSchema = {
    token: string;
    currency: string;
    country?: string;
    amount: number;
    email: string;
    full_name?: string;
    ip?: string;
    narration: string;
    device_fingerprint?: string;
    tx_ref: string;
    do_3ds?: boolean;
    preauthorize?: boolean;
    redirect_url?: string;
};

export type RetrieveSchema = {
    bulk_id: string;
}

type BulkTokenDataSchema = {
    token: string;
    currency: string;
    country?: string;
    amount: number;
    email: string;
    full_name?: string;
    ip?: string;
    tx_ref: string;
};

type RetryStrategy = {
    retry_interval: number;
    retry_amount_variable: number;
    retry_attempt_variable: number;
    last_attempt_variable: number;
};

export type BulkTokenSchema = {
    title?: string;
    retry_strategy: RetryStrategy;
    bulk_data: BulkTokenDataSchema[];
};

export type UpdateTokenSchema = {
    token: string;
    email: string;
    phone_number: string;
    full_name: string;
};

export type RefundSchema = {
    id: string;
    amount: number;
}

export type FeeSchema = {
    currency: string;
    amount: number;
    payment_type?: 'card' | 'debit_ng_account' | 'mobilemoney' | 'bank_transfer' | 'ach_payment';
    card_first6digits?: string;
};

type MetaItemEUR = {
    AccountNumber: string;
    RoutingNumber: string;
    SwiftCode: string;
    BankName: string;
    BeneficiaryName: string;
    BeneficiaryCountry: string;
    PostalCode: string;
    StreetNumber: string;
    StreetName: string;
    City: string;
};

type MetaItemGBP = MetaItemEUR;

type MetaItemUSD = {
    AccountNumber: string;
    RoutingNumber: string;
    SwiftCode: string;
    BankName: string;
    BeneficiaryName: string;
    BeneficiaryAddress: string;
    BeneficiaryCountry: string;
};

type MetaItemKES = {
    sender: string;
    mobile_number: string;
    sender_country: string;
};

export type TransferSchema = {
    amount: number;
    currency: string;
    account_bank?: string;
    account_number?: string;
    narration?: string;
    debit_subaccount?: string;
    debit_currency?: string;
    reference?: string;
    beneficiary?: number;
    beneficiary_name?: string;
    destination_branch_code?: string;
    callback_url?: string;
    meta?: MetaItemEUR[] | MetaItemGBP[] | MetaItemUSD[] | MetaItemKES[] | [];
};

type ModifiedTransfer = TransferSchema & {
    bank_code?: string;
};

export type BulkTransfer = {
    title: string;
    bulk_data: ModifiedTransfer[];
};

export type WalletTransfer = {
    amount: number;
    currency: string;
    account_bank: string;
    account_number: string;
    narration: string;
    debit_subaccount?: string;
    debit_currency: string;
    reference: string;
};

export type Account = {
    email: string;
    is_permanent: boolean;
    bvn?: string;
    duration?: string;
    frequency?: string;
    narration?: string;
    tx_ref?: string;
    amount?: number;
};

export type BulkAccount = {
    email: string;
    is_permanent: boolean;
    bvn?: string;
    accounts: string;
    frequency?: string;
    tx_ref?: string;
    amount?: number;
}

export type FetchAccount = {
    order_ref: string;
}

export type FetchBulkAccount = {
    batch_id: string;
}

export type Card = {
    currency: string;
    amount: number;
    debit_currency: string;
    billing_name?: string;
    billing_address?: string;
    billing_city?: string;
    billing_state?: string;
    billing_postal_code?: string;
    billing_country?: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    email: string;
    phone: string;
    title: string;
    gender: string;
    callback_url?: string;
};

export type Fund = {
    id: string;
    debit_currency: string;
    anount: number;
}

export type Block = {
    id: string;
    status_action: string;
}

export type UnBlock = Block

export type Withdraw = {
    id: string;
    anount: number;
}