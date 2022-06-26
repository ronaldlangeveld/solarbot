/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const json = require('../../seed/solar_old.json');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const dataset = [];
  await json.map((item, index) => {
    dataset.push({
      status: +(item.STATUS),
      timestamp: item.TIMESTAMP * 1000
    });
  });
 await knex.batchInsert('grid_status', dataset, 30);
};
