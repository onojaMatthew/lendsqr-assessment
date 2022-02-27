// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      user: "sqluser",
      database: "lendsqr",
      password: "password",
      host: "localhost",
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
      database: "lendsqr",
      user:  "sqluser",
      password: 'password',
      host: "localhost"
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
