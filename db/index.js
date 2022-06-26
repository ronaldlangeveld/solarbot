const knexfile = require('./knexfile')

const db = require('knex')(knexfile['development'])

module.exports = db;