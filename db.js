const { Pool } = require('pg')

//this is my LOCALHOST

const pool = new Pool({
  host: "localhost",
  user: 'postgres',
  password: "crossmyheart1243",
  port: 5432,
  database: "eczane",
})

//this is my SERVER ENVIORMENT VAR

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

module.exports = pool;