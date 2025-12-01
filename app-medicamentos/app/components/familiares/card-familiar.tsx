"use client";
import { useEffect, useState } from "react";
import CardFamiliar from "../components/familiares/card-familiar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSave } from "@fortawesome/free-solid-svg-icons";

export default function FamiliaresPage() {
  const [familiares, setFamiliares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Estado para el formulario nuevo
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    documento_identidad: "",
    correo: "",
    parentesco: "",
    telefono: "",
    fecha_nacimiento: ""
  });

  // Cargar datos
  const fetchFamiliares = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/familiares`);
      const data = await res.json();
      setFamiliares(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamiliares();
  }, []);

  // Manejar inputs del formulario
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Guardar nuevo familiar
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/familiares/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert("Familiar guardado con éxito");
        setForm({ nombre: "", apellido: "", documento_identidad: "", correo: "", parentesco: "", telefono: "", fecha_nacimiento: "" }); // Limpiar
        fetchFamiliares(); // Recargar lista automáticamente
      } else {
        alert("Error al guardar");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans">
      
      {/* Título */}
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Familiares</h1>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- COLUMNA IZQUIERDA: FORMULARIO (Estilo de tu imagen) --- */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Agregar Nuevo Familiar</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Nombre y Apellido */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nombre</label>
                  <input required name="nombre" value={form.nombre} onChange={handleChange} type="text" placeholder="Ej: Juan" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Apellido</label>
                  <input required name="apellido" value={form.apellido} onChange={handleChange} type="text" placeholder="Ej: Pérez" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>
              </div>

              {/* DNI */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">DNI</label>
                <input required name="documento_identidad" value={form.documento_identidad} onChange={handleChange} type="text" placeholder="Ej: 12345678" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email</label>
                <input required name="correo" value={form.correo} onChange={handleChange} type="email" placeholder="juan.perez@correo.com" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>

              {/* Parentesco */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Parentesco</label>
                <input required name="parentesco" value={form.parentesco} onChange={handleChange} type="text" placeholder="Ej: Padre, Hermano" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>

              {/* Celular y Fecha (En una fila para ahorrar espacio) */}
              <div className="grid grid-cols-2 gap-3">
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Celular</label>
                    <input required name="telefono" value={form.telefono} onChange={handleChange} type="text" placeholder="999..." className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                 </div>
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nacimiento</label>
                    <input required name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} type="date" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                 </div>
              </div>

              {/* Botón Azul Grande */}
              <button disabled={submitting} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2 mt-2 shadow-md">
                {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : "Guardar Familiar"}
              </button>
            </form>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: LISTA (Mis Familiares) --- */}
        <div className="lg:col-span-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Mis Familiares</h2>
          {loading ? (
            <div className="flex justify-center p-10"><FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 text-2xl"/></div>
          ) : (
            <div className="space-y-3">
              {familiares.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
                  No tienes familiares registrados aún. Usa el formulario de la izquierda.
                </div>
              ) : (
                familiares.map((fam: any) => (
                  <CardFamiliar key={fam.id_familiar} fam={fam} />
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}