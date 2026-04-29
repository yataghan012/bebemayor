import React, { useState } from "react";
import { useAdmin, AdminClient } from "../../context/AdminContext";
import { Search, X, CheckCircle2, AlertCircle, Mail, Phone, ExternalLink } from "lucide-react";
import { Button } from "../../components/ui/Button";

function ClientDrawer({ client, onClose, onUpdateStatus }: any) {
  const handleToggleStatus = () => {
    const newStatus = client.estado === "Activo" ? "Suspendido" : "Activo";
    if (newStatus === "Suspendido" && !window.confirm(`¿Suspender a ${client.negocio}? No podrá iniciar sesión ni ver precios.`)) {
      return;
    }
    onUpdateStatus(client.id, newStatus);
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-black text-slate-900">{client.negocio}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full
                ${client.estado === 'Activo' ? 'bg-green-100 text-green-800' : 
                  client.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                {client.estado === 'Activo' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                {client.estado}
              </span>
              <span className="text-xs text-slate-500 font-mono">{client.id}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Información de Registro</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-slate-500 mb-1">Responsable</span>
                <span className="font-bold text-slate-900">{client.responsable}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-slate-500 mb-1">CUIT</span>
                <span className="font-mono font-bold text-slate-900">{client.cuit}</span>
              </div>
              
              <div className="col-span-2">
                <span className="block text-slate-500 mb-1">Email</span>
                <a href={`mailto:${client.email}`} className="font-bold text-brand-blue hover:underline flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {client.email}
                </a>
              </div>

              <div className="col-span-2">
                <span className="block text-slate-500 mb-1">Teléfono / WhatsApp</span>
                <a href={`https://wa.me/${client.telefono.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="font-bold text-green-600 hover:underline flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {client.telefono}
                </a>
              </div>

              <div>
                <span className="block text-slate-500 mb-1">Tipo de Negocio</span>
                <span className="font-bold text-slate-900">{client.tipo}</span>
              </div>
              <div>
                <span className="block text-slate-500 mb-1">Provincia</span>
                <span className="font-bold text-slate-900">{client.provincia}</span>
              </div>
              <div>
                <span className="block text-slate-500 mb-1">Fecha Registro</span>
                <span className="font-medium text-slate-900">{new Date(client.fechaRegistro).toLocaleDateString()}</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Acciones</h3>
            {client.estado === "Pendiente" ? (
              <div className="flex gap-2">
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => onUpdateStatus(client.id, "Activo")}>Aprobar Cuenta</Button>
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50" onClick={() => onUpdateStatus(client.id, "Suspendido")}>Rechazar</Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className={`w-full ${client.estado === 'Activo' ? 'text-red-600 border-red-200 hover:bg-red-50' : 'text-green-600 border-green-200 hover:bg-green-50'}`}
                onClick={handleToggleStatus}
              >
                {client.estado === "Activo" ? "Suspender Cuenta" : "Activar Cuenta"}
              </Button>
            )}
          </section>

          <section>
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Historial de Pedidos Recientes</h3>
             <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
               <span className="text-sm font-medium text-slate-500">Este cliente tiene 3 pedidos (simulación)</span>
             </div>
          </section>

        </div>
      </div>
    </>
  );
}

export function Clientes() {
  const { clients, updateClientStatus } = useAdmin();
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<AdminClient | null>(null);

  const filtered = clients.filter(c => 
    c.negocio.toLowerCase().includes(search.toLowerCase()) || 
    c.cuit.includes(search) ||
    c.responsable.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Clientes</h1>
        <p className="text-slate-500 font-medium">Gestión de cuentas mayoristas</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="relative max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por negocio, responsable o CUIT..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4">Negocio / Responsable</th>
                <th className="p-4 font-mono text-center">CUIT</th>
                <th className="p-4">Tipo / Ubicación</th>
                <th className="p-4 text-center">Fecha de Alta</th>
                <th className="p-4 text-center">Estado</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedClient(c)}>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{c.negocio}</div>
                    <div className="text-xs text-slate-500">{c.responsable}</div>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-600 text-center">
                    {c.cuit}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-700 text-sm">{c.tipo}</div>
                    <div className="text-xs text-slate-500">{c.provincia}</div>
                  </td>
                  <td className="p-4 text-center text-sm font-medium text-slate-600">
                    {new Date(c.fechaRegistro).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold
                      ${c.estado === 'Activo' ? 'bg-green-100 text-green-800' : 
                        c.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {c.estado}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedClient(c); }}>
                      Ver perfil
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-medium">
                    No se encontraron clientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedClient && (
        <ClientDrawer 
          client={selectedClient} 
          onClose={() => setSelectedClient(null)} 
          onUpdateStatus={(id: string, status: string) => {
            updateClientStatus(id, status as any);
            setSelectedClient(prev => prev ? { ...prev, estado: status as any } : null);
          }}
        />
      )}
    </div>
  );
}
