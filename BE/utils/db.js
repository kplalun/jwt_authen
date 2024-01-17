const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

async function excute(query, values) {
  try {
    const result = await pool.query(query, values);
    if (result.rows[0] === undefined) {
      return { status: 200, result:[], message: "ไม่พบข้อมูล" };
    } else {
      return { status: 200, result: result.rows[0] };
    }
  } catch (err) {
    return { status: 400, message: err.message, sql: query };
  }
}

module.exports = excute;
