const path = require('path');

// Define dbPath from an environment variable or default to 'db.sqlite3' in the current directory
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'db.sqlite3');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: dbPath, // Use the dbPath variable here
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    useNullAsDefault: true, // Required for SQLite
  },
};
