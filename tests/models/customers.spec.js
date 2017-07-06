import chai, { expect } from 'chai';
import { describe, it, before, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { API_URL, TIMEOUT, HEADERS, SECRET_KEY } from '../configs';
import { CUSTOMER } from '../models';
import mongo from '../../api/services/mongo';
import ShareTempus from '../../api/models';

const popsicle = require('popsicle');

sinonStubPromise(sinon);
chai.use(sinonChai);
// chai.use(chaiHttp);

describe('Customers', function () {
  this.timeout(TIMEOUT);
  const validCustomer = JSON.parse(JSON.stringify(CUSTOMER));
  let stubedCreate;

  before((done) => {
    mongo.connect().then(() => done());
  });

  beforeEach(() => {
    stubedCreate = sinon.stub(ShareTempus.customers, 'create');
  });

  afterEach(() => {
    stubedCreate.restore();
  });

  it('should have create method', () => {
    expect(ShareTempus.customers.create).to.exist;
  });

  it('should call create method', () => {
    ShareTempus.customers.create();
    expect(stubedCreate).to.have.been.calledOnce;
  });

  it('should return error when try create a customer with no data', (done) => {
    popsicle.request({
      method: 'POST',
      url: `${API_URL}/customers/create`,
      headers: HEADERS,
      body: {},
    }).then((res) => {
      const result = JSON.parse(res.body);
      expect(result.error).to.exist;
      done();
    });
  });

  it('should create a customers', (done) => {
    popsicle.request({
      method: 'POST',
      url: `${API_URL}/customers/create`,
      headers: HEADERS,
      body: validCustomer,
    }).then((res) => {
      const customer = JSON.parse(res.body);
      const { CustomersDB } = mongo.getDB(SECRET_KEY);

      // remove after test
      if (customer.error) {
        CustomersDB.remove({ email: validCustomer.email }, () => {
          done();
        });
      } else {
        expect(res.status).to.be.equal(200);
        expect(customer.id).to.exist;

        if (customer.id) {
          const { email, id } = customer;
          CustomersDB.remove({ email, id }, () => {
            done();
          });
        }
      }
    });
  });
});
