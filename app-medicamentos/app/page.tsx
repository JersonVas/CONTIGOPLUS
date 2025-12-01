export default function Home() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Contenedor principal para centrar y limitar el ancho */}
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* 1. Encabezado con línea separadora */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
          <p className="text-gray-500 mt-1">Resumen general de ContigoPlus</p>
        </div>

        {/* 2. Tarjetas de Resumen (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-600">Familiares</h3>
              <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-xs font-bold">Activos</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-slate-800">2</span>
              <span className="text-sm text-gray-400 mb-1">pacientes</span>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-600">Medicamentos</h3>
              <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-bold">En curso</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-slate-800">5</span>
              <span className="text-sm text-gray-400 mb-1">tratamientos</span>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-l-red-500 border border-gray-200 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-600">Alertas</h3>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">!</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-slate-800">1</span>
              <span className="text-sm text-red-500 font-medium mb-1">dosis pendiente</span>
            </div>
          </div>
        </div>

        {/* 3. Nueva Sección: Tabla de Actividad Reciente */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-slate-800">Actividad Reciente</h3>
          </div>
          <div className="divide-y divide-gray-100">
            
            {/* Fila 1 */}
            <div className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">💊</div>
                <div>
                  <p className="font-medium text-slate-700">Dosis registrada: Ibuprofeno</p>
                  <p className="text-sm text-gray-400">Paciente: Martin Viz</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">Hace 10 min</span>
            </div>

            {/* Fila 2 */}
            <div className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">⚠️</div>
                <div>
                  <p className="font-medium text-slate-700">Alerta: Dolor de cabeza severo</p>
                  <p className="text-sm text-gray-400">Paciente: Martin Viz</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">Hace 2 horas</span>
            </div>

             {/* Fila 3 */}
             <div className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">👤</div>
                <div>
                  <p className="font-medium text-slate-700">Nuevo familiar registrado</p>
                  <p className="text-sm text-gray-400">Registro completo</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">Ayer</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );