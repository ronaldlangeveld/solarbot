// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  database: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite3'
    }
  },

};
