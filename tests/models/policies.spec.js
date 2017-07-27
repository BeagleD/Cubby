import chai, { expect } from 'chai';
import { describe, it, before, beforeEach, afterEach, after } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { API_URL, TIMEOUT, HEADERS, SECRET_KEY } from '../configs';
import { CUSTOMER, POLICY } from '../models';
import mongo from '../../api/services/mongo';
import ShareTempus from '../../api/models';

const popsicle = require('popsicle');

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
    const { CustomersDB, PoliciesDB } = mongo.getDB(SECRET_KEY);

    if (createdCustomer && createdCustomer.id) {
      const { email, id } = createdCustomer;
      CustomersDB.remove({ email, id }, () => {
        if (createdPolicy && createdPolicy.id) {
          const { customer } = createdPolicy;
          PoliciesDB.remove({ customer, id: createdPolicy.id }, () => {
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
      url: `${API_URL}/policies/create`,
      headers: HEADERS,
      body: validPolicy,
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
});
