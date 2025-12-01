import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

export default function CardFamiliar({ fam }: any) {
  
  const eliminarFamiliar = async (id: number) => {
    // Usamos window.confirm para asegurar que el usuario quiere borrar
    if (confirm(`¿Eliminar a ${fam.nombre}?`)) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/familiares/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        window.location.reload();
      } catch (error) {
        alert("Error al eliminar.");
      }
    }
  };

  // Obtener inicial para el avatar
  const inicial = fam.nombre ? fam.nombre.charAt(0).toUpperCase() : "?";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition-all">
      
      {/* Lado Izquierdo: Avatar + Info */}
      <div className="flex items-center gap-4">
        {/* Avatar Circular Azul */}
        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
          {inicial}
        </div>
        
        {/* Texto */}
        <div>
          <h3 className="font-bold text-gray-800 text-sm md:text-base capitalize">
            {fam.nombre} {fam.apellido}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            DNI: {fam.documento_identidad} <span className="mx-1 text-gray-300">|</span> Parentesco: {fam.parentesco}
          </p>
        </div>
      </div>

      {/* Lado Derecho: Acciones */}
      <div className="flex items-center gap-2">
        <a 
          href={`familiares/detalles/${fam.id_familiar}`} 
          className="h-8 w-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          title="Ver Detalles"
        >
          <FontAwesomeIcon icon={faEye} />
        </a>
        
        <button 
          onClick={() => eliminarFamiliar(fam.id_familiar)}
          className="h-8 w-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          title="Eliminar"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}