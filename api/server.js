import express from 'express';
import bodyParser from 'body-parser';
import {
  categoriesRouter,
  claimsRouter,
  customersRouter,
  errorRouter,
  eventsRouter,
  notFoundRouter,
  policiesRouter,
} from './routes';
import {
  startPaymentsSchedules,
  startPoliciesSchedules,
} from './schedules';
import { API_VERSION, SIZE_LIMIT } from './configs';

// start schedules
startPaymentsSchedules();
startPoliciesSchedules();

const app = express();

app.set('json spaces', 2);
app.use(bodyParser.urlencoded({ limit: SIZE_LIMIT, extended: true }));
app.use(bodyParser.json({ limit: SIZE_LIMIT }));

app.use(API_VERSION, categoriesRouter);
app.use(API_VERSION, claimsRouter);
app.use(API_VERSION, customersRouter);
app.use(API_VERSION, eventsRouter);
app.use(API_VERSION, policiesRouter);

app.use(notFoundRouter);
app.use(errorRouter);

app.listen(8888);

console.log('API is running on port 8888');
