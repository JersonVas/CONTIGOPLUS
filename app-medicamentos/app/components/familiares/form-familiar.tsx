"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button, CircularProgress } from "@mui/material";

export default function FormFamiliar({ id }: any) {
  const [loading, setLoading] = useState(false);
  // CORRECCIÓN 1: Cambiamos 'celular' por 'telefono' para coincidir con la Base de Datos
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    parentesco: "",
    fecha_nacimiento: "",
    documento_identidad: "",
    infor_emergencia_tipo_sangre: "",
    infor_emergencia_alergias: "",
    infor_emergencia_condiciones: "",
    correo: "",
    telefono: "", 
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id && !isNaN(Number.parseInt(id))) {
      actualizarRegistro();
    } else {
      guardarRegistro();
    }
  };

  const setSingle = (data: any) => {
    // CORRECCIÓN 2: Quitamos el correo: '' y telefono: '' para que NO se borren al editar
    setFormData({
      ...data,
      infor_emergencia_tipo_sangre: data.infor_emergencia_tipo_sangre || '',
      infor_emergencia_alergias: data.infor_emergencia_alergias || '',
      infor_emergencia_condiciones: data.infor_emergencia_condiciones || '',
      fecha_nacimiento: format(new Date(data.fecha_nacimiento), "yyyy-MM-dd"),
    });
  };

  const guardarRegistro = async () => {
    setLoading(true);
    // Nota: Eliminé el salto de línea en la URL que podía causar error
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/familiares/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(res);
    if (res.ok) {
      const data = await res.json();
      alert("Registro guardado con éxito");
      window.location.href = "/familiares"; // Redirigir a la lista
    } else {
      console.error("Error al enviar datos");
      alert("Error al guardar");
    }
    setLoading(false);
  };

  const actualizarRegistro = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/familiares/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(res);
    if (res.ok) {
      const data = await res.json();
      alert("Registro actualizado");
      window.location.href = "/familiares";
    } else {
      console.error("Error al actualizar");
      alert("Error al actualizar");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id && !isNaN(Number.parseInt(id))) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/familiares/single/${id}`)
        .then(res => res.json())
        .then(data => setSingle(data))
        .finally(() => {
          setLoading(false);
        })
    }
  }, [id]);

  return (
    <main className="section-main">
      <h5> Familiares </h5>
      <div className="container">
        <form action="" onSubmit={handleSubmit}>
          <div className="container-double">
            <div className="container-group">
              <label> Apellidos </label>
              <div className="container-input">
                <input
                  type="text"
                  className="form-input"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
                <span> * </span>
              </div>
            </div>
            <div className="container-group">
              <label> Nombres </label>
              <div className="container-input">
                <input
                  type="text"
                  className="form-input"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
                <span> * </span>
              </div>
            </div>
          </div>
          <div className="container-double">
            <div className="container-group">
              <label> Parentesco </label>
              <div className="container-input">
                <input
                  type="text"
                  className="form-input"
                  name="parentesco"
                  value={formData.parentesco}
                  onChange={handleChange}
                  required
                />
                <span> * </span>
              </div>
            </div>
            <div className="container-group">
              <label> Fecha Nacimiento </label>
              <div className="container-input">
                <input
                  type="date"
                  className="form-input"
                  name="fecha_nacimiento"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  required
                />
                <span> * </span>
              </div>
            </div>
          </div>
          <div className="container-double">
            <div className="container-group">
              <label> Numero documento </label>
              <div className="container-input">
                <input
                  type="text"
                  className="form-input"
                  name="documento_identidad"
                  value={formData.documento_identidad}
                  onChange={handleChange}
                  required
                />
                <span> * </span>
              </div>
            </div>
            <div className="container-group">
              <label> Número celular </label>
              <div className="container-input">
                {/* CORRECCIÓN 3: name="telefono" y value={formData.telefono} */}
                <input
                  type="text"
                  className="form-input"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
                <span> * </span>
              </div>
            </div>
          </div>

          <div className="container-group">
            <label> Correo </label>
            <div className="container-input">
              <input
                type="text"
                className="form-input"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
              <span> * </span>
            </div>
          </div>
          <div className="container-msg">
            <span> * </span> Campos obligatorios
          </div>
          <div className="container-button">
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}