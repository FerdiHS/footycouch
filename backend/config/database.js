const { createPool } = require("mysql");

const pool = createPool({
    // Database at Railway
    
    port: process.env.MYSQLPORT,
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    
    // Database at local
    /*
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    */
    // connectionLimit: 50,
});

pool

module.exports = pool;