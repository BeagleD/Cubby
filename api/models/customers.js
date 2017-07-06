import moment from 'moment';
import randomid from 'randomid';
import handleRequest from '../middlewares/request';
import { CustomerSchema, validate } from '../schemas';
import {
  BadRequestError,
  InvalidRequestError,
  ServerError,
} from '../error';

class Customers {
  constructor() {
    this.create = handleRequest.bind(undefined, this.create);
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
        .then(findCustomer)
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
}

// PRIVATE FUNCTIONS

function findCustomer(session) {
  return new Promise((resolve, reject) => {
    const { req, mongo, userId, secretKey } = session;
    const { CustomersDB } = mongo.getDB(secretKey);
    const customer = req.body;
    const { email } = customer;

    // add user id
    customer.userId = userId;

    // check if customer exist
    CustomersDB.findOne({
      userId,
      email,
    }).then((existedCustomer) => {
      if (!existedCustomer) {
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
