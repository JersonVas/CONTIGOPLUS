"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns';

import CardMedicamentos from "../componentes/medicamentos/card-medicamentos";

export default function MedicamentosPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Asegúrate de que esta URL apunte al puerto 4001 si el backend está ahí
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/medicamentos`)
      .then((res) => res.json())
      .then((data) => mostrarRegistros(data))
      .catch((err) => console.error("Error al cargar medicamentos:", err));
  }, []);

  const mostrarRegistros = (data: any) => {
    setData(
      data.map((e: any) => {
        return {
          ...e,
          // Utilizamos el campo 'id_medicamento' tal como viene de la BD
          id: e.id_medicamento, 
          fecha_registro: e.fecha_registro ? format(new Date(e.fecha_registro), "dd/MM/yyyy") : "",
        };
      })
    );
  };

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h5 className="text-2xl font-bold text-gray-800">Lista de medicamentos</h5>
           <p className="text-gray-500 text-sm">Gestiona tus tratamientos actuales</p>
        </div>
        
        <a className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition flex items-center gap-2 text-sm font-medium decoration-0" href="/medicamentos/nuevo">
          <FontAwesomeIcon icon={faPlus} size="sm" /> 
          Agregar Medicamento
        </a>
      </div>

      {/* AQUÍ ESTÁ EL GRID QUE HACE QUE SE VEA MODERNO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((e, index) => (
          <CardMedicamentos 
             key={index}
              // ✅ AÑADIDO: Pasamos la ID del medicamento
              id_medicamento={e.id_medicamento}
              // ✅ CONFIRMADO: Pasamos el objeto familiar
              familiar={e.familiar} 
             nombre={e.nombre_medicamento || e.nombre} // Usar nombre_medicamento o nombre
             dosis={e.dosis}
             frecuencia={e.frecuencia}
             duracion={e.duracion_tratamiento || e.duracion} // Usar duracion_tratamiento o duracion
          />
        ))}
      </div>
      
      {data.length === 0 && (
         <div className="text-center text-gray-400 py-10 col-span-full">
            No hay medicamentos registrados o cargando...
         </div>
      )}

    </main>
  );
}