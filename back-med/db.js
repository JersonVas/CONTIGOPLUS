const { Pool } = require('pg');

// HOST INTERNO DE RAILWAY:
// Este host se resuelve correctamente DENTRO de un Codespace o un servicio de Railway.
const INTERNAL_DB_HOST = 'postgres.railway.internal'; 
const STANDARD_PG_PORT = 5432; // Puerto estándar de PostgreSQL

const pool = new Pool({
  // Se usa el host interno para evitar el error ENOTFOUND.
  user: process.env.PGUSER,
  host: INTERNAL_DB_HOST, 
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: STANDARD_PG_PORT,
  ssl: {
      rejectUnauthorized: false // Necesario para conexiones SSL de Railway
  }
});

/* // Configuración anterior que causaba el error ENOTFOUND:
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false,
  },
});
*/

module.exports = pool;