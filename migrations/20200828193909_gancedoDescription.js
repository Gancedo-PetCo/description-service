exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('descriptions', (table) => {
      table.increments('id').primary();
      table.text('title').notNullable();
      table.text('description').notNullable();
      table.integer('sku').notNullable();
      table.string('primary_brand').notNullable();
      table.text('days_to_ship').notNullable();
      table.integer('description_id');
      table.unique(['description_id']);
    }),

    knex.schema.createTable('directions', (table) => {
      table.increments('id').primary();
      table.text('directions').notNullable();
      table.integer('description_id').unsigned().references('descriptions.description_id').onDelete('CASCADE');
    }),
    knex.schema.createTable('colors', (table) => {
      table.increments('id').primary();
      table.text('color_name').notNullable();
      table.text('hex').notNullable();
    }),
    knex.schema.createTable('attributes', (table) => {
      table.increments('id').primary();
      table.integer('color_id').unsigned().references('colors.id');;
      table.text('material').notNullable();
      table.string('length').notNullable();
      table.string('width').notNullable();
      table.integer('description_id').unsigned().references('descriptions.description_id').onDelete('CASCADE');;
    }),
    knex.schema.createTable('details', (table) => {
      table.increments('id').primary();
      table.text('additional_details').notNullable();
      table.integer('description_id').unsigned().references('descriptions.description_id').onDelete('CASCADE');;
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('description'),
    knex.schema.dropTable('directions'),
    knex.schema.dropTable('colors'),
    knex.schema.dropTable('attributes'),
    knex.schema.dropTable('details'),
  ]);
};
