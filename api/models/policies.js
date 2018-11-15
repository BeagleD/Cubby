import moment from 'moment';
import randomid from 'randomid';
import handleRequest from '../middlewares/request';
import categories from '../libs/categories';
import Matrix from '../services/matrix';
import Payments from '../services/payments';
import Email from '../services/email';
import Counter from '../services/counter';
import {
  PolicySchema,
  PolicyQuoteSchema,
  PolicyUpdateSchema,
  validate,
} from '../schemas';
import {
  BadRequestError,
  InvalidRequestError,
  ServerError,
} from '../error';

class Policies {
  constructor() {
    this.quote = handleRequest.bind(undefined, this.quote);
    this.create = handleRequest.bind(undefined, this.create);
    this.retrieve = handleRequest.bind(undefined, this.retrieve);
    this.update = handleRequest.bind(undefined, this.update);
  }

  quote(session) {
    return new Promise((resolve, reject) => {
      const { req } = session;
      // console.log('SESSION =\n', session);
      const policy = req.body;
      const context = PolicyQuoteSchema.newContext();
      // console.log('CONTEXT =\n', context);

      // parse numbers to curl request
      if (policy) {
        if (typeof policy.startDate === 'string') {
          policy.startDate = Number(policy.startDate);
        }
        if (typeof policy.endDate === 'string') {
          policy.endDate = Number(policy.endDate);
        }
        if (policy.product && typeof policy.product.value === 'string') {
          policy.product.value = Number(policy.product.value);
        }
      }

      const today = moment().startOf('day').valueOf();

      let errorMessage;

      // console.log('today =', today);
      // console.log('POLICY =\n', policy);

      if (!policy) {
        errorMessage = 'You must provide the policy data';
      } else if (policy.startDate < today) {
        errorMessage = 'startDate should be today or later';
      } else if (policy.startDate > policy.endDate) {
        errorMessage = 'endDate should be greater than startDate';
      } else if (!policy.product) {
        errorMessage = 'You must provide the policy product data';
      } else if (!categories[policy.product.category]) {
        errorMessage = 'Invalid category';
      } else if (categories[policy.product.category].indexOf(policy.product.subcategory) < 0) {
        errorMessage = 'Invalid subcategory';
      } else if (policy.product.value > 90000000) {
        errorMessage = 'Product value must be less than $900,000.00';
      }

      if (errorMessage) {
        reject({
          error: new BadRequestError({
            message: errorMessage,
            createdAt: moment().valueOf(),
            data: policy,
          }),
        });
      } else {
        validate(context, policy, session)
          .then(findCustomer)
          .then(Matrix.generatePolicyQuote)
          .then(createPolicy)
          .then(resolve)
          .catch(({ message, error }) => {
            if (message) {
              reject({
                error: new BadRequestError({
                  message,
                  createdAt: moment().valueOf(),
                  data: policy,
                }),
              });
            } else {
              reject({ error });
            }
          });
      }
    });
  }

  create(session) {
    return new Promise((resolve, reject) => {
      const { req } = session;
      const token = req.body.token;
      const context = PolicySchema.newContext();

      if (!token) {
        reject({
          error: new BadRequestError({
            message: 'Token not found',
            createdAt: moment().valueOf(),
            data: req.body,
          }),
        });
      } else if (token.indexOf('tok_') !== 0) {
        reject({
          error: new BadRequestError({
            message: `Token ${token} invalid`,
            createdAt: moment().valueOf(),
            data: token,
          }),
        });
      } else {
        validate(context, { token }, session)
          .then(findPolicyByToken)
          .then(registerPolicy)
          .then(resolve)
          .catch(({ message, error }) => {
            if (message) {
              reject({
                error: new BadRequestError({
                  message,
                  createdAt: moment().valueOf(),
                  data: req.body,
                }),
              });
            } else {
              reject({ error });
            }
          });
      }
    });
  }

  retrieve(session) {
    return new Promise((resolve, reject) => {
      const { req, mongo, userId, secretKey } = session;
      const { PoliciesDB } = mongo.getDB(secretKey);
      const id = req.params.policy;

      if (id) {
        PoliciesDB.findOne({ userId, id }).then((policy) => {
          if (policy) {
            session.setResponse(policy, 'policies');
            resolve(session);
          } else {
            reject({
              error: new InvalidRequestError({
                createdAt: moment().valueOf(),
                message: `Policy ${id} not found`,
                data: policy,
              }),
            });
          }
        });
      } else {
        reject({
          error: new BadRequestError({
            message: 'Policy id not provided',
            data: {},
          }),
        });
      }
    });
  }

  update(session) {
    return new Promise((resolve, reject) => {
      const { req } = session;
      const policy = req.body;
      const context = PolicyUpdateSchema.newContext();

      validate(context, policy, session)
        .then(findPolicy)
        .then(updatePolicy)
        .then(resolve)
        .catch(({ message, error }) => {
          if (message) {
            reject({
              error: new BadRequestError({
                message,
                createdAt: moment().valueOf(),
                data: policy,
              }),
            });
          } else {
            reject({ error });
          }
        });
    });
  }
}

function findPolicy(session) {
  return new Promise((resolve, reject) => {
    const { req, mongo, userId, secretKey } = session;
    const { PoliciesDB } = mongo.getDB(secretKey);
    const policy = req.body;
    const { id } = policy;

    // check if customer exist
    PoliciesDB.findOne({
      userId,
      id,
    }).then((existedPolicy) => {
      if (existedPolicy) {
        updateExitedPolicyProps(existedPolicy, policy);
        resolve({ session, policy: existedPolicy });
      } else {
        reject({
          error: new InvalidRequestError({
            createdAt: moment().valueOf(),
            message: `Policy ${id} doesn't exist`,
            data: policy,
          }),
        });
      }
    });
  });

  // update properties
  function updateExitedPolicyProps(existingPolicy, policy) {
    for (const prop in existingPolicy) {
      if (policy[prop]) {
        if (typeof (existingPolicy[prop]) === 'string') {
          existingPolicy[prop] = policy[prop];
        } else if (typeof (existingPolicy[prop]) === 'object') {
          updateExitedPolicyProps(existingPolicy[prop], policy[prop]);
        }
      }
    }
  }
}

function updatePolicy({ session, policy }) {
  return new Promise((resolve, reject) => {
    const { mongo, secretKey, userId } = session;
    const { PoliciesDB } = mongo.getDB(secretKey);
    const { id } = policy;

    PoliciesDB.update({
      userId,
      id,
    }, {
      $set: policy,
    }).then((updatedPolicy) => {
      if (updatedPolicy) {
        session.setResponse(policy, 'policies');
        resolve(session);
      } else {
        reject({
          error: new ServerError({
            message: 'Failure to update policy. Please try again in some minutes',
            data: policy,
          }),
        });
      }
    });
  });
}

function findPolicyByToken(session) {
  return new Promise((resolve, reject) => {
    const { mongo, req, secretKey, userId } = session;
    const token = req.body.token;
    const { PoliciesDB } = mongo.getDB(secretKey);

    PoliciesDB.findOne({ token, userId }).then((policy) => {
      if (!policy) {
        reject({
          error: new InvalidRequestError({
            createdAt: moment().valueOf(),
            message: 'Policy not found. Probably you use a invalid or expired token',
            data: { token, userId },
          }),
        });
      } else if (policy.private.created) {
        reject({
          error: new InvalidRequestError({
            createdAt: moment().valueOf(),
            message: `Policy ${policy.id} already created`,
            data: policy,
          }),
        });
      } else {
        resolve({ session, policy });
      }
    });
  });
}

function registerPolicy({ session, policy }) {
  return new Promise((resolve, reject) => {
    const { mongo, secretKey } = session;
    const { token, userId } = policy;
    const { CustomersDB, PoliciesDB } = mongo.getDB(secretKey);

    // create policy
    policy.private.created = true;
    // update created at
    policy.createdAt = moment().valueOf();

    PoliciesDB.update({ token, userId }, {
      $set: policy,
    }, (err) => {
      if (err) {
        reject({
          error: new ServerError({
            message: 'Failure to create policy. Please try again in some minutes',
            data: policy,
          }),
        });
      } else {
          CustomersDB.findOne({
            userId,
            id: policy.customer,
          }).then((customer) => {
            // console.log('userId =', userId);
            if (customer) {
              // send ticket email to owner
              console.log('sending policy email to asset owner at',customer.email)
              // console.log('customer =\n', customer);
              // console.log('policy =\n', policy);
              Email.sendTicketEmail({ customer, policy });
            }
        });

        CustomersDB.findOne({
          userId,
          id: policy.renter,
        }).then((customer) => {
          // console.log('userId =', userId);
          if (customer) {
            // send ticket email to renter
            console.log('sending policy email to asset renter at',customer.email)
            // console.log('customer =\n', customer);
            // console.log('policy =\n', policy);
            Email.sendTicketEmail({ customer, policy });
          }
      });

        Payments.addPolicy({ session, policy }).then(() => {
          Counter.policies.increment({ session, data: policy });
          session.setResponse(policy, 'policies');
          resolve(session);
        });
      }
    });
  });
}

function findCustomer(session) {
  return new Promise((resolve, reject) => {
    const { mongo, req, secretKey, userId } = session;
    const { CustomersDB } = mongo.getDB(secretKey);
    const policy = req.body;
    console.log('models/claims.js::findCustomer: policy =\n', policy);
    // console.log('CustomersDB =\n', CustomersDB);
    // console.log('mongo =\n', mongo );
    // console.log('req =\n', req );
    // console.log('secretKey =\n', secretKey );
    console.log('models/claims.js::findCustomer: userId =', userId );
    CustomersDB.findOne({ id: policy.customer, userId }).then((customer) => {
      if (customer) {
        // add customer_id
        policy.customerId = customer._id;  // Customers collection -- _id field (key)

        resolve({ session, policy });
      } else {
        reject({
          error: new InvalidRequestError({
            createdAt: moment().valueOf(),
            message: `Customer ${policy.customer} doesn't exist`,
            data: customer,
          }),
        });
      }
    });
    CustomersDB.findOne({ id: policy.renter, userId }).then((renter) => {
      if (renter) {
        // add customer_id
        policy.renterId = renter._id;  // Customers collection -- _id field (key)
        resolve({ session, policy });
      } else {
        reject({
          error: new InvalidRequestError({
            createdAt: moment().valueOf(),
            message: `Renter ${policy.renter} doesn't exist`,
            data: renter,
          }),
        });
      }
    });
    // console.log('policy =\n', policy);
  });
}

function createPolicy({ session, policy }) {
  return new Promise((resolve, reject) => {
    const { mongo, secretKey, userId } = session;
    const { PoliciesDB } = mongo.getDB(secretKey);

    // generate a policy id
    policy.id = `pol_${randomid(24)}`;
    // generate a claim ticket
    policy.ticket = `ticket_${randomid(24)}`;
    // generate policy creation date
    policy.createdAt = (new Date()).getTime();
    // get user id
    policy.userId = userId;
    // token
    policy.token = `tok_${randomid(24)}`;
    // private flags
    policy.private = {
      created: false,
      paid: false,
      matrixUpdated: false,
      hasClaim: false,
    };

    PoliciesDB.insert(policy).then((newPolicy) => {
      if (newPolicy) {
        const { token, quote } = policy;
        session.setResponse({ token, quote });
        resolve(session);
      } else {
        reject({
          error: new ServerError({
            message: 'Failure to create policy quote. Please try again later',
            data: policy,
          }),
        });
      }
    });
  });
}

export default Policies;
