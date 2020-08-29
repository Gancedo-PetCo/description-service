const fs = require('fs');
const PATH = require('path');
const knex = require('knex');
const { copyToTable } = require('../database-postgres/copyToTable.js');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('description')
    .del()
    .then(function () {
      return knex.transaction(async (tx) => {
        const fileStream = fs.createReadStream(
          './database-postgres-data/attributes.csv'
        );
        try {
          await copyToTable(
            tx,
            `attributes (primary_color, material, length, width, description_id)`,
            fileStream
          );
        } catch (e) {
          console.error(e);
        }
      });
    });
};
