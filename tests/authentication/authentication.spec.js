import { expect } from 'chai';
import { describe, it } from 'mocha';
import { getCredentials, authenticate } from '../../api/authentication';
import { TIMEOUT, HEADERS, SECRET_KEY } from '../configs';

describe('Authentication', function () {
  this.timeout(TIMEOUT);

  describe('Credentials', () => {
    it('should send a unauthorized error', (done) => {
      const req = { headers: {} };
      getCredentials({ req }).then(() => {
        done();
      }).catch((err) => {
        expect(err.status).to.be.equal(401);
        expect(err.type).to.be.equal('unauthorized_error');
        done();
      });
    });

    it('should get the secret key', (done) => {
      const req = { headers: HEADERS };
      getCredentials({ req }).then(({ secretKey }) => {
        expect(secretKey).to.be.equal(SECRET_KEY);
        done();
      });
    });
  });

  describe('Authenticate', () => {
    it('should send a unauthorized error', (done) => {
      const secretKey = 'invalid_test_key';
      authenticate({ secretKey }).then(() => {
        done();
      }).catch((err) => {
        expect(err.status).to.be.equal(401);
        expect(err.type).to.be.equal('unauthorized_error');
        done();
      });
    });

    it('should authenticate user', (done) => {
      const secretKey = SECRET_KEY;
      authenticate({ secretKey }).then(({ user }) => {
        expect(typeof user).to.be.equal('object');
        done();
      });
    });
  });
});
