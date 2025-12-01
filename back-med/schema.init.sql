-- =======================================================
-- ESQUEMA COMPLETO DE LA BASE DE DATOS 'BD_Contigo'
-- Este script crea todas las tablas y sus relaciones (Foreign Keys).
-- =======================================================

-- 1. Crear el Esquema si no existe
CREATE SCHEMA IF NOT EXISTS "BD_Contigo";

-- 2. Establecer el Path de Búsqueda para trabajar en este esquema
-- Las consultas de la API (index.js) usarán este esquema por defecto.
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
    correo VARCHAR(255) UNIQUE NOT NULL, -- UNIQUE para garantizar un solo correo por usuario
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
    -- NOTA: id_usuario_cuidador DEBERÍA ser una FK a usuarios(id_usuario)
    -- Lo dejamos como INTEGER por ahora, asumiendo que el valor 0 es temporal.
    id_usuario_cuidador INTEGER NOT NULL DEFAULT 0,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    parentesco VARCHAR(255),
    fecha_nacimiento DATE,
    documento_identidad VARCHAR(255) UNIQUE NOT NULL, -- RESTRICCIÓN ÚNICA (DNI)
    correo VARCHAR(255) UNIQUE,                      -- RESTRICCIÓN ÚNICA
    telefono VARCHAR(50) UNIQUE,                     -- RESTRICCIÓN ÚNICA
    info_emergencia_tipo_sangre VARCHAR(255),
    info_emergencia_alergias TEXT,
    info_emergencia_condiciones TEXT
    
    -- Clave Foránea a usuarios (Descomentar cuando la tabla 'usuarios' tenga datos válidos)
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