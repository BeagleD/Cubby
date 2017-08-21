import moment from 'moment';
import randomid from 'randomid';
import handleRequest from '../middlewares/request';
import Counter from '../services/counter';
import {
  CustomerSchema,
  CustomerUpdateSchema,
  validate,
} from '../schemas';
import {
  BadRequestError,
  InvalidRequestError,
  ServerError,
} from '../error';

class Customers {
  constructor() {
    this.create = handleRequest.bind(undefined, this.create);
    this.update = handleRequest.bind(undefined, this.update);
    this.retrieve = handleRequest.bind(undefined, this.retrieve);
    this.find = handleRequest.bind(undefined, this.find);
  }

  create(session) {
    return new Promise((resolve, reject) => {
      const { req } = session;
      const customer = req.body;
      const context = CustomerSchema.newContext();

      // parse numbers to curl request
      if (
        customer.legalEntity &&
        customer.legalEntity.birthdate &&
        typeof customer.legalEntity.birthdate === 'string'
      ) {
        customer.legalEntity.birthdate = Number(customer.legalEntity.birthdate);
      }

      validate(context, customer, session)
        .then(checkCustomerExist)
        .then(createCustomer)
        .then(resolve)
        .catch(({ message, error }) => {
          if (message) {
            reject({
              error: new BadRequestError({
                message,
                createdAt: moment().valueOf(),
                data: customer,
              }),
            });
          } else {
            reject({ error });
          }
        });
    });
  }

  update(session) {
    return new Promise((resolve, reject) => {
      const { req } = session;
      const customer = req.body;
      const context = CustomerUpdateSchema.newContext();

      validate(context, customer, session)
        .then(findCustomer)
        .then(updateCustomer)
        .then(resolve)
        .catch(({ message, error }) => {
          if (message) {
            reject({
              error: new BadRequestError({
                message,
                createdAt: moment().valueOf(),
                data: customer,
              }),
            });
          } else {
            reject({ error });
          }
        });
    });
  }

  retrieve(session) {
    return new Promise((resolve, reject) => {
      const { req, mongo, userId, secretKey } = session;
      const { CustomersDB } = mongo.getDB(secretKey);
      const id = req.params.customer;

      if (id) {
        CustomersDB.findOne({ id, userId }).then((customer) => {
          if (customer) {
            session.setResponse(customer, 'customers');
            resolve(session);
          } else {
            reject({
              error: new InvalidRequestError({
                createdAt: moment().valueOf(),
                message: `Customer ${id} not found`,
                data: customer,
              }),
            });
          }
        });
      } else {
        reject({
          error: new BadRequestError({
            message: 'Customer id not provided',
            data: {},
          }),
        });
      }
    });
  }

  find(session) {
    return new Promise((resolve, reject) => {
      const { req, mongo, userId, secretKey } = session;
      const { CustomersDB } = mongo.getDB(secretKey);
      const email = req.body.email;

      if (email) {
        CustomersDB.findOne({ email, userId }).then((customer) => {
          if (customer) {
            session.setResponse(customer, 'customers');
            resolve(session);
          } else {
            reject({
              error: new InvalidRequestError({
                createdAt: moment().valueOf(),
                message: `Customer ${email} not found`,
                data: customer,
              }),
            });
          }
        });
      } else {
        reject({
          error: new BadRequestError({
            message: 'Customer email not provided',
            data: {},
          }),
        });
      }
    });
  }
}

// PRIVATE FUNCTIONS

function findCustomer(session) {
  return new Promise((resolve, reject) => {
    const { req, mongo, userId, secretKey } = session;
    const { CustomersDB } = mongo.getDB(secretKey);
    const customer = req.body;
    const { id } = customer;

    // check if customer exist
    CustomersDB.findOne({
      userId,
      id,
    }).then((existedCustomer) => {
      if (existedCustomer) {
        updateExitedCustomerProps(existedCustomer, customer);
        resolve({ session, customer: existedCustomer });
      } else {
        reject({
          error: new InvalidRequestError({
            createdAt: moment().valueOf(),
            message: `Customer ${id} doesn't exist`,
            data: customer,
          }),
        });
      }
    });
  });

  // update properties
  function updateExitedCustomerProps(existingCustomer, customer) {
    for (const prop in existingCustomer) {
      if (customer[prop]) {
        if (typeof (existingCustomer[prop]) === 'string') {
          existingCustomer[prop] = customer[prop];
        } else if (typeof (existingCustomer[prop]) === 'object') {
          updateExitedCustomerProps(existingCustomer[prop], customer[prop]);
        }
      }
    }
  }
}

function updateCustomer({ session, customer }) {
  return new Promise((resolve, reject) => {
    const { mongo, secretKey, userId } = session;
    const { CustomersDB } = mongo.getDB(secretKey);
    const { id } = customer;

    CustomersDB.update({
      userId,
      id,
    }, {
      $set: customer,
    }).then((updatedCustomer) => {
      if (updatedCustomer) {
        session.setResponse(customer, 'customers');
        resolve(session);
      } else {
        reject({
          error: new ServerError({
            message: 'Failure to update customer. Please try again in some minutes',
            data: customer,
          }),
        });
      }
    });
  });
}

function checkCustomerExist(session) {
  return new Promise((resolve, reject) => {
    const { req, mongo, userId, secretKey } = session;
    const { CustomersDB } = mongo.getDB(secretKey);
    const customer = req.body;
    const { email } = customer;

    // check if customer exist
    CustomersDB.findOne({
      userId,
      email,
    }).then((existedCustomer) => {
      if (!existedCustomer) {
        // add params
        customer.userId = userId;
        customer.id = `cus_${randomid(24)}`;
        customer.createdAt = moment().valueOf();

        resolve({ session, customer });
      } else {
        reject({
          error: new InvalidRequestError({
            createdAt: moment().valueOf(),
            message: `Customer ${email} already exist`,
            data: existedCustomer,
          }),
        });
      }
    });
  });
}

function createCustomer({ session, customer }) {
  return new Promise((resolve, reject) => {
    const { mongo, secretKey } = session;
    const { CustomersDB } = mongo.getDB(secretKey);

    CustomersDB.insert(customer).then((newCustomer) => {
      if (newCustomer) {
        Counter.customers.increment({ session, data: customer });
        session.setResponse(customer, 'customers');
        resolve(session);
      } else {
        reject({
          error: new ServerError({
            message: 'Failure to create customer. Please try again in some minutes',
            data: customer,
          }),
        });
      }
    });
  });
}

export default Customers;
