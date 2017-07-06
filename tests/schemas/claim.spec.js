import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  ClaimSchema,
  validate,
} from '../../api/schemas';

describe('ClaimSchema', () => {
  const context = ClaimSchema.newContext();
  const validClaim = {
    subject: 'iPhone 7 Damaged',
    type: 'damaged',
    content: 'My iPhone 7 fell and broke the screen',
    policy: {
      id: 'pol_PX7OhipGlRb4QcvOvklkreBv',
      ticket: 'ticket_ONVGqM1k',
    },
  };

  it('should return a invalid field error', (done) => {
    const claim = Object.assign({}, validClaim, { type: 'invalid_type' });

    validate(context, claim).then(() => {
      done();
    }).catch(({ message }) => {
      const errorMessage = 'type: invalid_type is not an allowed value';
      expect(message).to.be.equal(errorMessage);
      done();
    });
  });

  it('should return a require field error', (done) => {
    const claim = JSON.parse(JSON.stringify(validClaim));
    delete claim.type;

    validate(context, claim).then(() => {
      done();
    }).catch(({ message }) => {
      const errorMessage = 'type: Type is required';
      expect(message).to.be.equal(errorMessage);
      done();
    });
  });

  it('should return a not allowed field error', (done) => {
    const claim = JSON.parse(JSON.stringify(validClaim));
    claim.notAllowedField = 'not allowed content';

    validate(context, claim).then(() => {
      done();
    }).catch(({ message }) => {
      const errorMessage = 'notAllowedField: notAllowedField is not allowed by the schema';
      expect(message).to.be.equal(errorMessage);
      done();
    });
  });

  it('should validate the claim', (done) => {
    validate(context, validClaim).then(() => {
      expect(true).to.be.equal(true);
      done();
    });
  });
});
