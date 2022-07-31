/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.alterTable('grid_status', table => {
         table.float('consumption');
         table.float('production');
     })
 };
 
 /**
  * @param { import("knex").Knex } knex
  * @returns { Promise<void> }
  */
 exports.down = function(knex) {
     return knex.schema.alterTable('grid_status', table => {
        table.dropColumn('consumption');
        table.dropColumn('production');
     })
 };
 