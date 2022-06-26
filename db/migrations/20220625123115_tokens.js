/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tokens', table => {
        table.increments('id').primary();
        table.string('access').notNullable();
        table.string('refresh').notNullable();
        table.timestamp('expires');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('tokens');
};
