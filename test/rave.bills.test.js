var bills = require('../lib/rave.bills');
var base = require('../lib/rave.base');

var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

var dotenv = require('dotenv').config();

const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('#Rave Bills', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let billsInstance;
  let billStub;

  beforeEach(() => {
    billsInstance = new bills(ravebase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create bill payments', async function () {
    this.timeout(10000);

    const createSingleBillSuccessStub = sinon
      .stub(billsInstance, 'create_bill')
      .resolves({
        body: {
          status: 'success',
          message: 'Bill payment successful',
          data: {
            phone_number: '+23490803840303',
            amount: 500,
            network: '9MOBILE',
            flw_ref: 'CF-FLYAPI-20200311081921359990',
            tx_ref: 'BPUSSD1583957963415840',
            reference: null,
          },
        },
      });

    var payload = {
      country: 'NG',
      customer: '+23490803840303',
      amount: 500,
      recurrence: 'ONCE',
      type: 'AIRTIME',
      reference: '9300ko984',
    };

    var resp = await billsInstance.create_bill(payload);

    expect(createSingleBillSuccessStub).to.have.been.calledOnce;
    expect(createSingleBillSuccessStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data).to.have.property('flw_ref');
    expect(resp.body.data).to.have.property('amount');
    expect(resp.body.data).to.have.property('tx_ref');
  });

  it('should create bulk bills payment ', async function () {
    this.timeout(10000);

    const createBulkBillSuccessStub = sinon
      .stub(billsInstance, 'create_bulk')
      .resolves({
        body: {
          status: 'success',
          message: 'Bulk bill Payment was queued for processing',
          data: {
            batch_reference: 'CF-BATCH-FLY-API-20200310042210201008',
          },
        },
      });

    var payload = {
      bulk_reference: 'edf-12de5223d2f32',
      callback_url: 'https://webhook.site/5f9a659a-11a2-4925-89cf-8a59ea6a019a',
      bulk_data: [
        {
          country: 'NG',
          customer: '+23490803840303',
          amount: 500,
          recurrence: 'WEEKLY',
          type: 'AIRTIME',
          reference: '930049200929',
        },
        {
          country: 'NG',
          customer: '+23490803840304',
          amount: 500,
          recurrence: 'WEEKLY',
          type: 'AIRTIME',
          reference: '930004912332',
        },
      ],
    };
    var resp = await billsInstance.create_bulk(payload);

    expect(createBulkBillSuccessStub).to.have.been.calledOnce;
    expect(createBulkBillSuccessStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');
    expect(resp.body.message).to.eq(
      'Bulk bill Payment was queued for processing',
    );

    expect(resp.body.data).to.have.property('batch_reference');
  });

  it('should return status of a bill purchase', async function () {
    this.timeout(10000);

    const fetchBillsStatusStub = sinon
      .stub(billsInstance, 'fetch_status')
      .resolves({
        body: {
          status: 'success',
          message: 'Bill status fetch successful',
          data: {
            currency: 'NGN',
            customer_id: '2348109328188',
            frequency: 'One Time',
            amount: '500.0000',
            product: 'AIRTIME',
            product_name: 'MTN',
            commission: 0,
            transaction_date: '2023-02-24T16:46:19.107Z',
            country: 'NG',
            tx_ref: 'CF-FLYAPI-20230224044619923826',
            extra: null,
            product_details: 'FLY-API-NG-AIRTIME-MTN',
          },
        },
      });

    var payload = {
      reference: '9300049404444',
    };
    var resp = await billsInstance.fetch_status(payload);

    expect(fetchBillsStatusStub).to.have.been.calledOnce;
    expect(fetchBillsStatusStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data).to.have.property('product');
    expect(resp.body.data).to.have.property('amount');
    expect(resp.body.data).to.have.property('product_name');
    expect(resp.body.data).to.have.property('extra');
  });

  it('should update bills order', async function () {
    this.timeout(10000);

    const updateBillsStub = sinon.stub(billsInstance, 'update_bills').resolves({
      body: {
        status: 'success',
        message: 'bills order updated successfully',
        data: {
          amount: '3787.88',
          order_reference: 'be9c8abf-4611-46e9-85e7-5a2e8c5d7ab3',
          total_amount: '3814.13',
          meta: {
            rrr: '230007813086',
          },
          fee: '26.25',
          flw_ref: 'CF-FLYAPI-20200312075605138802',
          tx_ref: 'BP15839997672012166',
        },
      },
    });

    var payload = {
      amount: '3814.13',
      reference: 'FLWTTOT1000000019',
      order_id: 'be9c8abf-4611-46e9-85e7-5a2e8c5d7ab3',
    };

    var resp = await billsInstance.update_bills(payload);

    expect(updateBillsStub).to.have.been.calledOnce;
    expect(updateBillsStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data).to.have.property('order_reference');
    expect(resp.body.data).to.have.property('flw_ref');
    expect(resp.body.data).to.have.property('tx_ref');
  });

  it('should validate bills services', async function () {
    this.timeout(10000);

    const validateBillsStub = sinon.stub(billsInstance, 'validate').resolves({
      body: {
        status: 'success',
        message: 'Item validated successfully',
        data: {
          response_code: '00',
          address: null,
          response_message: 'Successful',
          name: 'MTN',
          biller_code: 'BIL099',
          customer: '08038291822',
          product_code: 'AT099',
          email: null,
          fee: 0,
          maximum: 0,
          minimum: 0,
        },
      },
    });

    var payload = {
      item_code: 'AT099',
      code: 'BIL099',
      customer: '08038291822',
    };

    var resp = await billsInstance.validate(payload);

    expect(validateBillsStub).to.have.been.calledOnce;
    expect(validateBillsStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data).to.have.property('response_message');
    expect(resp.body.data).to.have.property('name');
    expect(resp.body.data).to.have.property('customer');
  });

  it('should return amount to be paid', async function () {
    this.timeout(10000);

    const verifyBillAmountStub = sinon
      .stub(billsInstance, 'amt_to_be_paid')
      .resolves({
        body: {
          status: 'success',
          message: 'billers products item retrieval successful',
          data: {
            exact: true,
            items: [
              {
                name: 'email address',
                id: '42107710',
                type: 'Alphanumeric',
                value: '0',
                required: true,
                length: '10',
                fixed: false,
              },
              {
                name: null,
                id: '42107711:42107712',
                type: 'Numeric',
                value: '3500',
                required: true,
                length: null,
                fixed: true,
              },
            ],
            biller_code: 'BIL136',
            product_code: 'OT151',
            product_name: 'GENESIS GROUP COLLEGE GRADUATION FEES',
            amount: '3500.0',
          },
        },
      });

    var payload = {
      id: 'BIL136',
      product_id: 'OT150',
    };

    var resp = await billsInstance.amt_to_be_paid(payload);

    expect(verifyBillAmountStub).to.have.been.calledOnce;
    expect(verifyBillAmountStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data).to.have.property('items');
    expect(resp.body.data).to.have.property('product_name');
    expect(resp.body.data).to.have.property('product_code');
    expect(resp.body.data).to.have.property('amount');
  });

  it('should return history of all purchased bill services', async function () {
    this.timeout(10000);

    const fetchBillHistoryStub = sinon
      .stub(billsInstance, 'fetch_bills')
      .resolves({
        body: {
          status: 'success',
          message: 'bills retrieval successful',
          data: {
            summary: [
              {
                currency: 'NGN',
                sum_bills: 28766.76,
                sum_commission: 138.28,
                sum_dstv: 0,
                sum_airtime: 4550,
                count_dstv: 0,
                count_airtime: 10,
              },
            ],
            transactions: [
              {
                currency: 'NGN',
                customer_id: '+2349082930030',
                frequency: 'Hourly',
                amount: '500.0000',
                product: 'AIRTIME',
                product_name: '9MOBILE',
                commission: 10,
                created_at: '2018-08-24T05:35:07.213Z',
                tx_id: 7895,
              },
              {
                currency: 'NGN',
                customer_id: '+2349082930030',
                frequency: 'One Time',
                amount: '500.0000',
                product: 'AIRTIME',
                product_name: '9MOBILE',
                commission: 10,
                created_at: '2018-08-24T01:06:31.55Z',
                tx_id: 7891,
              },
              {
                currency: 'NGN',
                customer_id: '2349082930030',
                frequency: 'One Time',
                amount: '500.0000',
                product: 'AIRTIME',
                product_name: null,
                commission: 10,
                created_at: '2018-08-24T00:52:27.08Z',
                tx_id: 7888,
              },
            ],
            total: 16,
            total_pages: 0,
            reference: null,
          },
        },
      });

    var payload = {
      from: '2018-08-01',
      to: '2018-09-10',
    };

    var resp = await billsInstance.fetch_bills(payload);

    expect(fetchBillHistoryStub).to.have.been.calledOnce;
    expect(fetchBillHistoryStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data).to.have.property('summary');
    expect(resp.body.data).to.have.property('transactions');

    expect(resp.body.data.transactions[0]).to.have.property('customer_id');
    expect(resp.body.data.transactions[0]).to.have.property('product');
    expect(resp.body.data.transactions[0]).to.have.property('tx_id');
  });

  it('should return all products under a government agency.', async function () {
    this.timeout(10000);

    const fetchProductsByAgencyStub = sinon
      .stub(billsInstance, 'products_under_agency')
      .resolves({
        body: {
          status: 'success',
          message: 'billers products retrieval successful',
          data: {
            biller_code: 'BIL136',
            meta: null,
            products: [
              {
                amount: '0.0',
                code: 'OT150',
                fee: '0.0',
                name: 'GENESIS GROUP ACCOMODATION',
                description: 'GENESIS GROUP ACCOMODATION PAYMENT',
              },
              {
                amount: '0.0',
                code: 'OT151',
                fee: '0.0',
                name: 'GENESIS GROUP COLLEGE GRADUATION FEES',
                description: 'GENESIS GROUP COLLEGE GRADUATION FEES',
              },
            ],
          },
        },
      });

    var payload = {
      id: 'BIL136',
    };

    var resp = await billsInstance.products_under_agency(payload);
    // console.log(resp);

    expect(fetchProductsByAgencyStub).to.have.been.calledOnce;
    expect(fetchProductsByAgencyStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data).to.have.property('biller_code');
    expect(resp.body.data).to.have.property('products');
  });

  it('should Create order using billing code and product id', async function () {
    this.timeout(10000);

    const createOrderWithBillingCodeStub = sinon
      .stub(billsInstance, 'create_ord_billing')
      .resolves({
        body: {
          status: 'success',
          message: 'Order processed successfully',
          data: {
            amount: '3787.88',
            fee: '26.25',
            tx_ref: 'FLWTTOT1000000029',
            order_reference: 'd93ca22f-f129-4cb9-af51-abeb3c1790d0',
            created_at: '2020-03-12T07:48:23580',
            total_amount: '3814.13',
          },
        },
      });

    var payload = {
      id: '3644',
      product_id: 'OT151',
      amount: '3500.00',
      reference: 'FLWTTOT1000000029',
      customer: {
        name: 'emmanuel',
        email: 'emmanuel@x.com',
        phone_number: '08060811638',
      },
      fields: [
        {
          id: '42107711:42107712',
          quantity: '1',
          value: '3500',
        },
        {
          id: '42107710',
          quantity: '1',
          value: 't@x.com',
        },
      ],
    };

    var resp = await billsInstance.create_ord_billing(payload);

    expect(createOrderWithBillingCodeStub).to.have.been.calledOnce;
    expect(createOrderWithBillingCodeStub).to.have.been.calledOnceWith(payload);

    expect(resp.body).to.have.property('status', 'success');
    expect(resp.body).to.have.property('data');

    expect(resp.body.data).to.have.property('tx_ref');
    expect(resp.body.data).to.have.property('order_reference');
  });
});
