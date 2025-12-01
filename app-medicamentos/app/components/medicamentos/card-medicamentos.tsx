import React from 'react';

// Definimos qué datos espera recibir esta tarjeta
interface CardProps {
  nombre: string;
  dosis: string;
  frecuencia: string | number;
  duracion: string | number;
  // Opcionales por si aún no implementas las funciones
  onEdit?: () => void; 
  onDelete?: () => void;
}

const CardMedicamentos = ({ nombre, dosis, frecuencia, duracion, onEdit, onDelete }: CardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 overflow-hidden flex flex-col h-full group">
      
      {/* PARTE SUPERIOR */}
      <div className="p-5 flex justify-between items-start">
        <div className="flex gap-4 items-center">
          {/* Icono de pastilla (SVG integrado para no instalar nada extra) */}
          <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
          </div>
          
          {/* Textos */}
          <div>
            <h3 className="font-bold text-gray-800 text-lg leading-tight capitalize">{nombre}</h3>
            <p className="text-sm text-gray-500 mt-1">{dosis}</p>
          </div>
        </div>
      </div>

      {/* LÍNEA SEPARADORA */}
      <div className="mt-auto h-px bg-slate-100 w-full"></div>

      {/* PARTE INFERIOR (Detalles) */}
      <div className="bg-slate-50 p-4 flex justify-between items-center text-sm">
        <div className="flex flex-col">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Frecuencia</span>
           <span className="font-semibold text-slate-700">Cada {frecuencia} hrs</span>
        </div>
        
        {/* Separador vertical pequeño */}
        <div className="w-px h-6 bg-slate-200 mx-2"></div>

        <div className="flex flex-col items-end">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duración</span>
           <span className="font-semibold text-slate-700">{duracion} días</span>
        </div>
      </div>
      
      {/* BOTONES DE ACCIÓN (Aparecen al pasar el mouse o siempre visibles si prefieres) */}
      {/* Puedes descomentar esto si ya tienes las funciones de editar/borrar listas
      <div className="px-4 pb-4 flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit} className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200">Editar</button>
          <button onClick={onDelete} className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">Borrar</button>
      </div> 
      */}
    </div>
  );
};

export default CardMedicamentos;