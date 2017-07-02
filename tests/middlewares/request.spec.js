// import chai, { expect } from 'chai';
// import { describe, it } from 'mocha';
// import sinon from 'sinon';
// import sinonChai from 'sinon-chai';
// import sinonStubPromise from 'sinon-stub-promise';
// import { HEADERS } from '../configs';
// import handleRequest from '../../api/middlewares/request';
//
// sinonStubPromise(sinon);
// chai.use(sinonChai);
//
// describe('Request', function () {
//   this.timeout(10000);
//   it('should call request callback function', (done) => {
//     const fn = sinon.stub().resolves();
//     const req = { headers: HEADERS };
//     const res = { send: () => {}, setHeader: () => {} };
//     const next = () => {};
//
//     handleRequest(fn, { req, res, next });
//     setTimeout(() => {
//       expect(fn).to.have.been.calledOnce;
//       done();
//     }, 5000);
//   });
// });
