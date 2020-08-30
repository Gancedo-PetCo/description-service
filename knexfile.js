// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/gancedo_description',
    migrations: {
      directory: __dirname + '/migrations',
    },
  },
};
