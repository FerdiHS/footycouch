const { createPool } = require("mysql");

const pool = createPool({
    
    port: process.env.MYSQLPORT || 3306,
    host: process.env.MYSQLHOST || "localhost",
    user: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "",
    database: process.env.MYSQLDATABASE || "footycouch",
    // connectionLimit: 50,
});

pool

module.exports = pool;