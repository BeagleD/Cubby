import { expect } from 'chai';
import { describe, it } from 'mocha';
import Session from '../../api/libs/session';
import { getCredentials, authenticate } from '../../api/authentication';
import { TIMEOUT, HEADERS, SECRET_KEY } from '../configs';

describe('Authentication', function () {
  this.timeout(TIMEOUT);

  describe('Credentials', () => {
    it('should send a unauthorized error', (done) => {
      const req = { headers: {}, body: {} };
      const session = new Session({ req });
      getCredentials(session).then(() => {
        done();
      }).catch(({ error }) => {
        expect(error.status).to.be.equal(401);
        expect(error.type).to.be.equal('unauthorized_error');
        done();
      });
    });

    it('should get the secret key', (done) => {
      const req = { headers: HEADERS, body: {} };
      const session = new Session({ req });
      getCredentials(session).then(({ secretKey }) => {
        expect(secretKey).to.be.equal(SECRET_KEY);
        done();
      });
    });
  });

  describe('Authenticate', () => {
    it('should send a unauthorized error', (done) => {
      const req = { headers: {}, body: {} };
      const secretKey = 'invalid_test_key';
      const session = new Session({ req });
      session.setSecretKey(secretKey);

      authenticate(session).then(() => {
        done();
      }).catch(({ error }) => {
        expect(error.status).to.be.equal(401);
        expect(error.type).to.be.equal('unauthorized_error');
        done();
      });
    });

    it('should authenticate user', (done) => {
      const req = { headers: {}, body: {} };
      const secretKey = SECRET_KEY;
      const session = new Session({ req });
      session.setSecretKey(secretKey);

      authenticate(session).then(({ user }) => {
        expect(typeof user).to.be.equal('object');
        done();
      });
    });
  });
});
