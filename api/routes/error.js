import Raven from 'raven';
import { RAVEN_KEY } from '../configs';

// Raven.config(RAVEN_KEY).install();

const errorRouter = (session, req, res, next) => {
  const { error } = session;

  // capture server errors in sentry
  if (error.status === 500) {
    // Raven.captureException(error);
  // require basic authentication
  } else if (error.status === 401) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
  } else {
    session.generateLog();
  }

  res.send({ error: error.send() });
};

export default errorRouter;
