const Pool = require('pg').Pool
const pool = new Pool({
  user: 'alan',
  password: '1234',
  host: '35.199.65.147',
  database: 'bd1rede',
  port: 5432,
})

module.exports = pool;