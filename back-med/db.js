const { Pool } = require('pg');

// *************************************************************************
// SOLUCIÓN TEMPORAL: USAR CREDENCIALES CODIFICADAS (Hardcoded)
// Se usa el host y el puerto INTERNO de Railway para asegurar que la API
// escriba en la misma DB que Adminer está leyendo.
// ESTO SOLO ES PARA PRUEBAS LOCALES. Reemplazar por variables de entorno
// en un ambiente de producción.
// *************************************************************************

const pool = new Pool({
  // Host y Puerto Interno (el que usa Adminer):
  host: 'postgres.railway.internal', 
  port: 5432, // Puerto interno estándar de PostgreSQL
  
  // Tus credenciales codificadas:
  user: 'postgres',
  password: 'hctayqWJIgKcYYTHlBPSYFCOrjVnDaFJ',
  database: 'railway',
  
  ssl: {
      // Necesario para conexiones SSL
      rejectUnauthorized: false 
  }
});

/* // Configuración anterior que funcionó para la conexión, pero NO para la sincronización con Adminer:
// host: 'tramway.proxy.rlwy.net', 
// port: 12150, 
*/

module.exports = pool;