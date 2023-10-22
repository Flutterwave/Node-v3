const PaymentPlan = require('../lib/rave.payment_plan');
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

describe('#Rave Payment-plan', function () {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const ravebase = new base(public_key, secret_key);

  let paymentPlanInstance;
  let paymentPlanStub;

  beforeEach(() => {
    paymentPlanInstance = new PaymentPlan(ravebase)
  });

  afterEach(() => {
    sinon.restore();
  });

    it('should update a payment plan', async function () {
      this.timeout(10000);

      const updatePaymentPlanStub = sinon
      .stub(paymentPlanInstance, 'update')
      .resolves({
        status: 'success',
        message: 'Payment plan updated',
        data: {
          id: 34185,
          name: 'A sample KES monthly plan',
          plan_token: 'rpp_2f711270c4de5c2393d3',
          status: 'active',
          currency: 'NGN',
          amount: 0,
          duration: 12,
          interval: 'monthly',
          created_at: '2023-03-15T00:34:50.000Z'
        }
      })

      var payload = {
        id: "34185",
        name: "A sample KES monthly plan",
        status: "active"
      };
      var resp = await paymentPlanInstance.update(payload);
      expect(updatePaymentPlanStub).to.have.been.calledOnce;

      expect(resp).to.have.property('status', 'success');
      expect(resp).to.have.property('message', 'Payment plan updated');
      expect(resp).to.have.property('data');
  
      expect(resp.data).to.have.property('id', 34185);
      expect(resp.data).to.have.property('name', 'A sample KES monthly plan');
      expect(resp.data).to.have.property('status', 'active');
    });

    it("should create a payment plan", async function () {
      this.timeout(10000);

      const createPaymentPlanStub = sinon
      .stub(paymentPlanInstance, 'create')
      .resolves({
        status: 'success',
        message: 'Payment plan created',
        data: {
          id: 52045,
          name: 'SDK test Plan',
          amount: '100',
          interval: 'monthly',
          duration: 0,
          status: 'active',
          currency: 'NGN',
          plan_token: 'rpp_cd93e2fa88e065b960bf',
          created_at: '2023-07-04T09:16:42.000Z'
        }
      })


      var payload = {
        amount: "100",
        name: "SDK test Plan", 
        interval: "monthly"
      };
      var resp = await paymentPlanInstance.create(payload);
      expect(createPaymentPlanStub).to.have.been.calledOnce;

      expect(resp).to.have.property('status', 'success');
      expect(resp).to.have.property('message', 'Payment plan created');
      expect(resp).to.have.property('data');
  
      expect(resp.data).to.have.property('id');
      expect(resp.data).to.have.property('currency');
      expect(resp.data).to.have.property('status', 'active');
    });

    it('should get all payment plans', async function () {
      this.timeout(10000);

      const getAllPaymentPlanStub = sinon
      .stub(paymentPlanInstance, 'get_all')
      .resolves({
        status: 'success',
        message: 'Payment plans fetched',
        meta: { page_info: { total: 106, current_page: 1, total_pages: 11 } },
        data: [
          {
            id: 37829,
            name: 'testing',
            amount: 100,
            interval: 'weekly',
            duration: 4,
            status: 'cancelled',
            currency: 'NGN',
            plan_token: 'rpp_0aac3d0aa3f0c18565c0',
            created_at: '2023-06-14T11:57:26.000Z'
          },
          {
            id: 37828,
            name: 'API monitor',
            amount: 100,
            interval: 'monthly',
            duration: 0,
            status: 'cancelled',
            currency: 'NGN',
            plan_token: 'rpp_27ea9a4ef60dae5e7fc8',
            created_at: '2023-06-14T11:48:26.000Z'
          },
          {
            id: 36074,
            name: 'the akhlm postman plan 2',
            amount: 100,
            interval: 'monthly',
            duration: 5,
            status: 'cancelled',
            currency: 'NGN',
            plan_token: 'rpp_134b476d4d1f9181a219',
            created_at: '2023-05-22T14:15:05.000Z'
          },
          {
            id: 34444,
            name: 'postman plan 0',
            amount: 100,
            interval: 'monthly',
            duration: 8,
            status: 'cancelled',
            currency: 'NGN',
            plan_token: 'rpp_89b6c76c0394af004913',
            created_at: '2023-03-26T21:05:26.000Z'
          },
          {
            id: 34185,
            name: 'A sample KES monthly plan',
            amount: 0,
            interval: 'monthly',
            duration: 12,
            status: 'active',
            currency: 'NGN',
            plan_token: 'rpp_2f711270c4de5c2393d3',
            created_at: '2023-03-15T00:34:50.000Z'
          },
          {
            id: 33857,
            name: 'PHPSDK Test Plan',
            amount: 1600,
            interval: 'monthly',
            duration: 1,
            status: 'cancelled',
            currency: 'NGN',
            plan_token: 'rpp_0d087b5a4644f78252ad',
            created_at: '2023-03-03T14:29:37.000Z'
          },
          {
            id: 33856,
            name: 'PHPSDK Test Plan',
            amount: 1600,
            interval: 'monthly',
            duration: 1,
            status: 'cancelled',
            currency: 'NGN',
            plan_token: 'rpp_570f8a07e6c190a91f4f',
            created_at: '2023-03-03T14:29:36.000Z'
          },
          {
            id: 33855,
            name: 'PHPSDK Test Plan',
            amount: 1600,
            interval: 'monthly',
            duration: 1,
            status: 'cancelled',
            currency: 'NGN',
            plan_token: 'rpp_4f2926d1f3d1a56915a1',
            created_at: '2023-03-03T14:29:33.000Z'
          },
          {
            id: 33850,
            name: 'PHPSDK Test Plan',
            amount: 1600,
            interval: 'monthly',
            duration: 1,
            status: 'cancelled',
            currency: 'NGN',
            plan_token: 'rpp_98a4ebf8b3dfc7f494a1',
            created_at: '2023-03-03T14:13:47.000Z'
          },
          {
            id: 33849,
            name: 'PHPSDK Test Plan',
            amount: 1600,
            interval: 'monthly',
            duration: 1,
            status: 'cancelled',
            currency: 'NGN',
            plan_token: 'rpp_b6cc20cb87ee9a64d879',
            created_at: '2023-03-03T14:13:39.000Z'
          }
        ]
      })

      var payload = {
      };
      var resp = await paymentPlanInstance.get_all(payload);
      expect(getAllPaymentPlanStub).to.have.been.calledOnce;

      expect(resp).to.have.property('status', 'success');
      expect(resp).to.have.property('message', 'Payment plans fetched');
      expect(resp).to.have.property('meta');
      expect(resp).to.have.property('data');
  
      expect(resp.data[0]).to.have.property('id');
      expect(resp.data[0]).to.have.property('status');
    });

    it('should get a payment plan', async function () {
        this.timeout(10000);
  
        const getAPaymentPlanStub = sinon
        .stub(paymentPlanInstance, 'get_plan')
        .resolves({
            status: 'success',
            message: 'Payment plan fetched',
            data: {
              id: 52045,
              name: 'SDK test Plan',
              amount: 100,
              interval: 'monthly',
              duration: 0,
              status: 'active',
              currency: 'NGN',
              plan_token: 'rpp_cd93e2fa88e065b960bf',
              created_at: '2023-07-04T09:16:42.000Z'
            }
          })

        var payload = {
            id: "52045"
        };
        var resp = await paymentPlanInstance.get_plan(payload);
        expect(getAPaymentPlanStub).to.have.been.calledOnce;

        expect(resp).to.have.property('status', 'success');
        expect(resp).to.have.property('message', 'Payment plan fetched');
        expect(resp).to.have.property('data');
    
        expect(resp.data).to.have.property('id');
        expect(resp.data).to.have.property('status');
      });

      it('should cancel a payment plan', async function () {
        this.timeout(10000);

        const cancelPaymentPlanStub = sinon
        .stub(paymentPlanInstance, 'cancel')
        .resolves({
            status: 'success',
            message: 'Payment plan cancelled',
            data: {
              id: 34185,
              name: 'A sample KES monthly plan',
              plan_token: 'rpp_2f711270c4de5c2393d3',
              status: 'cancelled',
              currency: 'NGN',
              amount: 0,
              duration: 12,
              interval: 'monthly',
              created_at: '2023-03-15T00:34:50.000Z'
            }
          })
  
        var payload = {
            id: "34185"
        };
        var resp = await paymentPlanInstance.cancel(payload);
        expect(cancelPaymentPlanStub).to.have.been.calledOnce;

        expect(resp).to.have.property('status', 'success');
        expect(resp).to.have.property('message', 'Payment plan cancelled');
        expect(resp).to.have.property('data');
    
        expect(resp.data).to.have.property('id');
        expect(resp.data).to.have.property('status', 'cancelled');
      });
});