const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "xps700",
    host: "localhost",
    port: 5432,
    database: "jagiweb"
});

module.exports = pool;