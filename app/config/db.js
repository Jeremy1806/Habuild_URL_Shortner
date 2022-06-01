const {Pool} = require('pg');

let locaPoolConfig = {
    user:'postgres',
    password:'12345',
    host:'localhost',
    port:'5432',
    database:'urlshortner'
}

const poolConfig = process.env.DATABASE_URL ? {
    connectionString : process.env.DATABASE_URL,
    ssl : { rejectUnauthorized: false} 
} : locaPoolConfig;

const pool = new Pool(poolConfig);

module.exports = pool;