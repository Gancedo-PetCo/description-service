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
          './database-postgres-data/description.csv'
        );
        try {
          await copyToTable(
            tx,
            `descriptions (title, description, sku, primary_brand, days_to_ship, description_id)`,
            fileStream
          );
        } catch (e) {
          console.error(e);
        }
      });
    });
};
