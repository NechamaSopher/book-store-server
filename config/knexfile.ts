//require('ts-node/register');
import { knexSnakeCaseMappers } from 'objection';
import * as dotenv from 'dotenv';

dotenv.config();

const bookstoreDB = process.env.BOOKSTORE_DB

const knexConfig = {
  client: 'postgresql',
  connection: bookstoreDB,
  pool: {
    min: 2,
    max: 10
  },
  ...knexSnakeCaseMappers(),
  migrations: {
    directory: '../db/migrations'
  }
};

module.exports = knexConfig;
