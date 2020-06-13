exports.up = function(knex) {
    return knex.schema.createTable('list', function (table){
      table.string('id').primary();
      table.string('product').notNullable();
      table.decimal('price').notNullable();
      table.decimal('quantity').notNullable();
      table.decimal('amount').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('list')
};
