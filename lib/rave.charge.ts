import ach_payment from '../services/charge/rave.ach';
import bank_trans from '../services/charge/rave.bank.transfer';
import card_charge from '../services/charge/rave.card.charge';
import ng_banks from '../services/charge/rave.ng-banks';
import uk_bank from '../services/charge/rave.uk-banks';
import ussd_Charge from '../services/charge/rave.ussd';
import validate_charge from '../services/charge/rave.validate';
import voucher_charge from '../services/charge/rave.voucher';
import {
  BankTranferPayload,
  CardChargePayload,
  NGBanksPayload,
  ValidateChargePayload,
  VoucherPayload,
} from '../services/charge/types';
import RaveBase from './rave.base';

export default class Charge {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }
  /**
   * Initiate debit and credit card payments. We recommend you read the method overview before you proceed.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/charge#card
   */
  card(data: CardChargePayload) {
    return card_charge(data, this.rave);
  }
  /**
   * This payment method helps you charge Nigerian bank accounts using Flutterwave. We recommend you read the method overview before you proceed.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/charge#charge-nigerian-bank-accounts
   */
  ng(data: NGBanksPayload) {
    return ng_banks(data, this.rave);
  }
  
  /**
   * This payment method allows you to collect USD and ZAR payments via ACH. We recommend you read the method overview before you proceed.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/charge#ach-payments 
   */
  ach(data: BankTranferPayload) {
    return ach_payment(data, this.rave);
  }
  /**
   * This payment method helps you charge UK Bank accounts using Flutterwave. We recommend you read the method overview before you proceed.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/charge#charge-uk-bank-accounts
   */
  uk(data: BankTranferPayload) {
    return uk_bank(data, this.rave);
  }
  /**
   * This method allows you to generate USSD strings for payments. We recommend you read the method overview before you proceed.
   * 
   * https://developer.flutterwave.com/reference/endpoints/charge#charge-via-ussd
   */
  ussd(data: NGBanksPayload) {
    return ussd_Charge(data, this.rave);
  }
  /**
   * This method validates a charge
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/validate-charge
   */
  validate(data: ValidateChargePayload) {
    return validate_charge(data, this.rave);
  }
  voucher(data: VoucherPayload) {
    return voucher_charge(data, this.rave);
  }
  /**
   * This payment method allows you to collect payments via bank transfers. We recommend you read the method overview before you proceed.
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/charge#charge-via-bank-transfer
   */
  bank_transfer(data: BankTranferPayload) {
    return bank_trans(data, this.rave);
  }
}
