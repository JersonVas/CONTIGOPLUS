import React from 'react';

// Interfaz para definir la estructura de las propiedades (Props)
interface CardMedicamentosProps {
  // Ahora, la propiedad 'familiar' es opcional o puede ser null/undefined según la API
  familiar?: { id: number; nombre: string } | null; 
  nombre: string;
  dosis: number;
  frecuencia: string;
  duracion: number;
  // Agrega aquí cualquier otra prop que utilices, como onEdit o onDelete
}

const CardMedicamentos: React.FC<CardMedicamentosProps> = ({ 
  familiar,
  nombre, 
  dosis, 
  frecuencia, 
  duracion 
}) => {
  // Definimos el nombre del familiar o un texto de reemplazo seguro
  const nombreFamiliar = familiar ? familiar.nombre : "Sin familiar asignado";

  return (
    // Contenedor principal con diseño moderno de Tailwind
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-600">
      
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

      {/* Espacio para los botones de acción (Editar/Eliminar) */}
      <div className="mt-5 pt-3 border-t flex justify-end">
        {/* Aquí puedes añadir tus botones de acción si los necesitas */}
      </div>

    </div>
  );
};

export default CardMedicamentos;