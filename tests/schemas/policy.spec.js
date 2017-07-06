import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  PolicySchema,
  validate,
} from '../../api/schemas';

describe('PolicySchema', () => {
  const context = PolicySchema.newContext();
  const validPolicy = {
    token: 'tok_Q1gBkjj8wdAkOg0pj8bf8uQO',
  };

  it('should return a invalid field error', (done) => {
    const policy = Object.assign({}, validPolicy, { token: 123 });

    validate(context, policy).then(() => {
      done();
    }).catch(({ message }) => {
      const errorMessage = 'token: Token must be a string';
      expect(message).to.be.equal(errorMessage);
      done();
    });
  });

  it('should return a require field error', (done) => {
    const policy = JSON.parse(JSON.stringify(validPolicy));
    delete policy.token;

    validate(context, policy).then(() => {
      done();
    }).catch(({ message }) => {
      const errorMessage = 'token: Token is required';
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
