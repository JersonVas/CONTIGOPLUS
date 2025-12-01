const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Railway suele dar esta variable que incluye todo junto
  ssl: {
    rejectUnauthorized: false,
  },
});

// Opción B: Si prefieres usar las variables separadas (también funciona):
/*
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false }
});
*/

module.exports = pool;
