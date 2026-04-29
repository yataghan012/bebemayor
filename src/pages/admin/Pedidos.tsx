import React, { useState } from "react";
import { useAdmin, AdminOrder } from "../../context/AdminContext";
import { formatPrice } from "../../lib/utils";
import { X, Phone } from "lucide-react";
import { Button } from "../../components/ui/Button";

function OrderDrawer({ order, onClose, onUpdateStatus }: any) {
  const [status, setStatus] = useState<AdminOrder["estado"]>(order.estado);

  const handleSaveStatus = () => {
    onUpdateStatus(order.id, status);
  };

  const getStatusColor = (s: string) => {
    switch(s) {
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmado': return 'bg-blue-100 text-blue-800';
      case 'Enviado': return 'bg-green-100 text-green-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-black text-slate-900">Pedido {order.id}</h2>
            <p className="text-sm text-slate-500 font-medium">{new Date(order.fecha).toLocaleString()}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Estado del Pedido</h3>
            <div className="flex gap-2">
              <select 
                value={status} 
                onChange={e => setStatus(e.target.value as AdminOrder["estado"])}
                className={`font-bold rounded-lg border-0 focus:ring-2 focus:ring-brand-blue py-2 px-4 ${getStatusColor(status)}`}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Enviado">Enviado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
              {status !== order.estado && (
                <Button onClick={handleSaveStatus} size="sm">Actualizar</Button>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Datos del Cliente</h3>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Negocio:</span>
                <span className="font-bold text-slate-900">{order.negocio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Responsable:</span>
                <span className="font-medium text-slate-900">{order.cliente}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CUIT:</span>
                <span className="font-mono text-slate-900">{order.cuit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Provincia:</span>
                <span className="font-medium text-slate-900">{order.provincia}</span>
              </div>
            </div>
            <button className="w-full mt-4 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-lg transition-colors">
              <Phone className="w-4 h-4" /> WhatsApp del cliente
            </button>
          </section>

          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Detalle de Productos</h3>
            <div className="space-y-4">
              {/* Fake items for demo */}
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-bold text-slate-900">Pañales Pampers Confort Sec G</p>
                  <p className="text-xs text-slate-500">10 cajas x 4 unid</p>
                </div>
                <div className="font-mono font-bold text-slate-900">
                  {formatPrice(order.montoTotal * 0.6)}
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-bold text-slate-900">Óleo Calcáreo Estrella</p>
                  <p className="text-xs text-slate-500">5 cajas x 6 unid</p>
                </div>
                <div className="font-mono font-bold text-slate-900">
                  {formatPrice(order.montoTotal * 0.4)}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-slate-500 font-medium">Subtotal</span>
                <span className="font-mono font-bold text-slate-600">{formatPrice(order.montoTotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-slate-500 font-medium">Método de pago</span>
                <span className="font-bold text-slate-900">{order.metodoPago}</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-slate-900 font-black text-lg">Total</span>
                <span className="font-mono font-black text-brand-blue text-xl">{formatPrice(order.montoTotal)}</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

export function Pedidos() {
  const { orders, updateOrderStatus } = useAdmin();
  const [tab, setTab] = useState("Todos");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const tabs = ["Todos", "Pendientes", "Confirmados", "Enviados", "Cancelados"];
  
  const filtered = orders.filter(o => {
    if (tab === "Todos") return true;
    return o.estado === tab.slice(0, -1) || o.estado === tab; // hacky plural match
  }).sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  const getStatusColor = (s: string) => {
    switch(s) {
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmado': return 'bg-blue-100 text-blue-800';
      case 'Enviado': return 'bg-green-100 text-green-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Pedidos</h1>
        <p className="text-slate-500 font-medium">Gestión de órdenes de compra</p>
      </div>

      <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors
              ${tab === t ? 'bg-brand-blue text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4">Pedido / Fecha</th>
                <th className="p-4">Cliente</th>
                <th className="p-4 font-mono text-right">Monto Total</th>
                <th className="p-4 text-center">Método de Pago</th>
                <th className="p-4 text-center">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedOrder(o)}>
                  <td className="p-4">
                    <div className="font-bold text-brand-blue">{o.id}</div>
                    <div className="text-xs text-slate-500 font-medium">{new Date(o.fecha).toLocaleDateString()} {new Date(o.fecha).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{o.negocio}</div>
                    <div className="text-xs text-slate-500">{o.cliente}</div>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900 text-right">
                    {formatPrice(o.montoTotal)}
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-sm text-slate-600 font-medium">{o.metodoPago}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${getStatusColor(o.estado)}`}>
                      {o.estado}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedOrder(o); }}>
                      Ver detalle
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-medium">
                    No hay pedidos para mostrar en esta vista.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <OrderDrawer 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
          onUpdateStatus={updateOrderStatus}
        />
      )}
    </div>
  );
}
