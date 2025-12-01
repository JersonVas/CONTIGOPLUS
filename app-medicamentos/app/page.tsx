"use client"; // Necesario para que funcionen los gráficos interactivos

import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- DATOS DE EJEMPLO PARA LOS GRÁFICOS ---
const dataTendenciaPacientes = [
  { nombre: 'Ene', activos: 1 },
  { nombre: 'Feb', activos: 2 },
  { nombre: 'Mar', activos: 2 },
  { nombre: 'Abr', activos: 3 },
  { nombre: 'May', activos: 2 },
  { nombre: 'Jun', activos: 4 },
];

const dataAdherenciaSemanal = [
  { dia: 'Lun', tomadas: 5, total: 5 },
  { dia: 'Mar', tomadas: 4, total: 5 },
  { dia: 'Mié', tomadas: 5, total: 5 },
  { dia: 'Jue', tomadas: 3, total: 5 },
  { dia: 'Vie', tomadas: 5, total: 5 },
  { dia: 'Sáb', tomadas: 4, total: 4 },
  { dia: 'Dom', tomadas: 4, total: 4 },
];

export default function Home() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      
      {/* 1. Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard General</h1>
        <p className="text-sm text-gray-500">Bienvenido de nuevo. Aquí tienes el resumen de tu gestión.</p>
      </div>

      {/* 2. Tarjetas Superiores (KPIs) - Estilo más limpio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-500 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-1.755-7.663 3.999 3.999 0 0 0-4-4c-.927 0-1.823.253-2.601.692C12.992 5.68 11.919 4 10.5 4c-1.933 0-3.5 1.567-3.5 3.5 0 1.157.57 2.187 1.447 2.853A4.126 4.126 0 0 0 4.5 17.25c0 1.624.962 3.034 2.375 3.751.398.203.812.378 1.237.521A9.34 9.34 0 0 0 10.5 21c1.42 0 2.786-.321 4.028-.904.412-.194.805-.419 1.173-.675.348-.244.675-.515.98-.81Z" /></svg>
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Total Pacientes</p>
            <h3 className="text-3xl font-bold text-gray-800">4</h3>
          </div>
        </div>
         {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-3 bg-purple-50 rounded-lg text-purple-500 mr-4">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" /></svg>
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Tratamientos Activos</p>
            <h3 className="text-3xl font-bold text-gray-800">7</h3>
          </div>
        </div>
         {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-3 bg-red-50 rounded-lg text-red-500 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Alertas Pendientes</p>
            <h3 className="text-3xl font-bold text-gray-800">2</h3>
          </div>
        </div>
      </div>

      {/* 3. Sección de Gráficos (El nuevo look) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Gráfico 1: Línea de Tendencia */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Tendencia de Pacientes</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataTendenciaPacientes}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="nombre" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} itemStyle={{color: '#3b82f6'}} />
                <Line type="monotone" dataKey="activos" name="Pacientes Activos" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: 'white'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Barras de Adherencia */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Adherencia Semanal (Dosis)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataAdherenciaSemanal}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend wrapperStyle={{paddingTop: '10px'}} />
                <Bar dataKey="total" name="Dosis Programadas" fill="#e5e7eb" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="tomadas" name="Dosis Tomadas" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}