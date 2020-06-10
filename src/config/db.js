const { Pool } = require("pg");

module.exports = new Pool({
    user: 'postgres',
    password: '26218803',
    host: 'localhost',
    port: 5432,
    database: 'private_homeschooling'
});