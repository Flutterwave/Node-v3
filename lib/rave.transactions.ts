import event_trans from '../services/transactions/rave.events';
import fee_trans from '../services/transactions/rave.fee';
import refund_trans from '../services/transactions/rave.refund';
import resend_hooks_trans from '../services/transactions/rave.resend-hooks';
import retrieve_trans from '../services/transactions/rave.retrieve';
import verify_trans from '../services/transactions/rave.verify';
import {
  ResendTransactionPayload,
  TransactionFeePayload,
  TransactionsPayload,
} from '../services/transactions/types';
import { IDPayload } from '../utils/types';
import RaveBase from './rave.base';

export default class Transactions {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }

  event(data: IDPayload) {
    /**
     * This method allows you to view the timeline for a transaction. A transaction timeline is a list of events that happened to a selected transaction.
     * Some key events include: loading the payment modal, Switching payment methods and Entering details in modal fields.
     * Using the response, you can get insights into the transactions and payment behaviour of users.
     *
     * @link https://developer.flutterwave.com/reference/endpoints/transactions
     */
    return event_trans(data, this.rave);
  }

  /**
   * This endpoint helps developers query the fees expected to be paid for a particular transaction.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/transactions
   */
  fee(data: TransactionFeePayload) {
    return fee_trans(data, this.rave);
  }

  /**
   * This endpoint helps you query the details of a refunded transaction
   *
   * @link https://developer.flutterwave.com/reference/endpoints/transactions#get-refund-details
   */

  refund(data: IDPayload) {
    return refund_trans(data, this.rave);
  }

  /**
   * This endpoint helps you resend webhooks from failed sending queues to your server.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/transactions#get-refund-details
   */
  resend_hooks(data: ResendTransactionPayload) {
    return resend_hooks_trans(data, this.rave);
  }
  /**
   * This endpoint allows developers to query previously initiated transactions. You can do a single or bulk query with the endpoint depending on your use case.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/transactions#get-multiple-transactions
   */
  fetch(data: TransactionsPayload) {
    return retrieve_trans(data, this.rave);
  }

  /**
   * This method helps developers to query the final status of a transaction. This can be used to check transactions of all payment types after they have been attempted.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/transactions#verify-a-transaction
   */
  verify(data: IDPayload) {
    return verify_trans(data, this.rave);
  }
}
