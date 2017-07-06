import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  CustomerUpdateSchema,
  validate,
} from '../../api/schemas';

describe('CustomerUpdateSchema', () => {
  const context = CustomerUpdateSchema.newContext();
  const validCustomer = {
    id: 'cus_dD2r2Ib8kPMhg5C3YvlqRwb7',
    legalEntity: {
      address: {
        line2: 'Apt. 1A Bronx',
      },
    },
  };

  it('should return a invalid field error', (done) => {
    const customer = Object.assign({}, validCustomer, { id: 123 });

    validate(context, customer).then(() => {
      done();
    }).catch(({ message }) => {
      const errorMessage = 'id: Id must be a string';
      expect(message).to.be.equal(errorMessage);
      done();
    });
  });

  it('should return a require field error', (done) => {
    const customer = JSON.parse(JSON.stringify(validCustomer));
    delete customer.id;

    validate(context, customer).then(() => {
      done();
    }).catch(({ message }) => {
      const errorMessage = 'id: Id is required';
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
