const { Pool } = require('pg');

// *************************************************************************
// SOLUCIÓN TEMPORAL: USAR CREDENCIALES CODIFICADAS (Hardcoded)
// Se usa el host y el puerto PÚBLICO (proxy) de Railway ya que el host 
// interno 'postgres.railway.internal' falló con ENOTFOUND.
// ESTO SOLO ES PARA PRUEBAS LOCALES Y DEBE REEMPLAZARSE POR VARIABLES DE ENTORNO 
// EN UN AMBIENTE DE PRODUCCIÓN.
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
      rejectUnauthorized: false // Necesario para la conexión a través del proxy
  }
});

/* // Configuraciones anteriores (mantenidas como referencia):
// 1. connectionString: process.env.DATABASE_URL
// 2. host: process.env.PGHOST || 'postgres.railway.internal' (falló ENOTFOUND)
*/

module.exports = pool;