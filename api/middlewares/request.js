import Session from '../libs/session';
import { getCredentials, authenticate } from '../authentication';
import handleResponse from './response';

function handleRequest(method, { req, res, next }) {
  const session = new Session({ req, res, next });

  getCredentials(session)
    .then(authenticate)
    .then(method)
    .then(handleResponse)
    .catch(({ error }) => {
      session.setError(error);
      next(session);
    });
}

export default handleRequest;
