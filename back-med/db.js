const { Pool } = require('pg');

// *************************************************************************
// SOLUCIÓN FINAL: USAR CREDENCIALES CODIFICADAS (Hardcoded)
// Se usa el host y el puerto PÚBLICO (proxy) de Railway porque es la única
// configuración que el Codespace pudo resolver con éxito.
// *************************************************************************

const pool = new Pool({
  // Host público (proxy) y puerto de tu URL:
  host: 'tramway.proxy.rlwy.net', 
  port: 12150, 
  
  // Tus credenciales codificadas:
  user: 'postgres',
  password: 'hctayqWJIgKcYYTHlBPSYFCOrjVnDaFJ',
  database: 'railway',
  
  ssl: {
      // Necesario para la conexión a través del proxy
      rejectUnauthorized: false 
  }
});

/* // Configuración interna que falló con ENOTFOUND:
// host: 'postgres.railway.internal', 
// port: 5432, 
*/

module.exports = pool;