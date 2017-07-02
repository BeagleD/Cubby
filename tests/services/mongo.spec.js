import { expect } from 'chai';
import { describe, it } from 'mocha';
import Mongo from '../../api/services/mongo';
import { TIMEOUT, SECRET_KEY } from '../configs';

describe('Mongo', function () {
  this.timeout(TIMEOUT);

  it('should connect in the database', (done) => {
    const mongo = new Mongo(SECRET_KEY);

    mongo.connect().then(() => {
      expect(typeof mongo.liveDB).to.be.equal('object');
      expect(typeof mongo.testDB).to.be.equal('object');
      mongo.close();
      done();
    });
  });

  it('should show a unauthorized error', (done) => {
    const mongo = new Mongo('invalid_key');

    mongo.connect().then(() => {
      done();
    }).catch((err) => {
      expect(err.status).to.be.equal(401);
      done();
    });
  });
});
