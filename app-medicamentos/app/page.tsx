export default function Home() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      
      {/* 1. Encabezado más limpio */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Panel de Control</h1>
          <p className="text-sm text-gray-500">Resumen de actividad</p>
        </div>
        <div className="text-sm text-gray-400 bg-white px-3 py-1 rounded-md shadow-sm">
          📅 Hoy
        </div>
      </div>

      {/* 2. Tarjetas Compactas con Iconos (Mucho más ordenadas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Tarjeta Familiares */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
            👥
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pacientes</p>
            <p className="text-2xl font-bold text-slate-800">2</p>
          </div>
        </div>

        {/* Tarjeta Medicamentos */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
            💊
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Tratamientos</p>
            <p className="text-2xl font-bold text-slate-800">5</p>
          </div>
        </div>

        {/* Tarjeta Alertas */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4 border-l-4 border-l-red-500">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">
            🔔
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Alertas</p>
            <p className="text-2xl font-bold text-slate-800">1</p>
          </div>
        </div>
      </div>

      {/* 3. Tabla de Actividad (Para llenar el espacio vacío) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-slate-800">Actividad Reciente</h2>
        </div>
        <div className="p-4">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 border-b border-gray-100">
              <tr>
                <th className="pb-3 font-medium">Tipo</th>
                <th className="pb-3 font-medium">Descripción</th>
                <th className="pb-3 font-medium">Hora</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3 text-blue-600 font-medium">Medicina</td>
                <td className="py-3">Dosis de Ibuprofeno - Martin Viz</td>
                <td className="py-3 text-gray-400">10:00 AM</td>
              </tr>
              <tr className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3 text-red-500 font-medium">Alerta</td>
                <td className="py-3">Dolor de cabeza severo reportado</td>
                <td className="py-3 text-gray-400">08:30 AM</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 text-green-600 font-medium">Sistema</td>
                <td className="py-3">Inicio de sesión correcto</td>
                <td className="py-3 text-gray-400">08:00 AM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}