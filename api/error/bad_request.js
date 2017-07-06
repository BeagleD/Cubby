import Error from './error';

class BadRequestError extends Error {
  constructor(raw) {
    super(Object.assign(raw, {
      status: 400,
      type: 'bad_request_error',
    }));
  }
}

export default BadRequestError;
