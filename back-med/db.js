const { Pool } = require('pg');

// Railway y otros entornos suelen definir PGHOST con la dirección interna
// (ej. 'postgres.railway.internal' o un nombre de servicio).
const DB_HOST = process.env.PGHOST || 'localhost'; // Usamos PGHOST si existe, si no, 'localhost'
const STANDARD_PG_PORT = process.env.PGPORT || 5432; // Usamos PGPORT si existe, si no, 5432

const pool = new Pool({
  // Se usa la variable de entorno PGHOST para mayor robustez.
  user: process.env.PGUSER,
  host: DB_HOST, 
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: STANDARD_PG_PORT,
  ssl: {
      rejectUnauthorized: false // Necesario para conexiones SSL de Railway
  }
});

/* // Configuraciones anteriores (mantenidas como referencia):
// 1. connectionString: process.env.DATABASE_URL (falló por host externo)
// 2. host: 'postgres.railway.internal' (falló por ENOTFOUND, lo que sugiere que la variable PGHOST es la correcta en este entorno)
*/

module.exports = pool;