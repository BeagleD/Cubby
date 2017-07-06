import Error from './error';

class RateLimitError extends Error {
  constructor(raw) {
    super(Object.assign(raw, {
      status: 429,
      type: 'rate_limit_error',
    }));
  }
}

export default RateLimitError;
