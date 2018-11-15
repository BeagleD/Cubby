import moment from 'moment';
import randomid from 'randomid';
import handleRequest from '../middlewares/request';
import Counter from '../services/counter';
import {
  ClaimSchema,
  validate,
} from '../schemas';
import {
  BadRequestError,
  InvalidRequestError,
  ServerError,
} from '../error';
import Matrix from '../services/matrix';

class Claims {
  constructor() {
    this.create = handleRequest.bind(undefined, this.create);
    this.retrieve = handleRequest.bind(undefined, this.retrieve);
  }

  create(session) {
    return new Promise((resolve, reject) => {
      const { req } = session;
      // console.log('models/claims.js::create: session =\n',session);
      const claim = req.body;
      console.log('models/claims.js::create: claim =\n',claim);
      const context = ClaimSchema.newContext();
      console.log('models/claims.js::create: context =\n',context);

      validate(context, claim, session)
        .then(checkClaimExist)
        .then(findPolicy)
        .then(findCustomer)
        .then(findRenter)
        .then(createClaim)
        .then(resolve)
        .catch(({ message, error }) => {
          if (message) {
            reject({
              error: new BadRequestError({
                message,
                createdAt: moment().valueOf(),
                data: claim,
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
      const { req, mongo, secretKey } = session;
      const { ClaimsDB } = mongo.getDB(secretKey);
      const id = req.params.claim;

      if (id) {
        ClaimsDB.findOne({ id }).then((claim) => {
          if (claim) {
            session.setResponse(claim, 'claims');
            resolve(session);
          } else {
            reject({
              error: new InvalidRequestError({
                createdAt: moment().valueOf(),
                message: `Claim ${id} not found`,
                data: claim,
              }),
            });
          }
        });
      } else {
        reject({
          error: new BadRequestError({
            message: 'Claim id not provided',
            data: {},
          }),
        });
      }
    });
  }
}

function checkClaimExist(session) {
  return new Promise((resolve, reject) => {
    const { req, mongo, secretKey } = session;
    const { ClaimsDB } = mongo.getDB(secretKey);
    const claim = req.body;
    const { policy } = claim;
    const { id, ticket } = policy;

    // check if claim exist
    ClaimsDB.findOne({
      'policy.id': id,
      'policy.ticket': ticket,
    }).then((existedClaim) => {
      if (!existedClaim) {
        resolve({ session, claim });
      } else {
        reject({
          error: new InvalidRequestError({
            createdAt: moment().valueOf(),
            message: `Claim ${existedClaim.id} already exist`,
            data: existedClaim,
          }),
        });
      }
    });
  });
}

function findPolicy({ session, claim }) {
  return new Promise((resolve, reject) => {
    const { mongo, secretKey } = session;
    const { PoliciesDB } = mongo.getDB(secretKey);
    const { id, ticket } = claim.policy;

    // check if claim exist
    PoliciesDB.findOne({ id, ticket }).then((policy) => {
      if (policy) {
        const today = moment().valueOf();

        if (policy.startDate > today) {
          reject({
            error: new InvalidRequestError({
              createdAt: moment().valueOf(),
              message: `Policy ${policy.id} is not in its valid period`,
              data: policy,
            }),
          });
        } else if (policy.endDate < today) {
          reject({
            error: new InvalidRequestError({
              createdAt: moment().valueOf(),
              message: `Policy ${policy.id} expired`,
              data: policy,
            }),
          });
        } else {
          resolve({ session, claim, policy });
        }
      } else {
        reject({
          error: new InvalidRequestError({
            createdAt: moment().valueOf(),
            message: `Policy ${policy.id} not found`,
            data: claim,
          }),
        });
      }
    });
  });
}

function findCustomer({ session, claim, policy }) {
  return new Promise((resolve, reject) => {
    console.log('models/claims.js::findCustomer: claim =\n',claim);
    const { mongo, secretKey } = session;
    const { CustomersDB } = mongo.getDB(secretKey);
    const { userId } = policy;
    console.log('models/claims.js::findCustomer: userId =\n',userId);
    console.log('models/claims.js::findCustomer: policy =\n',policy);

    CustomersDB.findOne({ id: policy.customer, userId }).then((customer) => {
      if (customer) {
        resolve({ session, claim, policy, customer });
      } else {
        reject({
          error: new InvalidRequestError({
            createdAt: moment().valueOf(),
            message: `Customer ${customer} not found`,
            data: { claim, policy },
          }),
        });
      }
    });
  });
}

function findRenter({ session, claim, policy, customer }) {
  return new Promise((resolve, reject) => {
    console.log('models/claims.js::findRenter: claim =\n',claim);
    const { mongo, secretKey } = session;
    const { CustomersDB } = mongo.getDB(secretKey);
    const { userId } = policy;
    console.log('models/claims.js::findRenter: userId =\n',userId);
    console.log('models/claims.js::findRenter: policy =\n',policy);

    CustomersDB.findOne({ id: policy.renter, userId }).then((renter) => {
      if (renter) {
        console.log('models/claims.js::findRenter: renter =\n',renter);
        resolve({ session, claim, policy, customer, renter });
      } else {
        reject({
          error: new InvalidRequestError({
            createdAt: moment().valueOf(),
            message: `Renter ${renter} not found`,
            data: { claim, policy },
          }),
        });
      }
    });
  });
}



function createClaim({ session, claim, policy, customer, renter }) {
  return new Promise((resolve, reject) => {
    const { mongo, secretKey, user } = session;
    const { ClaimsDB, PoliciesDB } = mongo.getDB(secretKey);

    // add params
    claim.userId = policy.userId;
    claim.platformId = policy.userId;
    claim.id = `clm_${randomid(24)}`;
    claim.status = 'opened';
    claim.createdAt = moment().valueOf();
    claim.customer = {
      id: policy.customer,
      email: customer.email,
    };
    claim.renter = {
      id: policy.renter,
      email: renter.email,
    };
    // Get filer from session data - user object
    claim.filer = {
      user_id: user._id,
      email: user.emails[0].address,
    };
    console.log('models/claims.js::createClaim: claim =\n',claim);

    ClaimsDB.insert(claim).then((newClaim) => {
      if (newClaim) {
        Matrix.updateMatrixValues({
          session,
          policy,
          type: 'expense',
        }).then(() => {
          policy.private.hasClaim = true;

          PoliciesDB.update({
            _id: policy._id,
          }, {
            $set: policy,
          });
        });

        Counter.claims.increment({ session, data: claim });
        session.setResponse(claim, 'claims');
        resolve(session);
      } else {
        reject({
          error: new ServerError({
            message: 'Failure to create claim. Please try again in some minutes',
            data: claim,
          }),
        });
      }
    });
  });
}

export default Claims;
