const fs = require('fs');
const PATH = require('path');
const knex = require('knex');
const { copyToTable } = require('../database-postgres/copyToTable.js');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('attributes')
    .del()
    .then(function () {
      return knex.transaction(async (tx) => {
        const fileStream = fs.createReadStream(
          './database-postgres-data/attributes.csv'
        );
        try {
          await copyToTable(
            tx,
            `attributes (color_id, material, length, width, description_id)`,
            fileStream
          );
        } catch (e) {
          console.error(e);
        }
      });
    });
};
