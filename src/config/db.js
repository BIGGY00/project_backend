const mysql = require('mysql2')

const { envHOST, envUSER, envPASS, envNAME} = require('../helpers/env')

const conn = mysql.createConnection ({
  host: envHOST,
  user: envUSER,
  password: envPASS,
  database: envNAME
})

module.exports = conn