export default function Home() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
        <p className="text-gray-500">Bienvenido a ContigoPlus. Resumen general.</p>
      </div>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tarjeta 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Familiares</h3>
            <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs font-bold">Activos</span>
          </div>
          <p className="text-4xl font-bold text-slate-800">2</p>
          <p className="text-sm text-gray-400 mt-2">Pacientes registrados</p>
        </div>

        {/* Tarjeta 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Medicamentos</h3>
            <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs font-bold">Total</span>
          </div>
          <p className="text-4xl font-bold text-slate-800">5</p>
          <p className="text-sm text-gray-400 mt-2">En tratamiento actual</p>
        </div>

        {/* Tarjeta 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-l-red-500 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Alertas</h3>
            <span className="text-red-500 font-bold">!</span>
          </div>
          <p className="text-4xl font-bold text-slate-800">1</p>
          <p className="text-sm text-gray-400 mt-2">Dosis pendientes hoy</p>
        </div>

      </div>
    </div>
  );
}