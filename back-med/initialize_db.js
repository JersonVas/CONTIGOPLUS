/**
 * Script de inicialización de la base de datos "BD_Contigo".
 *
 * Este script utiliza la librería 'pg' para conectarse a PostgreSQL
 * y ejecutar todo el esquema de creación de tablas definido.
 *
 * IMPORTANTE: Se han usado las credenciales codificadas (hardcoded) de Railway
 * para garantizar la conexión, ya que es la configuración que funciona en el entorno.
 *
 * Requisitos:
 * 1. Tener instalado Node.js.
 * 2. Instalar la librería 'pg': npm install pg
 */

const { Client } = require('pg');

// =======================================================
// 1. CONFIGURACIÓN DE LA CONEXIÓN ( Railway - HARDCODED )
// =======================================================
// Se usa la configuración del archivo 'bd.js' para asegurar la conexión al proxy de Railway.
const dbConfig = {
    // Host público (proxy) y puerto de tu URL de Railway:
    host: 'tramway.proxy.rlwy.net', 
    port: 12150, 
    
    // Tus credenciales codificadas:
    user: 'postgres',
    password: 'hctayqWJIgKcYYTHlBPSYFCOrjVnDaFJ',
    database: 'railway', // La base de datos por defecto de Railway
    
    ssl: {
        // Necesario para la conexión a través del proxy de Railway
        rejectUnauthorized: false 
    }
};

// El esquema completo en formato SQL (copiado de schema.init.sql)
const sqlSchema = `
-- =======================================================
-- ESQUEMA COMPLETO DE LA BASE DE DATOS 'BD_Contigo'
-- =======================================================

-- 1. Crear el Esquema si no existe
CREATE SCHEMA IF NOT EXISTS "BD_Contigo";

-- 2. Establecer el Path de Búsqueda
SET search_path TO "BD_Contigo", public;

-- =======================================================
-- TABLA: roles
-- =======================================================
CREATE TABLE IF NOT EXISTS roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(255) UNIQUE NOT NULL
);

-- =======================================================
-- TABLA: usuarios
-- =======================================================
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    id_rol INTEGER NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL, 
    password_hash VARCHAR(255) NOT NULL,
    contacto_emergencia_nombre VARCHAR(255),
    contacto_emergencia_telefono VARCHAR(255),
    
    -- Clave Foránea a roles
    CONSTRAINT fk_rol
        FOREIGN KEY (id_rol)
        REFERENCES roles(id_rol)
        ON DELETE RESTRICT
);

-- =======================================================
-- TABLA: registros_familiares
-- =======================================================
CREATE TABLE IF NOT EXISTS registros_familiares (
    id_familiar SERIAL PRIMARY KEY,
    -- NOTA: La FK a usuarios(id_usuario) está comentada en el SQL original.
    -- La activaremos si se usa un valor por defecto diferente a 0 o se remueve el DEFAULT 0.
    id_usuario_cuidador INTEGER NOT NULL DEFAULT 0,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    parentesco VARCHAR(255),
    fecha_nacimiento DATE,
    documento_identidad VARCHAR(255) UNIQUE NOT NULL, 
    correo VARCHAR(255) UNIQUE, 
    telefono VARCHAR(50) UNIQUE, 
    info_emergencia_tipo_sangre VARCHAR(255),
    info_emergencia_alergias TEXT,
    info_emergencia_condiciones TEXT
    
    -- CONSTRAINT fk_usuario_cuidador
    --     FOREIGN KEY (id_usuario_cuidador)
    --     REFERENCES usuarios(id_usuario)
    --     ON DELETE SET DEFAULT 
);

-- =======================================================
-- TABLA: medicamentos
-- =======================================================
CREATE TABLE IF NOT EXISTS medicamentos (
    id_medicamento SERIAL PRIMARY KEY,
    id_familiar INTEGER NOT NULL,
    nombre_medicamento VARCHAR(255) NOT NULL,
    dosis VARCHAR(100),
    frecuencia VARCHAR(100),
    duracion_tratamiento VARCHAR(255),
    fecha_registro TIMESTAMP,
    
    -- Clave Foránea a registros_familiares
    CONSTRAINT fk_familiar_meds
        FOREIGN KEY (id_familiar)
        REFERENCES registros_familiares(id_familiar)
        ON DELETE CASCADE
);

-- =======================================================
-- TABLA: registros_sintomas
-- =======================================================
CREATE TABLE IF NOT EXISTS registros_sintomas (
    id_sintoma SERIAL PRIMARY KEY,
    id_familiar INTEGER NOT NULL,
    tipo_sintoma VARCHAR(255) NOT NULL,
    intensidad VARCHAR(50), 
    fecha_inicio TIMESTAMP,
    comentarios TEXT,
    
    -- Clave Foránea a registros_familiares
    CONSTRAINT fk_familiar_sintomas
        FOREIGN KEY (id_familiar)
        REFERENCES registros_familiares(id_familiar)
        ON DELETE CASCADE
);

-- =======================================================
-- TABLA: alertas_medicas
-- =======================================================
CREATE TABLE IF NOT EXISTS alertas_medicas (
    id_alerta SERIAL PRIMARY KEY,
    id_medicamento INTEGER NOT NULL,
    hora_programada TIMESTAMP NOT NULL,
    
    -- Clave Foránea a medicamentos
    CONSTRAINT fk_medicamento_alerta
        FOREIGN KEY (id_medicamento)
        REFERENCES medicamentos(id_medicamento)
        ON DELETE CASCADE
);
`;


// =======================================================
// 2. FUNCIÓN DE INICIALIZACIÓN
// =======================================================
async function initializeDB() {
    console.log('Iniciando la conexión a PostgreSQL con credenciales de Railway...');
    const client = new Client(dbConfig);

    try {
        await client.connect();
        console.log('Conexión establecida. Ejecutando script SQL...');

        // Ejecutar todo el script SQL. Esto creará el esquema y todas las tablas.
        await client.query(sqlSchema);
        
        console.log('✅ Base de datos "BD_Contigo" inicializada y esquema creado con éxito.');

    } catch (error) {
        console.error('❌ Error al inicializar la base de datos:', error.message);
        // Sugerencia: Si recibes "relation "roles" does not exist", es porque falta el SET search_path;
        // Si recibes "Connection Refused", verifica las credenciales y el estado de tu DB en Railway.
    } finally {
        // Asegúrate de cerrar la conexión
        await client.end();
        console.log('Conexión a la base de datos cerrada.');
    }
}

// =======================================================
// 3. EJECUCIÓN DEL SCRIPT
// =======================================================
initializeDB();