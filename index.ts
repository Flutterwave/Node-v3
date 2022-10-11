import Bank from './lib/rave.banks';
import RaveBase from './lib/rave.base';
import Beneficiaries from './lib/rave.beneficiaries';
import Bills from './lib/rave.bills';
import Charge from './lib/rave.charge';
import Custom from './lib/rave.custom';
import Ebills from './lib/rave.ebills';
import Misc from './lib/rave.misc';
import Mobile_money from './lib/rave.mobile_money';
import Otp from './lib/rave.otps';
import Payment_plan from './lib/rave.payment_plan';
import Settlements from './lib/rave.settlements';
import Subaccount from './lib/rave.subaccount';
import Subscriptions from './lib/rave.subscriptions';
import Tokenized from './lib/rave.tokenized';
import Transactions from './lib/rave.transactions';
import Transfers from './lib/rave.transfers';
import Virtual_account from './lib/rave.virtual_account';
import Virtual_card from './lib/rave.virtual_cards';

 export default class Rave {
  private rave: RaveBase;
  public Bank: Bank;
  public Beneficiary: Beneficiaries;
  public Bills: Bills;
  public Charge: Charge;
  public Ebills: Ebills;
  public Misc: Misc;
  public MobileMoney: Mobile_money;
  public security: any;
  public CustomRequest: Custom;
  public Otp: Otp;
  public PaymentPlan: Payment_plan;
  public Settlement: Settlements;
  public Subscription: Subscriptions;
  public Subaccount: Subaccount;
  public Tokenized: Tokenized;
  public Transaction: Transactions;
  public Transfer: Transfers;
  public VirtualAcct: Virtual_account;
  public VirtualCard: Virtual_card;

  constructor(
    public_key: string,
    public_secret: string,
    base_url_or_production_flag?: string,
  ) {
    this.rave = new RaveBase(
      public_key,
      public_secret,
      base_url_or_production_flag,
    );
    this.Bank = new Bank(this.rave);
    this.Beneficiary = new Beneficiaries(this.rave);
    this.Bills = new Bills(this.rave);
    this.Charge = new Charge(this.rave);
    this.Ebills = new Ebills(this.rave);
    this.Misc = new Misc(this.rave);
    this.MobileMoney = new Mobile_money(this.rave);
    //@ts-ignore
    this.security = require('./lib/security');
    this.CustomRequest = new Custom(this.rave);
    this.Otp = new Otp(this.rave);
    this.PaymentPlan = new Payment_plan(this.rave);
    this.Settlement = new Settlements(this.rave);
    this.Subscription = new Subscriptions(this.rave);
    this.Subaccount = new Subaccount(this.rave);
    this.Tokenized = new Tokenized(this.rave);
    this.Transaction = new Transactions(this.rave);
    this.Transfer = new Transfers(this.rave);
    this.VirtualAcct = new Virtual_account(this.rave);
    this.VirtualCard = new Virtual_card(this.rave);
  }

  getIntegrityHash(data: any) {
    return this.rave.getIntegrityHash(data);
  }
}

module.exports = Rave