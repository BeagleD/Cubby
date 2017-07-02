import chai, { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { API_URL, TIMEOUT, HEADERS } from '../configs';
import categories from '../../api/libs/categories';
import ShareTempus from '../../api/models';

const popsicle = require('popsicle');

sinonStubPromise(sinon);
chai.use(sinonChai);
// chai.use(chaiHttp);

describe('Categories', function () {
  this.timeout(TIMEOUT);
  let stubedRetrieve;

  beforeEach(() => {
    stubedRetrieve = sinon.stub(ShareTempus.categories, 'retrieve');
  });

  afterEach(() => {
    stubedRetrieve.restore();
  });

  it('should have retrieve method', () => {
    expect(ShareTempus.categories.retrieve).to.exist;
  });

  it('should call retrieve method', () => {
    ShareTempus.categories.retrieve();
    expect(stubedRetrieve).to.have.been.calledOnce;
  });

  it('should return the correct data', (done) => {
    popsicle.request({
      method: 'GET',
      url: `${API_URL}/categories`,
      headers: HEADERS,
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(JSON.parse(res.body)).to.be.deep.equal(categories);
      done();
    });
  });
});
