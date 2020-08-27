exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('description', (table) => {
      table.increments('id').primary();
      table.text('title').notNullable();
      table.text('description').notNullable();
      table.integer('SKU').notNullable();
      table.string('primaryBrand').notNullable();
      table.text('daysToShip').notNullable();
    }),
    knex.schema.createTable('directions', (table) => {
      table.increments('id').primary();
      table.text('directions').notNullable();
      table.integer('descriptionId').unsigned().references('description.id');
    }),
    knex.schema.createTable('attributes', (table) => {
      table.increments('id').primary();
      table.string('primaryColor').notNullable();
      table.text('material').notNullable();
      table.string('length').notNullable();
      table.string('width').notNullable();
      table.integer('descriptionId').unsigned().references('description.id');
    }),
    knex.schema.createTable('details', (table) => {
      table.increments('id').primary();
      table.text('additionalDetails').notNullable();
      table.integer('descriptionId').unsigned().references('description.id');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('description'),
    knex.schema.dropTable('directions'),
    knex.schema.dropTable('attributes'),
    knex.schema.dropTable('details'),
  ]);
};
