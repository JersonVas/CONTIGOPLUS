"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// Asegúrate de que la ruta de importación sea correcta
import CardMedicamentos from "./components/medicamentos/card-medicamentos";
import { format } from 'date-fns';

export default function Medicamentos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Si tienes un mock o API real, esto sigue igual
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/medicamentos`)
      .then((res) => res.json())
      .then((data) => mostrarRegistros(data))
      .catch((err) => console.error("Error al cargar medicamentos:", err));
  }, []);

  const mostrarRegistros = (data: any) => {
    setData(
      data.map((e: any) => {
        return {
          ...e,
          fecha_registro: format(new Date(e.fecha_registro), "dd/MM/yyyy"),
        };
      })
    );
  };

  return (
    // Agregamos padding (p-8) para que no pegue a los bordes
    <main className="p-4 md:p-8 bg-gray-50 min-h-screen"> 
      
      {/* Encabezado mejorado */}
      <div className="flex justify-between items-center mb-8">
        <div>
           <h5 className="text-2xl font-bold text-gray-800">Lista de medicamentos</h5>
           <p className="text-gray-500 text-sm">Gestiona tus tratamientos actuales</p>
        </div>
        
        <a className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition flex items-center gap-2 text-sm font-medium decoration-0" href="medicamentos/nuevo">
          <FontAwesomeIcon icon={faPlus} size="sm" /> 
          Agregar Medicamento
        </a>
      </div>

      {/* --- AQUÍ ESTÁ LA MAGIA DEL GRID --- */}
      {/* Esto transforma la lista en columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((e: any, index) => (
          <CardMedicamentos 
            key={index}
            // Mapeamos los campos de tu BD a las props de la tarjeta visual
            nombre={e.nombre}       // Asegúrate que tu API devuelve 'nombre'
            dosis={e.dosis}         // Asegúrate que tu API devuelve 'dosis'
            frecuencia={e.frecuencia} 
            duracion={e.duracion}
            // Si necesitas pasar el ID para editar/borrar luego:
            // id={e.id} 
          />
        ))}
      </div>
      
      {/* Mensaje si no hay datos */}
      {data.length === 0 && (
         <div className="text-center text-gray-400 py-10 col-span-full">
            No hay medicamentos registrados aún.
         </div>
      )}

    </main>
  );
}