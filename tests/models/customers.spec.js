import chai, { expect } from 'chai';
import { describe, it, before, beforeEach, afterEach, after } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { API_URL, TIMEOUT, HEADERS, SECRET_KEY, USER_ID } from '../configs';
import { CUSTOMER } from '../models';
import mongo from '../../api/services/mongo';
import ShareTempus from '../../api/models';

const popsicle = require('popsicle');

const userId = USER_ID;

sinonStubPromise(sinon);
chai.use(sinonChai);
// chai.use(chaiHttp);

describe('Customers', function () {
  this.timeout(TIMEOUT);
  const validCustomer = JSON.parse(JSON.stringify(CUSTOMER));
  let stubedCreate;
  let createdCustomer;

  before((done) => {
    mongo.connect().then(() => done());
  });

  beforeEach(() => {
    stubedCreate = sinon.stub(ShareTempus.customers, 'create');
  });

  afterEach(() => {
    stubedCreate.restore();
  });

  after((done) => {
    const { CounterDB, CustomersDB } = mongo.getDB(SECRET_KEY);

    CounterDB.remove({ userId });

    if (createdCustomer.id) {
      const { email, id } = createdCustomer;
      CustomersDB.remove({ email, id }, () => {
        done();
      });
    } else {
      CustomersDB.remove({ email: validCustomer.email }, () => {
        done();
      });
    }
  });

  it('should have create method', () => {
    expect(ShareTempus.customers.create).to.exist;
  });

  it('should have update method', () => {
    expect(ShareTempus.customers.update).to.exist;
  });

  it('should have retrieve method', () => {
    expect(ShareTempus.customers.retrieve).to.exist;
  });

  it('should have find method', () => {
    expect(ShareTempus.customers.find).to.exist;
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
      if (customer.error) {
        done();
      } else {
        createdCustomer = customer;
        expect(res.status).to.be.equal(200);
        expect(customer.id).to.exist;
        done();
      }
    });
  });

  it('should log be created after create a customer', (done) => {
    const { LogsDB } = mongo.getDB(SECRET_KEY);
    LogsDB.findOne({
      userId,
      url: '/v1/customers/create',
      status: 200,
    }).then((log) => {
      expect(log).to.exist;
      done();
    });
  });


  it('should event be created after create a customer', (done) => {
    const { EventsDB } = mongo.getDB(SECRET_KEY);
    EventsDB.findOne({
      userId,
      type: 'customer.created',
    }).then((event) => {
      expect(event).to.exist;
      done();
    });
  });

  it('should counter be incremented after create a customer', (done) => {
    setTimeout(() => {
      const { CounterDB } = mongo.getDB(SECRET_KEY);
      CounterDB.findOne({ userId }).then((counter) => {
        expect(counter).to.exist;
        expect(counter.customers.total).to.be.equal(1);
        done();
      });
    }, 300);
  });

  it('should update a customer', (done) => {
    popsicle.request({
      method: 'POST',
      url: `${API_URL}/customers/update`,
      headers: HEADERS,
      body: {
        id: createdCustomer.id,
        legalEntity: {
          address: {
            line2: 'Apt. 1A Bronx',
          },
        },
      },
    }).then((res) => {
      const customer = JSON.parse(res.body);
      if (customer.error) {
        done();
      } else {
        expect(res.status).to.be.equal(200);
        expect(customer.id).to.exist;
        expect(customer.legalEntity.address.line2).to.be.equal('Apt. 1A Bronx');
        done();
      }
    });
  });

  it('should retrieve a customer', (done) => {
    popsicle.request({
      method: 'GET',
      url: `${API_URL}/customers/${createdCustomer.id}`,
      headers: HEADERS,
    }).then((res) => {
      const customer = JSON.parse(res.body);
      if (customer.error) {
        done();
      } else {
        expect(res.status).to.be.equal(200);
        expect(customer.id).to.exist;
        done();
      }
    });
  });

  it('should return error when try find a customer with no email', (done) => {
    popsicle.request({
      method: 'POST',
      url: `${API_URL}/customers/find`,
      headers: HEADERS,
      body: {},
    }).then((res) => {
      const result = JSON.parse(res.body);
      expect(result.error).to.exist;
      done();
    });
  });

  it('should find a customer', (done) => {
    popsicle.request({
      method: 'POST',
      url: `${API_URL}/customers/find`,
      headers: HEADERS,
      body: {
        email: createdCustomer.email,
      },
    }).then((res) => {
      const customer = JSON.parse(res.body);
      if (customer.error) {
        done();
      } else {
        expect(res.status).to.be.equal(200);
        expect(customer.id).to.exist;
        done();
      }
    });
  });
});
