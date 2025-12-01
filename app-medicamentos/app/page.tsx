"use client";

import React, { useState } from 'react';

export default function Familiares() {
  // Datos de prueba (Simulando base de datos)
  const [familiares] = useState([
    { id: 1, nombre: 'Ana Pérez', dni: '87654321', parentesco: 'Madre', inicial: 'A', color: 'bg-blue-100 text-blue-600' },
    { id: 2, nombre: 'Martin Viz', dni: '12345678', parentesco: 'Abuelo', inicial: 'M', color: 'bg-purple-100 text-purple-600' },
    { id: 3, nombre: 'Jose Antonio', dni: '11223344', parentesco: 'Hermano', inicial: 'J', color: 'bg-green-100 text-green-600' },
  ]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      
      {/* Título Principal */}
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Gestión de Familiares</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- COLUMNA IZQUIERDA: FORMULARIO (Fijo) --- */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Agregar Nuevo Familiar</h2>
            
            <form className="space-y-4">
              {/* Input: Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Input: DNI */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">DNI</label>
                <input 
                  type="text" 
                  placeholder="Ej: 12345678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Input: Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input 
                  type="email" 
                  placeholder="Ej: juan.perez@correo.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

               {/* Input: Parentesco */}
               <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Parentesco</label>
                <input 
                  type="text" 
                  placeholder="Ej: Padre, Hermano"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Botón Azul Grande */}
              <button 
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-2 shadow-sm hover:shadow-md"
              >
                Guardar Familiar
              </button>
            </form>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: LISTA DE FAMILIARES --- */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-h-[500px]">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Mis Familiares</h2>
            
            <div className="space-y-4">
              {familiares.map((familiar) => (
                <div key={familiar.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group">
                  
                  <div className="flex items-center gap-4">
                    {/* Avatar Redondo con Inicial */}
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold ${familiar.color}`}>
                      {familiar.inicial}
                    </div>
                    
                    {/* Información de Texto */}
                    <div>
                      <h3 className="font-bold text-gray-800">{familiar.nombre}</h3>
                      <p className="text-sm text-gray-500">
                        DNI: {familiar.dni} <span className="text-gray-300 mx-2">|</span> Parentesco: {familiar.parentesco}
                      </p>
                    </div>
                  </div>

                  {/* Icono de 3 puntos (Menú) */}
                  <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                  </button>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}