import bulk_transfer from '../services/transfers/rave.bulk';
import fee_transfer from '../services/transfers/rave.fee';
import fetch_transfers from '../services/transfers/rave.fetch';
import initiate_transfer from '../services/transfers/rave.initiate';
import getATransfer from '../services/transfers/rave.retrieve.transfers';
import wallet from '../services/transfers/rave.wallet';
import {
  BulkTransferPayload,
  CreateTransferPayload,
  FeePayload,
  FetchTransferPayload,
  WalletToWalletPayload,
} from '../services/transfers/types';
import { IDPayload } from '../utils/types';
import RaveBase from './rave.base';

/**
 * This section describes how merchants and developers can Send funds to Bank acc.
 */
export default class Transfers {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }

  /**
   * This section describes how to Initate a transfer with Flutterwave.
   */
  bulk(data: BulkTransferPayload) {
    return bulk_transfer(data, this.rave);
  }

  /**
   * This endpoint help the merchant/developer query the fee for the transfer being made.
   */
  fee(data: FeePayload) {
    return fee_transfer(data, this.rave);
  }
  /**
   * This section describes how to Initate a transfer with Flutterwave.
   */
  initiate(data: CreateTransferPayload) {
    return initiate_transfer(data, this.rave);
  }
  /**
   * This endpoint allows the developer/merchant to spool all their transfers.
   */
  fetch(data: FetchTransferPayload) {
    return fetch_transfers(data, this.rave);
  }
  /**
   * This endpoint helps you fetch the details of a transfer.
   */
  get_a_transfer(data: IDPayload) {
    return getATransfer(data, this.rave);
  }
  /**
   * This transfers from one flutterwave wallet to another
   */
  wallet_to_wallet(data: WalletToWalletPayload) {
    return wallet(data, this.rave);
  }
}
