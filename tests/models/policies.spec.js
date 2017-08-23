import chai, { expect } from 'chai';
import { describe, it, before, beforeEach, afterEach, after } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { API_URL, TIMEOUT, HEADERS, SECRET_KEY, USER_ID } from '../configs';
import { CUSTOMER, POLICY } from '../models';
import mongo from '../../api/services/mongo';
import ShareTempus from '../../api/models';

const popsicle = require('popsicle');

const userId = USER_ID;

sinonStubPromise(sinon);
chai.use(sinonChai);
// chai.use(chaiHttp);

describe('Policies', function () {
  this.timeout(TIMEOUT);
  const validCustomer = JSON.parse(JSON.stringify(CUSTOMER));
  const validPolicy = JSON.parse(JSON.stringify(POLICY));
  let stubedQuote;
  let createdCustomer;
  let createdPolicy;

  before((done) => {
    mongo.connect().then(() => {
      popsicle.request({
        method: 'POST',
        url: `${API_URL}/customers/create`,
        headers: HEADERS,
        body: validCustomer,
      }).then((res) => {
        const customer = JSON.parse(res.body);
        if (!customer.error) {
          createdCustomer = customer;
          validPolicy.customer = customer.id;
        }
        done();
      });
    });
  });

  beforeEach(() => {
    stubedQuote = sinon.stub(ShareTempus.policies, 'quote');
  });

  afterEach(() => {
    stubedQuote.restore();
  });

  after((done) => {
    const {
      CounterDB,
      CustomersDB,
      EventsDB,
      LogsDB,
      PaymentsDB,
      PoliciesDB,
    } = mongo.getDB(SECRET_KEY);

    if (createdCustomer && createdCustomer.id) {
      const { email, id } = createdCustomer;
      CustomersDB.remove({ email, id }, () => {
        if (createdPolicy && createdPolicy.token) {
          const { customer } = createdPolicy;
          PoliciesDB.remove({ customer, token: createdPolicy.token }, () => {
            EventsDB.remove({ userId });
            LogsDB.remove({ userId });
            PaymentsDB.remove({ userId });
            CounterDB.remove({ userId });

            done();
          });
        } else {
          done();
        }
      });
    } else {
      done();
    }
  });

  it('should have quote method', () => {
    expect(ShareTempus.policies.quote).to.exist;
  });

  it('should have create method', () => {
    expect(ShareTempus.policies.create).to.exist;
  });

  it('should have retrieve method', () => {
    expect(ShareTempus.policies.retrieve).to.exist;
  });

  it('should call quote method', () => {
    ShareTempus.policies.quote();
    expect(stubedQuote).to.have.been.calledOnce;
  });

  it('should return error when try create a policy quote with no data', (done) => {
    popsicle.request({
      method: 'POST',
      url: `${API_URL}/policies/quote`,
      headers: HEADERS,
      body: {},
    }).then((res) => {
      const result = JSON.parse(res.body);
      expect(result.error).to.exist;
      done();
    });
  });

  it('should create a policy quote', (done) => {
    popsicle.request({
      method: 'POST',
      url: `${API_URL}/policies/quote`,
      headers: HEADERS,
      body: validPolicy,
    }).then((res) => {
      const policy = JSON.parse(res.body);
      if (policy.error) {
        done();
      } else {
        createdPolicy = policy;
        expect(res.status).to.be.equal(200);
        expect(policy.quote).to.exist;
        expect(policy.token).to.exist;
        done();
      }
    });
  });

  it('should return error when try create a policy with invalid token', (done) => {
    popsicle.request({
      method: 'POST',
      url: `${API_URL}/policies/create`,
      headers: HEADERS,
      body: { token: 'invalid_token' },
    }).then((res) => {
      const result = JSON.parse(res.body);
      expect(result.error).to.exist;
      done();
    });
  });

  it('should create a policy', (done) => {
    popsicle.request({
      method: 'POST',
      url: `${API_URL}/policies/create`,
      headers: HEADERS,
      body: { token: createdPolicy.token },
    }).then((res) => {
      const policy = JSON.parse(res.body);
      if (policy.error) {
        done();
      } else {
        createdPolicy = policy;
        expect(res.status).to.be.equal(200);
        expect(policy.id).to.exist;
        done();
      }
    });
  });

  it('should payment be created after create a policy', (done) => {
    const { PaymentsDB } = mongo.getDB(SECRET_KEY);
    PaymentsDB.findOne({ userId }).then((payment) => {
      expect(payment).to.exist;
      done();
    });
  });

  it('should log be created after create a policy', (done) => {
    const { LogsDB } = mongo.getDB(SECRET_KEY);
    LogsDB.findOne({
      userId,
      url: '/v1/policies/create',
      status: 200,
    }).then((log) => {
      expect(log).to.exist;
      done();
    });
  });

  it('should event be created after create a policy', (done) => {
    const { EventsDB } = mongo.getDB(SECRET_KEY);
    EventsDB.findOne({
      userId,
      type: 'policy.created',
    }).then((event) => {
      expect(event).to.exist;
      done();
    });
  });

  it('should return error when try update a policy with invalid field', (done) => {
    popsicle.request({
      method: 'POST',
      url: `${API_URL}/policies/update`,
      headers: HEADERS,
      body: {
        id: createdPolicy.id,
        invalidField: 'invalid content',
      },
    }).then((res) => {
      const result = JSON.parse(res.body);
      expect(result.error).to.exist;
      done();
    });
  });

  it('should update a policy', (done) => {
    popsicle.request({
      method: 'POST',
      url: `${API_URL}/policies/update`,
      headers: HEADERS,
      body: {
        id: createdPolicy.id,
        description: 'New description',
      },
    }).then((res) => {
      const policy = JSON.parse(res.body);
      if (policy.error) {
        done();
      } else {
        expect(res.status).to.be.equal(200);
        expect(policy.id).to.exist;
        expect(policy.description).to.be.equal('New description');
        done();
      }
    });
  });

  it('should return error when try retrieve a policy with invalid id', (done) => {
    popsicle.request({
      method: 'GET',
      url: `${API_URL}/policies/invalid_id`,
      headers: HEADERS,
    }).then((res) => {
      const result = JSON.parse(res.body);
      expect(result.error).to.exist;
      done();
    });
  });

  it('should retrieve a policy', (done) => {
    popsicle.request({
      method: 'GET',
      url: `${API_URL}/policies/${createdPolicy.id}`,
      headers: HEADERS,
    }).then((res) => {
      const policy = JSON.parse(res.body);
      if (policy.error) {
        done();
      } else {
        expect(res.status).to.be.equal(200);
        expect(policy.id).to.exist;
        done();
      }
    });
  });
});
