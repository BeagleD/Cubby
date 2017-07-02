import Error from './error';

class UnauthorizedError extends Error {
  constructor(raw) {
    super(Object.assign(raw, {
      status: 401,
      type: 'unauthorized_error',
    }));
  }
}

export default UnauthorizedError;
