import { expect } from 'chai';
import { describe, it } from 'mocha';
import { CUSTOMER } from '../models';
import {
  CustomerSchema,
  validate,
} from '../../api/schemas';

describe('CustomerSchema', () => {
  const context = CustomerSchema.newContext();
  const validCustomer = JSON.parse(JSON.stringify(CUSTOMER));

  it('should return a invalid field error', (done) => {
    const customer = Object.assign({}, validCustomer, { email: 'invalid_email' });

    validate(context, customer).then(() => {
      done();
    }).catch(({ message }) => {
      const errorMessage = 'email: Email must be a valid e-mail address';
      expect(message).to.be.equal(errorMessage);
      done();
    });
  });

  it('should return a require field error', (done) => {
    const customer = JSON.parse(JSON.stringify(validCustomer));
    delete customer.legalEntity.firstName;

    validate(context, customer).then(() => {
      done();
    }).catch(({ message }) => {
      const errorMessage = 'legalEntity.firstName: First name is required';
      expect(message).to.be.equal(errorMessage);
      done();
    });
  });

  it('should return a not allowed field error', (done) => {
    const customer = JSON.parse(JSON.stringify(validCustomer));
    customer.notAllowedField = 'not allowed content';

    validate(context, customer).then(() => {
      done();
    }).catch(({ message }) => {
      const errorMessage = 'notAllowedField: notAllowedField is not allowed by the schema';
      expect(message).to.be.equal(errorMessage);
      done();
    });
  });

  it('should validate the customer', (done) => {
    validate(context, validCustomer).then(() => {
      expect(true).to.be.equal(true);
      done();
    });
  });
});
