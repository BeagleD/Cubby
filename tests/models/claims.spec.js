import chai, { expect } from 'chai';
import { describe, it, before, beforeEach, afterEach, after } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { API_URL, TIMEOUT, HEADERS, SECRET_KEY, USER_ID } from '../configs';
import { CLAIM, CUSTOMER, POLICY } from '../models';
import mongo from '../../api/services/mongo';
import ShareTempus from '../../api/models';

const popsicle = require('popsicle');

sinonStubPromise(sinon);
chai.use(sinonChai);
// chai.use(chaiHttp);

const userId = USER_ID;

describe('Claims', function () {
  this.timeout(TIMEOUT);
  const validClaim = JSON.parse(JSON.stringify(CLAIM));
  const validCustomer = JSON.parse(JSON.stringify(CUSTOMER));
  const validPolicy = JSON.parse(JSON.stringify(POLICY));
  let stubedCreate;
  let createdCustomer;
  let createdClaim;
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

        popsicle.request({
          method: 'POST',
          url: `${API_URL}/policies/quote`,
          headers: HEADERS,
          body: validPolicy,
        }).then((resp) => {
          const { token } = JSON.parse(resp.body);
          if (token) {
            popsicle.request({
              method: 'POST',
              url: `${API_URL}/policies/create`,
              headers: HEADERS,
              body: { token },
            }).then((response) => {
              const policy = JSON.parse(response.body);
              if (!policy.error) {
                createdPolicy = policy;
                validClaim.policy = {
                  id: policy.id,
                  ticket: policy.ticket,
                };
              }

              done();
            });
          }
        });
      });
    });
  });

  beforeEach(() => {
    stubedCreate = sinon.stub(ShareTempus.claims, 'create');
  });

  afterEach(() => {
    stubedCreate.restore();
  });

  after((done) => {
    const { ClaimsDB, CounterDB, CustomersDB, PoliciesDB } = mongo.getDB(SECRET_KEY);

    CounterDB.remove({ userId });

    if (createdCustomer && createdCustomer.id) {
      const { email, id } = createdCustomer;

      CustomersDB.remove({ email, id }, () => {
        if (createdPolicy && createdPolicy.token) {
          const { customer } = createdPolicy;
          PoliciesDB.remove({ customer, token: createdPolicy.token }, () => {
            if (createdClaim && createdClaim.id) {
              ClaimsDB.remove({ id: createdClaim.id }, () => {
                done();
              });
            }
          });
        } else {
          done();
        }
      });
    } else {
      done();
    }
  });

  it('should have create method', () => {
    expect(ShareTempus.claims.create).to.exist;
  });

  it('should have retrieve method', () => {
    expect(ShareTempus.claims.retrieve).to.exist;
  });

  it('should return error when try create a claim with no data', (done) => {
    popsicle.request({
      method: 'POST',
      url: `${API_URL}/claims/create`,
      headers: HEADERS,
      body: {},
    }).then((res) => {
      const result = JSON.parse(res.body);
      expect(result.error).to.exist;
      done();
    });
  });

  it('should create a claim', (done) => {
    popsicle.request({
      method: 'POST',
      url: `${API_URL}/claims/create`,
      headers: HEADERS,
      body: validClaim,
    }).then((res) => {
      const claim = JSON.parse(res.body);
      if (claim.error) {
        done();
      } else {
        createdClaim = claim;
        expect(res.status).to.be.equal(200);
        expect(claim.id).to.exist;
        done();
      }
    });
  });

  it('should retrieve a claim', (done) => {
    popsicle.request({
      method: 'GET',
      url: `${API_URL}/claims/${createdClaim.id}`,
      headers: HEADERS,
    }).then((res) => {
      const claim = JSON.parse(res.body);
      if (claim.error) {
        done();
      } else {
        expect(res.status).to.be.equal(200);
        expect(claim.id).to.exist;
        done();
      }
    });
  });
});
