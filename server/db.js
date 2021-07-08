const { Pool } = require('pg')

const pool = new Pool({
  host: "localhost",
  user: 'postgres',
  password: "crossmyheart1243",
  port: 5432,
  database: "eczane",
})

module.exports = pool;