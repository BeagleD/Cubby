import { expect } from 'chai';
import { describe, it } from 'mocha';
import mongo from '../../api/services/mongo';
import { TIMEOUT } from '../configs';

describe('Mongo', function () {
  this.timeout(TIMEOUT);

  it('should connect in the database', (done) => {
    mongo.connect().then(() => {
      expect(typeof mongo.liveDB).to.be.equal('object');
      expect(typeof mongo.testDB).to.be.equal('object');
      done();
    });
  });
});
