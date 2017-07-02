import express from 'express';
import { categoriesRouter } from './routes';
import { API_VERSION } from './configs';

const app = express();

app.set('json spaces', 2);

app.use(API_VERSION, categoriesRouter);

app.listen(8888);

console.log('API is running on port 8888');
