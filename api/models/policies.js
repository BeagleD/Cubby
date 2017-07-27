import moment from 'moment';
// import randomid from 'randomid';
import handleRequest from '../middlewares/request';
import categories from '../libs/categories';
import {
  PolicySchema,
  // PolicyUpdateSchema,
  validate,
} from '../schemas';
import {
  BadRequestError,
  // InvalidRequestError,
  // ServerError,
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
      const policy = req.body;
      const context = PolicySchema.newContext();

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

      if (policy.startDate < today) {
        errorMessage = 'startDate should be greater than today';
      } else if (policy.startDate > policy.endDate) {
        errorMessage = 'endDate should be greater than startDate';
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
          // .then(checkCustomerExist)
          // .then(createCustomer)
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

  create() {

  }

  retrieve() {

  }

  update() {

  }
}

export default Policies;
