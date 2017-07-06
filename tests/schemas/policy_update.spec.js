import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  PolicyUpdateSchema,
  validate,
} from '../../api/schemas';

describe('PolicyUpdateSchema', () => {
  const context = PolicyUpdateSchema.newContext();
  const validPolicy = {
    id: 'pol_Re2UTmiZNd6hvn3eklRNOWET',
    description: 'New description for Policy for iPhone 7',
  };

  it('should return a invalid field error', (done) => {
    const policy = Object.assign({}, validPolicy, { id: 123 });

    validate(context, policy).then(() => {
      done();
    }).catch(({ message }) => {
      const errorMessage = 'id: Id must be a string';
      expect(message).to.be.equal(errorMessage);
      done();
    });
  });

  it('should return a require field error', (done) => {
    const policy = JSON.parse(JSON.stringify(validPolicy));
    delete policy.id;

    validate(context, policy).then(() => {
      done();
    }).catch(({ message }) => {
      const errorMessage = 'id: Id is required';
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
