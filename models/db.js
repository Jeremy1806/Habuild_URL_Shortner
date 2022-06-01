const { Pool } = require("pg");

let locaPoolConfig = {
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: "5432",
  database: "postgres",
};

const poolConfig = locaPoolConfig;

const pool = new Pool(poolConfig);

module.exports = pool;
