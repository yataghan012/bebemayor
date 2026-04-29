import React, { useState } from "react";
import { formatPrice } from "../../lib/utils";
import { Button } from "../../components/ui/Button";

// Hardcoded for demo
const initialTiers = [
  { id: 1, name: "Precio base", minQty: 1, price: 5200 },
  { id: 2, name: "Precio x5", minQty: 5, price: 4700 },
  { id: 3, name: "Precio x10+", minQty: 10, price: 4100 },
];

export function PreciosVolumen() {
  const [tiers, setTiers] = useState(initialTiers);
  const [selectedCategory, setSelectedCategory] = useState("Pañales");
  const basePrice = tiers[0].price;

  const handleUpdate = (id: number, field: string, value: string) => {
    const numValue = field === "name" ? value : Number(value);
    setTiers(prev => prev.map(t => t.id === id ? { ...t, [field]: numValue } : t));
  };

  const handleSave = () => {
    alert("Precios por volumen actualizados correctamente para " + selectedCategory);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Precios por Volumen</h1>
        <p className="text-slate-500 font-medium">Configura escalas de descuento mayorista por categoría</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <label className="text-sm font-bold text-slate-700 block mb-2">Seleccionar Categoría a editar</label>
        <select 
          value={selectedCategory} 
          onChange={e => setSelectedCategory(e.target.value)}
          className="border border-slate-200 rounded-lg px-4 py-2 bg-white max-w-sm w-full"
        >
          <option>Pañales</option>
          <option>Leche y Fórmula</option>
          <option>Higiene</option>
          <option>Ropa de Bebé</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Editor */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h2 className="font-bold text-slate-900">Editor de Escalas</h2>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase">
                <th className="p-4">Nivel</th>
                <th className="p-4 text-center">Cant. Mínima</th>
                <th className="p-4 text-right">Precio Unid.</th>
                <th className="p-4 text-right">% Ref.</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((t, i) => {
                const discount = i === 0 ? 0 : Math.round(((basePrice - t.price) / basePrice) * 100);
                return (
                  <tr key={t.id} className="border-b border-slate-50 group">
                    <td className="p-4">
                      <input 
                        type="text" 
                        value={t.name}
                        onChange={e => handleUpdate(t.id, 'name', e.target.value)}
                        className="bg-transparent border-b border-dashed border-slate-300 focus:border-brand-blue focus:outline-none py-1 font-bold text-slate-900 transition-colors w-24 sm:w-full"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input 
                        type="number" 
                        value={t.minQty}
                        onChange={e => handleUpdate(t.id, 'minQty', e.target.value)}
                        className="bg-transparent border-b border-dashed border-slate-300 focus:border-brand-blue focus:outline-none py-1 font-mono font-bold text-slate-700 text-center w-16 transition-colors"
                      />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end font-mono font-bold">
                        <span className="text-slate-400 mr-1">$</span>
                        <input 
                          type="number" 
                          value={t.price}
                          onChange={e => handleUpdate(t.id, 'price', e.target.value)}
                          className="bg-transparent border-b border-dashed border-slate-300 focus:border-brand-blue focus:outline-none py-1 text-right w-24 text-brand-blue transition-colors"
                        />
                      </div>
                    </td>
                    <td className="p-4 text-right font-bold text-slate-500">
                      {discount > 0 ? <span className="text-green-600">-{discount}%</span> : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="p-4 bg-slate-50 flex justify-end">
             <Button onClick={handleSave}>Guardar cambios</Button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 flex flex-col justify-center">
          <h2 className="text-slate-400 font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
            Vista en la tienda pública
          </h2>
          
          <div className="bg-white rounded-2xl p-6 shadow-2xl skew-y-1 transform origin-left border border-slate-200 max-w-sm mx-auto w-full">
            <h3 className="font-bold text-slate-900 mb-2">Producto de Ejemplo</h3>
            <p className="text-sm text-slate-500 mb-4">{selectedCategory} • Caja x4</p>
            
            <div className="space-y-2 mb-6">
               {tiers.map((t, i) => {
                 const isBest = i === tiers.length - 1;
                 return (
                  <div key={t.id} className={`flex justify-between items-center p-3 rounded-xl border ${isBest ? 'border-brand-accent bg-blue-50/50' : 'border-slate-100 hover:border-slate-300'}`}>
                    <div>
                      <span className="font-bold text-slate-900 block">{t.minQty} o más cajas</span>
                      <span className="text-xs text-slate-500 font-medium">{t.name}</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-mono font-black block ${isBest ? 'text-brand-blue text-lg' : 'text-slate-700'}`}>
                        {formatPrice(t.price)}
                      </span>
                      <span className="text-xs text-slate-400">/unidad</span>
                    </div>
                  </div>
                 );
               })}
            </div>
            
            <button className="w-full py-3 bg-brand-blue text-white font-bold rounded-xl pointer-events-none opacity-80">
              Agregar al carrito
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
