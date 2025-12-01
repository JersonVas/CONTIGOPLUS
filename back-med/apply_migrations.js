const pool = require('./db');

async function applyMigrations() {
    console.log('Iniciando migración: Añadiendo restricciones UNIQUE...');
    try {
        // Ejecutar la primera migración: Añadir UNIQUE al documento_identidad
        await pool.query(`
            ALTER TABLE registros_familiares
            ADD CONSTRAINT unique_documento UNIQUE (documento_identidad);
        `);
        console.log('✅ Restricción UNIQUE añadida a documento_identidad.');

        // Ejecutar la segunda migración: Añadir UNIQUE al correo
        await pool.query(`
            ALTER TABLE registros_familiares
            ADD CONSTRAINT unique_correo UNIQUE (correo);
        `);
        console.log('✅ Restricción UNIQUE añadida a correo.');

        console.log('🎉 Migraciones completadas con éxito.');
    } catch (error) {
        // Es importante atrapar el error si la restricción ya existe (por ejemplo, "duplicate key name")
        // y solo reportar el error si es un fallo crítico.
        if (error.code === '42P07') {
             console.log('⚠️ Aviso: La restricción ya existe. Migración ignorada.');
        } else {
             console.error('❌ Error durante la migración:', error);
             process.exit(1); // Detiene el proceso si falla
        }
    } finally {
        pool.end(); // Cierra el pool de conexiones
    }
}

applyMigrations();