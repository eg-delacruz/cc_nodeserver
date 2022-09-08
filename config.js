//Server config

//Read env vars
require('dotenv').config();

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;

const url = `mongodb+srv://${db_user}:${db_pass}@cluster0.9cjba.mongodb.net/${db_name}?retryWrites=true&w=majority`;

const config = {
  dbURL: url,
  port: process.env.PORT || 5000,
  host: process.env.HOST || 'http://localhost',
  publicRoute: process.env.PUBLIC_ROUTE || '/app',
  filesRoute: process.env.FILES_ROUTE || 'files',
};

module.exports = config;
