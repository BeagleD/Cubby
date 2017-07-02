import Error from './error';

class ServerError extends Error {
  constructor(raw) {
    super(Object.assign(raw, {
      status: 500,
      type: 'api_error',
    }));
  }
}

export default ServerError;
