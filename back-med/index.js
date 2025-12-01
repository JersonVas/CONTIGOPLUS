const express = require('express');
const cors = require('cors');

const pool = require('./db');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Conectado');
});

//FAMILIARES
app.get('/familiares', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM familiares');
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
      'SELECT * FROM familiares WHERE id_familiar = $1',
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
app.post('/familiares/save', async (req, res) => {
  const { nombre, apellido, parentesco, fecha_nacimiento, documento_identidad } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO familiares (nombre,apellido,parentesco,fecha_nacimiento,documento_identidad,id_usuario_cuidador) VALUES ($1,$2,$3,$4,$5,0) RETURNING *',
      [nombre,apellido,parentesco,fecha_nacimiento,documento_identidad]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al insertar');
  }
});
app.put('/familiares/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, parentesco, fecha_nacimiento, documento_identidad} = req.body;

  try {
    const result = await pool.query(
      'UPDATE familiares SET nombre = $1, apellido = $2, parentesco = $3, fecha_nacimiento = $4 , documento_identidad = $5, id_usuario_cuidador = 0  WHERE id_familiar = $6 RETURNING *',
      [nombre,apellido,parentesco,fecha_nacimiento,documento_identidad, id]
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
    const result = await pool.query('DELETE FROM familiares WHERE id_familiar = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }

    res.json({ message: 'Registro eliminado', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar registro' });
  }
});

//MEDICAMENTOS
app.get('/medicamentos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM medicamentos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
});
app.get('/medicamentos/single/:id', async (req, res) => {
  const { id } = req.params;
  try {
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
    const result = await pool.query(
      'UPDATE medicamentos SET id_familiar = $1, nombre_medicamento = $2, dosis = $3, frecuencia = $4 , duracion_tratamiento = $5, fecha_registro = $6  WHERE id_medicamento = $7 RETURNING *',
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


//SINTOMAS
app.get('/sintomas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sintomas');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
});
app.get('/sintomas/single/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM sintomas WHERE id_sintoma = $1',
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
    const result = await pool.query(
      'INSERT INTO sintomas (id_familiar,tipo_sintoma,intensidad,fecha_inicio,comentarios) VALUES ($1,$2,$3,$4,$5) RETURNING *',
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
    const result = await pool.query(
      'UPDATE sintomas SET id_familiar = $1, tipo_sintoma = $2, intensidad = $3, fecha_inicio = $4 , comentarios = $5 WHERE id_sintoma = $6 RETURNING *',
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
    const result = await pool.query('DELETE FROM sintomas WHERE id_sintoma = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }

    res.json({ message: 'Registro eliminado', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar registro' });
  }
});


//Historial
app.get('/historial', async (req, res) => {

  try {
    const medicamentos = await pool.query(
      "SELECT nombre_medicamento, dosis, frecuencia, fecha_registros FROM medicamentos"
    );
    const sintomas = await pool.query(
      "SELECT tipo_sintoma, intensidad, comentarios, fecha_inicio FROM sintomas"
    );

    // Normalizamos para que tengan la misma estructura
    const med = medicamentos.rows.map(m => ({
      tipo: "medicamento",
      descripcion: m.nombre_medicamento,
      dosis: m.dosis,
      frecuencia: m.frecuencia,
      fecha: m.fecha_registros,
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

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});