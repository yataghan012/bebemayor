import React from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { formatPrice } from "../../lib/utils";

export function Dashboard() {
  const { orders, clients, products } = useAdmin();

  const metrics = [
    { label: "Pedidos hoy", value: "8", color: "text-blue-600" },
    { label: "Ingresos del mes", value: "$2.847.500", color: "text-green-600" },
    { label: "Clientes registrados", value: clients.length.toString(), color: "text-purple-600" },
    { label: "Productos activos", value: products.length.toString(), color: "text-orange-600" },
  ];

  // Fictional chart data for the last 7 days
  const chartData = [
    { day: "Lun", val: 40 },
    { day: "Mar", val: 65 },
    { day: "Mie", val: 45 },
    { day: "Jue", val: 80 },
    { day: "Vie", val: 55 },
    { day: "Sab", val: 30 },
    { day: "Dom", val: 20 },
  ];
  const maxVal = Math.max(...chartData.map(d => d.val));

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Dashboard</h1>
          <p className="text-slate-500 font-medium">Resumen general de tu negocio mayorista</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/pedidos" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-bold text-sm transition-colors shadow-sm">
            Ver pendientes
          </Link>
          <Link to="/admin/productos" className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 font-bold text-sm transition-colors shadow-sm">
            + Nuevo producto
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <span className="text-slate-500 font-bold text-sm mb-2">{m.label}</span>
            <span className={`text-3xl font-black ${m.color}`}>{m.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">Pedidos últimos 7 días</h2>
          <div className="h-64 flex items-end justify-between gap-2 px-2 sm:px-6">
            {chartData.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-3 flex-1 group">
                <div 
                  className="w-full max-w-[48px] bg-brand-blue/10 group-hover:bg-brand-blue/20 rounded-t-lg relative transition-all duration-500 ease-out"
                  style={{ height: `${(d.val / maxVal) * 100}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded pointer-events-none transition-opacity">
                    {d.val}
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 group-hover:text-brand-blue">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Últimos pedidos</h2>
            <Link to="/admin/pedidos" className="text-sm font-bold text-brand-blue hover:underline">Ver todos</Link>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {orders.slice(0, 5).map(o => (
              <div key={o.id} className="p-4 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate">{o.negocio}</p>
                  <p className="text-xs text-slate-500">{o.id} • {formatPrice(o.montoTotal)}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-md shrink-0
                  ${o.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 
                    o.estado === 'Confirmado' ? 'bg-blue-100 text-blue-800' : 
                    o.estado === 'Enviado' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'}`}>
                  {o.estado}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
