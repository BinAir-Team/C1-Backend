require('dotenv').config();
const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DIALECT} = process.env;
module.exports = {
  "development": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": `${DB_NAME}_development`,
    "host": DB_HOST,
    "dialect": DB_DIALECT
  },
  "test": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": `${DB_NAME}_test`,
    "host": DB_HOST,
    "dialect": DB_DIALECT
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
