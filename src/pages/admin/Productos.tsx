import React, { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { formatPrice } from "../../lib/utils";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";
import { Button } from "../../components/ui/Button";

function ProductModal({ product, categories, onClose, onSave }: any) {
  const isEditing = !!product;
  const [formData, setFormData] = useState(product || {
    name: "",
    categoryId: categories[0]?.id || "",
    brand: "",
    unitPrice: 0,
    boxQuantity: 1,
    stock: 100,
    minQuantity: 1,
    imageUrl: "",
    status: "Activo"
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-slate-900">{isEditing ? "Editar Producto" : "Nuevo Producto"}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-bold text-slate-700">Nombre del producto</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Categoría</label>
              <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="form-input bg-white">
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Marca</label>
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} required className="form-input" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Precio Unitario (ARS)</label>
              <input type="number" name="unitPrice" value={formData.unitPrice} onChange={handleChange} required min="0" step="0.01" className="form-input" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Unidades por caja</label>
              <input type="number" name="boxQuantity" value={formData.boxQuantity} onChange={handleChange} required min="1" className="form-input" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Stock actual</label>
              <input type="number" name="stock" value={formData.stock || 100} onChange={handleChange} required min="0" className="form-input" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Mínimo de compra (cajas)</label>
              <input type="number" name="minQuantity" value={formData.minQuantity || 1} onChange={handleChange} required min="1" className="form-input" />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-bold text-slate-700">URL de Imagen (Fallback temporal)</label>
              <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="form-input" placeholder="https://..." />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer p-3 border border-slate-200 rounded-lg bg-slate-50">
                <input 
                  type="checkbox" 
                  checked={formData.status === "Activo"}
                  onChange={e => setFormData(prev => ({ ...prev, status: e.target.checked ? "Activo" : "Inactivo" }))}
                  className="w-5 h-5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
                />
                <div className="font-bold text-slate-700 text-sm">Producto Activo y visible en el catálogo</div>
              </label>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Guardar Producto</Button>
          </div>
        </form>
      </div>
    </div>
  );
}


export function Productos() {
  const { products, categories, addProduct, updateProduct, deleteProduct, showToast } = useAdmin();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProd, setEditingProd] = useState<any>(null);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter ? p.categoryId === catFilter : true;
    return matchSearch && matchCat;
  });

  const handleSave = (prod: any) => {
    if (editingProd) {
      updateProduct(editingProd.id, prod);
    } else {
      addProduct(prod);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`¿Seguro que deseas eliminar "${name}"? Esta acción no se puede deshacer.`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Productos</h1>
          <p className="text-slate-500 font-medium">Gestionar catálogo y stock (Total: {products.length})</p>
        </div>
        <Button onClick={() => { setEditingProd(null); setModalOpen(true); }} className="gap-2">
          <Plus className="w-4 h-4" /> Agregar Producto
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o marca..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
          />
        </div>
        <select 
          value={catFilter} 
          onChange={e => setCatFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-4 py-2 bg-white min-w-[200px]"
        >
          <option value="">Todas las categorías</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4">Imagen</th>
                <th className="p-4">Nombre / Detalles</th>
                <th className="p-4 font-mono text-right">Precio/u</th>
                <th className="p-4 font-mono text-center">Stock</th>
                <th className="p-4 text-center">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(p => {
                const catName = categories.find(c => c.id === p.categoryId)?.nombre || "Sin categoría";
                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4 w-20">
                      <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded object-cover border border-slate-200" />
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900 line-clamp-1">{p.name}</div>
                      <div className="text-xs text-slate-500 font-medium">{p.brand} • {catName} • Caja x{p.boxQuantity}</div>
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-900 text-right whitespace-nowrap">
                      {formatPrice(p.unitPrice)}
                    </td>
                    <td className="p-4 font-mono text-center text-slate-700">
                      {p.stock} <span className="text-xs text-slate-400 block">cajas</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-bold
                        ${p.status !== 'Inactivo' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>
                        {p.status || "Activo"}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => { setEditingProd(p); setModalOpen(true); }} className="p-2 text-brand-blue hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id, p.name)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-medium">
                    No se encontraron productos. 
                    {search || catFilter ? " Intentá cambiar los filtros." : " Empezá agregando un producto nuevo."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && <ProductModal product={editingProd} categories={categories} onClose={() => setModalOpen(false)} onSave={handleSave} />}
    </div>
  );
}
