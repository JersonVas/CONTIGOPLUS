const express = require('express');
const cors = require('cors');

const pool = require('./db'); // Importa la conexión Pool
// 💥 PUERTO 4001 DEFINIDO
const PORT = process.env.PORT || 4001; 

const app = express();

// ==========================================
// 🎯 PRUEBA DE CONEXIÓN A BASE DE DATOS (AGREGADO)
// ==========================================

async function testDBConnection() {
    try {
        // Ejecuta una consulta simple para verificar que la conexión está viva
        const res = await pool.query('SELECT NOW()'); 
        console.log('✅ CONEXIÓN EXITOSA: La Base de Datos PostgreSQL está activa.');
        // Puedes imprimir la hora del servidor DB si quieres más detalles
        // console.log('Hora del servidor DB:', res.rows[0].now); 
    } catch (err) {
        // Si hay un error, lo registramos claramente en la consola
        console.error('❌ ERROR DE CONEXIÓN A DB: No se pudo conectar a PostgreSQL.', err.message);
        // Opcionalmente, puedes decidir si detener la aplicación si la conexión a DB es crítica
        // process.exit(1);
    }
}
// Llama a la función de prueba inmediatamente
testDBConnection();

// ==========================================
// CONFIGURACIÓN DE EXPRESS
// ==========================================
app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Conectado');
});

// ==========================================
// FAMILIARES (TODAS LAS TABLAS DEBEN USAR EL PREFIJO 'registros_')
// ==========================================

app.get('/familiares', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM registros_familiares');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
});

app.get('/familiares/single/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM registros_familiares WHERE id_familiar = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
});

// AQUI ESTA EL CAMBIO IMPORTANTE: Manejo de errores de unicidad (DNI, Correo, Teléfono)
app.post('/familiares/save', async (req, res) => {
  const { nombre, apellido, parentesco, fecha_nacimiento, documento_identidad, correo, telefono } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO registros_familiares (nombre, apellido, parentesco, fecha_nacimiento, documento_identidad, correo, telefono, id_usuario_cuidador) VALUES ($1, $2, $3, $4, $5, $6, $7, 0) RETURNING *',
      [nombre, apellido, parentesco, fecha_nacimiento, documento_identidad, correo, telefono]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al intentar guardar familiar:', err);
      
    // 🎯 CÓDIGO DE ERROR DE VIOLACIÓN DE RESTRICCIÓN ÚNICA EN POSTGRESQL ES '23505'
    if (err.code === '23505') {
        let field = 'campo desconocido';
        
        // Identificar la restricción específica basándose en el nombre de la restricción (err.constraint)
        if (err.constraint.includes('documento_identidad')) {
            field = 'documento de identidad (DNI)';
        } else if (err.constraint.includes('correo')) {
            field = 'correo electrónico';
        } else if (err.constraint.includes('telefono')) {
            field = 'teléfono';
        }

        // Devolver un error 409 (Conflict) al cliente con un mensaje claro
        return res.status(409).json({ 
            error: 'Conflicto de Datos', 
            message: `Ya existe un familiar con el mismo ${field} registrado. Por favor, verifique los datos.`,
            field: field
        });
    }
    
    // Si no es un error de unicidad (ej. error de servidor, de sintaxis SQL), devolver un error genérico 500
    res.status(500).json({ error: 'Error al insertar registro familiar', details: err.message });
  }
});

// AQUI TAMBIEN: Agregamos correo y telefono al UPDATE
app.put('/familiares/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, parentesco, fecha_nacimiento, documento_identidad, correo, telefono } = req.body;

  try {
    const result = await pool.query(
      'UPDATE registros_familiares SET nombre = $1, apellido = $2, parentesco = $3, fecha_nacimiento = $4, documento_identidad = $5, correo = $6, telefono = $7, id_usuario_cuidador = 0 WHERE id_familiar = $8 RETURNING *',
      [nombre, apellido, parentesco, fecha_nacimiento, documento_identidad, correo, telefono, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar registro' });
  }
});

app.delete('/familiares/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM registros_familiares WHERE id_familiar = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }

    res.json({ message: 'Registro eliminado', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar registro' });
  }
});

// ==========================================
// MEDICAMENTOS
// ==========================================
app.get('/medicamentos', async (req, res) => {
  try {
    // 💥 CAMBIO CRUCIAL: Usamos un JOIN para obtener el nombre del familiar
    const query = `
      SELECT 
        m.*,
        f.nombre AS nombre_familiar,
        f.id_familiar AS id_familiar_fk
      FROM 
        medicamentos m  -- 🎯 USAMOS 'medicamentos' (según la captura de la tabla)
      LEFT JOIN 
        registros_familiares f ON m.id_familiar = f.id_familiar
    `;
    const result = await pool.query(query);

    // Mapeamos los resultados para crear el objeto 'familiar' esperado por el frontend
    const medicamentosConFamiliar = result.rows.map(m => ({
        // Copia todas las propiedades del medicamento (m.nombre_medicamento, dosis, etc.)
        ...m,
        // Creamos el objeto 'familiar' que el frontend espera
        familiar: m.id_familiar_fk ? {
            id: m.id_familiar_fk,
            nombre: m.nombre_familiar
        } : null
    }));

    res.json(medicamentosConFamiliar);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
});

app.get('/medicamentos/single/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // 🎯 USAMOS 'medicamentos'
    const result = await pool.query(
      'SELECT * FROM medicamentos WHERE id_medicamento = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
});

app.post('/medicamentos/save', async (req, res) => {
  const { id_familiar, nombre_medicamento, dosis, frecuencia, duracion_tratamiento } = req.body;
  try {
    const today = new Date();
    // 🎯 USAMOS 'medicamentos'
    const result = await pool.query(
      'INSERT INTO medicamentos (id_familiar,nombre_medicamento,dosis,frecuencia,duracion_tratamiento,fecha_registro) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [id_familiar,nombre_medicamento,dosis,frecuencia,duracion_tratamiento, today]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al insertar');
  }
});

app.put('/medicamentos/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { id_familiar, nombre_medicamento, dosis, frecuencia, duracion_tratamiento } = req.body;

  try {
    const today = new Date();
    // 🎯 USAMOS 'medicamentos'
    const result = await pool.query(
      'UPDATE medicamentos SET id_familiar = $1, nombre_medicamento = $2, dosis = $3, frecuencia = $4 , duracion_tratamiento = $5, fecha_registro = $6  WHERE id_medicamento = $7 RETURNING *',
      [id_familiar,nombre_medicamento,dosis,frecuencia,duracion_tratamiento, today, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar registro' });
  }
});

app.delete('/medicamentos/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // 🎯 USAMOS 'medicamentos'
    const result = await pool.query('DELETE FROM medicamentos WHERE id_medicamento = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }

    res.json({ message: 'Registro eliminado', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar registro' });
  }
});


// ==========================================
// SINTOMAS
// ==========================================
app.get('/sintomas', async (req, res) => {
  try {
    // ✅ USAMOS 'registros_sintomas'
    const result = await pool.query('SELECT * FROM registros_sintomas');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
});

app.get('/sintomas/single/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // ✅ USAMOS 'registros_sintomas'
    const result = await pool.query(
      'SELECT * FROM registros_sintomas WHERE id_sintoma = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
});

app.post('/sintomas/save', async (req, res) => {
  const { id_familiar, tipo_sintoma, intensidad, fecha_inicio, comentarios } = req.body;
  try {
    // ✅ USAMOS 'registros_sintomas'
    const result = await pool.query(
      'INSERT INTO registros_sintomas (id_familiar,tipo_sintoma,intensidad,fecha_inicio,comentarios) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [id_familiar,tipo_sintoma,intensidad,fecha_inicio,comentarios]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al insertar');
  }
});

app.put('/sintomas/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { id_familiar, tipo_sintoma, intensidad, fecha_inicio, comentarios } = req.body;
  try {
    // ✅ USAMOS 'registros_sintomas'
    const result = await pool.query(
      'UPDATE registros_sintomas SET id_familiar = $1, tipo_sintoma = $2, intensidad = $3, fecha_inicio = $4 , comentarios = $5 WHERE id_sintoma = $6 RETURNING *',
      [id_familiar,tipo_sintoma,intensidad,fecha_inicio,comentarios, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar registro' });
  }
});

app.delete('/sintomas/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // ✅ USAMOS 'registros_sintomas'
    const result = await pool.query('DELETE FROM registros_sintomas WHERE id_sintoma = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }

    res.json({ message: 'Registro eliminado', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar registro' });
  }
});


// ==========================================
// HISTORIAL
// ==========================================
app.get('/historial', async (req, res) => {
  try {
    // 🎯 USAMOS 'medicamentos'
    const medicamentos = await pool.query(
      "SELECT nombre_medicamento, dosis, frecuencia, fecha_registro FROM medicamentos"
    );
    // ✅ USAMOS 'registros_sintomas'
    const sintomas = await pool.query(
      "SELECT tipo_sintoma, intensidad, comentarios, fecha_inicio FROM registros_sintomas"
    );

    // Normalizamos para que tengan la misma estructura
    const med = medicamentos.rows.map(m => ({
      tipo: "medicamento",
      descripcion: m.nombre_medicamento,
      dosis: m.dosis,
      frecuencia: m.frecuencia,
      fecha: m.fecha_registro,
    }));

    const sint = sintomas.rows.map(s => ({
      tipo: "sintoma",
      descripcion: s.tipo_sintoma,
      intensidad: s.intensidad,
      comentarios: s.comentarios,
      fecha: s.fecha_inicio,
    }));

    // Combinamos y ordenamos por fecha DESC
    const registros = [...med, ...sint].sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
    res.json(registros);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error en la consulta");
  }
});
// Fragmento de index.js
app.post('/familiares/save', async (req, res) => {
    // ... lógica de validación
    try {
        // ... consulta SQL
    } catch (err) {
        console.error(err); // <-- ESTO es lo que necesitamos ver
        res.status(500).send('Error al insertar');
    }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});