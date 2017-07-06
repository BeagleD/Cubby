import Error from './error';

class NotFoundError extends Error {
  constructor(raw) {
    super(Object.assign(raw, {
      status: 404,
      type: 'not_found_error',
    }));
  }
}

export default NotFoundError;
