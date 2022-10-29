import * as knexConfig from '../config/knexfile';

const knex = require('knex')(knexConfig);
const { Model } = require('objection');
Model.knex(knex);

import * as Koa from 'koa';
import * as json from 'koa-json';
import * as dotenv from 'dotenv';
import * as  _ from 'lodash';

import * as middleWares from './middleware';
import * as routes from './routes/index';

dotenv.config();

const app = new Koa();

app.use(json());
app.use(middleWares);

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on port ${process.env.PORT || 3000}`);
});