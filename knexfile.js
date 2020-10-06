// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '204.236.154.85',
      database: 'gancedo_description',
      user: 'postgres',
      password: 'secret',
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
  },
};
