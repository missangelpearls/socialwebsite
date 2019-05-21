require('dotenv').config()

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DEV_DB_HOST,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PWD,
      database: process.env.DEV_DB
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.env.PROD_DB_HOST,
      user: process.env.PROD_DB_USER,
      password: process.env.PROD_DB_PWD,
      database: process.env.PROD_DB
    }
  }

};
