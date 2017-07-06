import Error from './error';

class InvalidRequestError extends Error {
  constructor(raw) {
    super(Object.assign(raw, {
      status: 402,
      type: 'invalid_request_error',
    }));
  }
}

export default InvalidRequestError;
