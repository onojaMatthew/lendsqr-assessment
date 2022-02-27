const key = require("./config/key");


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      user: key.DB_USER,
      database: key.DB_NAME,
      password: key.DB_PASSWORD,
      host: key.DB_HOST,
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  },

  test: {
    client: "mysql",
    connection: {
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: "test",
      user:  "sqluser",
      password: 'password',
      host: "production_host"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
