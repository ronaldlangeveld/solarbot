/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.alterTable('grid_status', table => {
         table.integer('battery_level');
     })
 };
 
 /**
  * @param { import("knex").Knex } knex
  * @returns { Promise<void> }
  */
 exports.down = function(knex) {
     return knex.schema.alterTable('grid_status', table => {
         table.dropColumn('battery_level');
     })
 };
 