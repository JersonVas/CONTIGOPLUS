import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'; // Importamos los iconos de Editar y Eliminar

// Interfaz para definir la estructura de las propiedades (Props)
interface CardMedicamentosProps {
  familiar?: { id: number; nombre: string } | null; 
  nombre: string;
  dosis: number;
  frecuencia: string;
  duracion: number;
  // Propiedades para manejar las acciones (necesarias para la navegación)
  id_medicamento: number; 
}

const CardMedicamentos: React.FC<CardMedicamentosProps> = ({ 
  familiar,
  nombre, 
  dosis, 
  frecuencia, 
  duracion,
  id_medicamento 
}) => {
  // Definimos el nombre del familiar o un texto de reemplazo seguro
  const nombreFamiliar = familiar ? familiar.nombre : "Sin familiar asignado";

  // Función de edición que redirige al formulario (asumiendo la ruta '/medicamentos/edit/[id]')
  const handleEdit = () => {
    window.location.href = `/medicamentos/editar/${id_medicamento}`;
  };

  // Función de eliminación (deberías implementar la lógica de confirmación en el futuro)
  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar ${nombre}?`)) {
      // Lógica de eliminación (DELETE API call) iría aquí
      alert(`Función de eliminar para el ID: ${id_medicamento} aún no implementada.`);
    }
  };

  return (
    // Contenedor principal con diseño moderno de Tailwind
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-600 flex flex-col">
      
      {/* Información principal */}
      <div className="flex-grow">
          {/* 1. Nombre del Familiar (Con verificación de seguridad) */}
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Para:</p>
          <h3 className="text-lg font-bold text-gray-800 mb-3">{nombreFamiliar}</h3>
          
          {/* 2. Nombre del Medicamento (Título principal) */}
          <h2 className="text-2xl font-extrabold text-blue-600 border-b pb-2 mb-4">{nombre}</h2>
          
          {/* Contenedor de las propiedades en formato de cuadrícula */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
            
            {/* Dosis */}
            <div className="flex flex-col">
              <span className="font-medium text-gray-500">Dosis:</span>
              <span className="text-gray-700 font-semibold">{dosis} pastillas/toma</span>
            </div>
            
            {/* Frecuencia */}
            <div className="flex flex-col">
              <span className="font-medium text-gray-500">Frecuencia:</span>
              <span className="text-gray-700 font-semibold">{frecuencia}</span>
            </div>
            
            {/* Duración (Sección que faltaba) */}
            <div className="flex flex-col">
              <span className="font-medium text-gray-500">Duración:</span>
              <span className="text-gray-700 font-semibold">{duracion} días</span>
            </div>
            
            {/* Placeholder para la fecha de registro */}
            <div className="flex flex-col">
              <span className="font-medium text-gray-500">Inicio:</span>
              <span className="text-gray-700 font-semibold">Fecha de inicio no definida</span> 
            </div>
          </div>
      </div>

      {/* 3. BOTONES DE ACCIÓN (NUEVO BLOQUE) */}
      <div className="mt-5 pt-3 border-t flex justify-end gap-3">
        
        {/* Botón Editar */}
        <button 
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition duration-150"
          title="Editar Medicamento"
        >
          <FontAwesomeIcon icon={faPencilAlt} size="sm" />
        </button>

        {/* Botón Eliminar */}
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition duration-150"
          title="Eliminar Medicamento"
        >
          <FontAwesomeIcon icon={faTrash} size="sm" />
        </button>

      </div>

    </div>
  );
};

export default CardMedicamentos;
