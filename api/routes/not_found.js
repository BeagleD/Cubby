import moment from 'moment';
import { NotFoundError } from '../error';

const notFoundRouter = (req, res, next) => {
  const error = new NotFoundError({
    createdAt: moment().valueOf(),
    message: `${req.url} not found`,
  });

  next({ error });
};

export default notFoundRouter;
