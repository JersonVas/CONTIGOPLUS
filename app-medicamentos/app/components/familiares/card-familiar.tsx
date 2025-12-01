import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
// Nota: faPlus no se usaba aquí, lo he quitado para limpiar

export default function CardFamiliar({ fam }: any) {
  
  const eliminarFamiliar = async (id: number) => {
    // Confirmación más segura
    const confirmar = window.confirm(`¿Estás seguro de eliminar a ${fam.nombre}?`);
    
    if (confirmar) {
      // CORRECCIÓN AQUÍ: Agregamos el '/' antes del ID
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/familiares/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert("Familiar eliminado correctamente");
        window.location.reload(); // Recargar para ver los cambios
      } else {
        console.error("Error al eliminar");
        alert("Hubo un error al intentar eliminar.");
      }
    }
  };

  return (
    <div className="card">
      <div className="card-text">
        <label> {fam.nombre} {fam.apellido} </label>
        <p>
          {fam.parentesco} - {fam.fecha_nacimiento}
        </p>
      </div>
      <div className="card-actions">
        {/* Botón Ver Detalles */}
        <a href={`familiares/detalles/${fam.id_familiar}`} title="Ver Detalles">
          <FontAwesomeIcon icon={faEye} size="lg" className="text-blue-500 hover:text-blue-700" />
        </a>
        
        {/* Botón Editar */}
        <a href={`familiares/nuevo/${fam.id_familiar}`} title="Editar">
          <FontAwesomeIcon icon={faEdit} size="lg" className="text-green-500 hover:text-green-700" />
        </a>
        
        {/* Botón Eliminar (Corregido) */}
        <button 
          onClick={() => eliminarFamiliar(fam.id_familiar)} 
          title="Eliminar"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <FontAwesomeIcon icon={faTrash} size="lg" className="text-red-500 hover:text-red-700" />
        </button>
      </div>
    </div>
  );
}