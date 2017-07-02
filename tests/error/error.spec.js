import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  BadRequestError,
  InvalidRequestError,
  NotFoundError,
  RateLimitError,
  ServerError,
  UnauthorizedError,
} from '../../api/error';

describe('Error', () => {
  it('should generate a BadRequestError', () => {
    const error = new BadRequestError({});
    expect(error.status).to.be.equal(400);
    expect(error.type).to.be.equal('bad_request_error');
  });

  it('should generate a InvalidRequestError', () => {
    const error = new InvalidRequestError({});
    expect(error.status).to.be.equal(402);
    expect(error.type).to.be.equal('invalid_request_error');
  });

  it('should generate a NotFoundError', () => {
    const error = new NotFoundError({});
    expect(error.status).to.be.equal(404);
    expect(error.type).to.be.equal('not_found_error');
  });

  it('should generate a RateLimitError', () => {
    const error = new RateLimitError({});
    expect(error.status).to.be.equal(429);
    expect(error.type).to.be.equal('rate_limit_error');
  });

  it('should generate a ServerError', () => {
    const error = new ServerError({});
    expect(error.status).to.be.equal(500);
    expect(error.type).to.be.equal('api_error');
  });

  it('should generate a UnauthorizedError', () => {
    const error = new UnauthorizedError({});
    expect(error.status).to.be.equal(401);
    expect(error.type).to.be.equal('unauthorized_error');
  });
});
