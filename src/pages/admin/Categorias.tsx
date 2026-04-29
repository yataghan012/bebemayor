import React, { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { Button } from "../../components/ui/Button";

function CategoryModal({ category, onClose, onSave }: any) {
  const isEditing = !!category;
  const [formData, setFormData] = useState(category || {
    nombre: "",
    estado: "Activo"
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">{isEditing ? "Editar Categoría" : "Nueva Categoría"}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Nombre de la categoría</label>
            <input 
              type="text" 
              value={formData.nombre} 
              onChange={e => setFormData(prev => ({ ...prev, nombre: e.target.value }))} 
              required 
              className="form-input" 
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer p-3 border border-slate-200 rounded-lg bg-slate-50">
              <input 
                type="checkbox" 
                checked={formData.estado === "Activo"}
                onChange={e => setFormData(prev => ({ ...prev, estado: e.target.checked ? "Activo" : "Inactivo" }))}
                className="w-5 h-5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
              />
              <div className="font-bold text-slate-700 text-sm">Categoría Activa</div>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Guardar Categoría</Button>
          </div>
        </form>
      </div>
    </div>
  );
}


export function Categorias() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<any>(null);

  const handleSave = (cat: any) => {
    if (editingCat) {
      updateCategory(editingCat.id, cat);
    } else {
      addCategory(cat);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    const inUse = products.some(p => p.categoryId === id);
    if (inUse) {
      alert(`No puedes eliminar "${name}" porque tiene productos asignados. Reasigna los productos primero.`);
      return;
    }
    if (window.confirm(`¿Seguro que deseas eliminar la categoría "${name}"?`)) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Categorías</h1>
          <p className="text-slate-500 font-medium">Clasificación de productos</p>
        </div>
        <Button onClick={() => { setEditingCat(null); setModalOpen(true); }} className="gap-2">
          <Plus className="w-4 h-4" /> Nueva Categoría
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
              <th className="p-4">Nombre</th>
              <th className="p-4 text-center">Productos</th>
              <th className="p-4 text-center">Estado</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map(cat => {
              const count = products.filter(p => p.categoryId === cat.id).length;
              return (
                <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{cat.nombre}</td>
                  <td className="p-4 text-center font-mono">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold">{count}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold
                      ${cat.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>
                      {cat.estado}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => { setEditingCat(cat); setModalOpen(true); }} className="p-2 text-brand-blue hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(cat.id, cat.nombre)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalOpen && <CategoryModal category={editingCat} onClose={() => setModalOpen(false)} onSave={handleSave} />}
    </div>
  );
}
