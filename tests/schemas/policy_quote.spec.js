import moment from 'moment';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  PolicyQuoteSchema,
  validate,
} from '../../api/schemas';

describe('PolicyQuoteSchema', () => {
  const context = PolicyQuoteSchema.newContext();
  const validPolicy = {
    customer: 'cus_dD2r2Ib8kPMhg5C3YvlqRwb7',
    currency: 'usd',
    startDate: moment().valueOf(),
    endDate: moment().add(1, 'day').valueOf(),
    description: 'Policy for iPhone 7',
    product: {
      name: 'iPhone 7',
      category: 'Electronics',
      subcategory: 'Cell Phones & Accessories',
      manufacturer: 'Apple',
      value: 64900,
    },
  };

  it('should return a invalid field error', (done) => {
    const policy = Object.assign({}, validPolicy, { customer: 123 });

    validate(context, policy).then(() => {
      done();
    }).catch(({ message }) => {
      const errorMessage = 'customer: Customer must be a string';
      expect(message).to.be.equal(errorMessage);
      done();
    });
  });

  it('should return a require field error', (done) => {
    const policy = JSON.parse(JSON.stringify(validPolicy));
    delete policy.customer;

    validate(context, policy).then(() => {
      done();
    }).catch(({ message }) => {
      const errorMessage = 'customer: Customer is required';
      expect(message).to.be.equal(errorMessage);
      done();
    });
  });

  it('should return a not allowed field error', (done) => {
    const policy = JSON.parse(JSON.stringify(validPolicy));
    policy.notAllowedField = 'not allowed content';

    validate(context, policy).then(() => {
      done();
    }).catch(({ message }) => {
      const errorMessage = 'notAllowedField: notAllowedField is not allowed by the schema';
      expect(message).to.be.equal(errorMessage);
      done();
    });
  });

  it('should validate the policy', (done) => {
    validate(context, validPolicy).then(() => {
      expect(true).to.be.equal(true);
      done();
    });
  });
});
