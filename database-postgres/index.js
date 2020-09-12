const config = require('../knexfile.js');
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const knex = require('knex');
const postgresDB = knex(environmentConfig);

module.exports.postgresDB = postgresDB;
