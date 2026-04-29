import React, { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Button } from "../../components/ui/Button";

export function Configuracion() {
  const { config, updateConfig } = useAdmin();
  const [formData, setFormData] = useState(config);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(formData);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Configuración General</h1>
        <p className="text-slate-500 font-medium">Ajustes globales de la plataforma B2B</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        <div className="p-6 md:p-8 space-y-8">
          
          <section>
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">Datos de la Empresa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Nombre comercial</label>
                <input type="text" name="nombreNegocio" value={formData.nombreNegocio} onChange={handleChange} className="form-input" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">CUIT</label>
                <input type="text" name="cuit" value={formData.cuit} onChange={handleChange} className="form-input" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email público de contacto</label>
                <input type="email" name="emailContacto" value={formData.emailContacto} onChange={handleChange} className="form-input" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">WhatsApp / Teléfono</label>
                <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="form-input" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">Dirección</label>
                <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="form-input" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6 mt-8">Reglas Comerciales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Monto Mínimo de Compra (ARS)</label>
                <input type="number" name="montoMinimo" value={formData.montoMinimo} onChange={handleChange} min="0" className="form-input font-mono font-bold" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Días de actualización de listas</label>
                <input type="text" name="diasActualizacion" value={formData.diasActualizacion} onChange={handleChange} className="form-input" placeholder="Ej: Lunes y Jueves" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">Mensaje de bienvenida en catálogo</label>
                <textarea name="mensajeBienvenida" value={formData.mensajeBienvenida} onChange={handleChange} className="form-input min-h-[100px] py-3" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6 mt-8">Permisos y Estado</h2>
            <div className="space-y-4 max-w-xl">
              
              <label className="flex items-center justify-between cursor-pointer p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <div>
                  <div className="font-bold text-slate-900">Aceptar nuevos registros</div>
                  <div className="text-sm text-slate-500 font-medium mt-1">Los usuarios pueden crear cuentas desde la web. Si está inactivo, solo el admin puede sumar cuentas.</div>
                </div>
                <div className="relative inline-flex items-center">
                  <input type="checkbox" name="aceptarRegistros" checked={formData.aceptarRegistros} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <div>
                  <div className="font-bold text-slate-900">Mostrar precios sin login</div>
                  <div className="text-sm text-slate-500 font-medium mt-1">Los visitantes pueden ver precios aunque no tengan cuenta activa aprobada.</div>
                </div>
                <div className="relative inline-flex items-center">
                  <input type="checkbox" name="mostrarPreciosSinLogin" checked={formData.mostrarPreciosSinLogin} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer p-4 border border-orange-200 bg-orange-50/50 rounded-xl hover:bg-orange-50 transition-colors">
                <div>
                  <div className="font-bold text-orange-900">Modo Mantenimiento</div>
                  <div className="text-sm text-orange-700 font-medium mt-1">Deshabilita la tienda pública con un cartel temporal. El panel admin sigue funcionando.</div>
                </div>
                <div className="relative inline-flex items-center">
                  <input type="checkbox" name="modoMantenimiento" checked={formData.modoMantenimiento} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-orange-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-orange-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </div>
              </label>

            </div>
          </section>

        </div>

        <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-200 flex justify-end">
           <Button type="submit" size="lg">Guardar Configuración</Button>
        </div>
      </form>
    </div>
  );
}
