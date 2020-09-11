const fs = require('fs');
const PATH = require('path');
const knex = require('knex');
const { copyToTable } = require('../database-postgres/copyToTable.js');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('colors')
    .del()
    .then(function () {
      return knex.transaction(async (tx) => {
        const fileStream = fs.createReadStream(
          './database-postgres-data/colors.csv'
        );
        try {
          await copyToTable(tx, `colors (color_name, hex)`, fileStream);
        } catch (e) {
          console.error(e);
        }
      });
    });
};
