import block_card from '../services/virtual-cards/rave.block_unblock';
import create_Card from '../services/virtual-cards/rave.create.card';
import fund_Card from '../services/virtual-cards/rave.fund';
import retrieve_all_Cards from '../services/virtual-cards/rave.retrieve.all.cards';
import retrieve_single_Card from '../services/virtual-cards/rave.retrieve.single.card';
import terminate_card from '../services/virtual-cards/rave.terminate';
import card_transactions from '../services/virtual-cards/rave.transactions';
import withdraw_from_Card from '../services/virtual-cards/rave.withdraw';
import {
  BlockUnblockCardPayload,
  CardTransactionPayload,
  CreateCardPayload,
  FundCardPayload,
  WithdrawFromCardPayload,
} from '../services/virtual-cards/type';
import { IDPayload } from '../utils/types';
import RaveBase from './rave.base';

export default class Virtual_card {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }
  /**
   * This creates a virtual
   *
   * @link https://developer.flutterwave.com/reference/endpoints/virtual-cards#create-a-virtual-card
   */
  create(data: CreateCardPayload) {
    return create_Card(data, this.rave);
  }
  /**
   * This funds a specific virtual card.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/virtual-cards#fund-a-virtual-card
   */
  fund(data: FundCardPayload) {
    return fund_Card(data, this.rave);
  }
  /**
   * This call fetches all virtual cards created by the User
   *
   * @link https://developer.flutterwave.com/reference/endpoints/virtual-cards#get-all-virtual-cards
   */
  fetch_all(data?: {}) {
    return retrieve_all_Cards(data, this.rave);
  }
  /**
   * This call gets a specific virtual card by ID created by the User with
   *
   * @link https://developer.flutterwave.com/reference/endpoints/virtual-cards#get-a-virtual-card
   */
  fetch(data: IDPayload) {
    return retrieve_single_Card(data, this.rave);
  }

  /**
   * This blocks a virtual card created by the User.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/virtual-cards#blockunblock-virtual-card
   */

  block(data: BlockUnblockCardPayload) {
    return block_card(data, this.rave);
  }

  /**
   * This blocks a virtual card created by the User.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/virtual-cards#blockunblock-virtual-card
   */

  unblock(data: BlockUnblockCardPayload) {
    return block_card(data, this.rave);
  }

  /**
   * This call terminates a virtual card created by the User.
   *
   * @link https://developer.flutterwave.com/reference/endpoints/virtual-cards#terminate-a-virtual-card
   */
  terminate(data: IDPayload) {
    return terminate_card(data, this.rave);
  }
  /**
   * This call fetches transactions by date range on a single card
   *
   * @link https://developer.flutterwave.com/reference/endpoints/virtual-cards#get-a-virtuals-cards-transactions
   */
  transactions(data: CardTransactionPayload) {
    return card_transactions(data, this.rave);
  }
  /**
   * This withdraws existing funds from a virtual card
   *
   * @link https://developer.flutterwave.com/reference/endpoints/virtual-cards#withdraw-from-a-virtual-card
   */
  withdraw_funds(data: WithdrawFromCardPayload) {
    return withdraw_from_Card(data, this.rave);
  }
}
