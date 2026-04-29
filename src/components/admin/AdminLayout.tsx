import React, { useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Package, FolderTree, ShoppingCart, 
  Users, Layers, Settings, LogOut, Menu, X, Bell 
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

const ADMIN_LINKS = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/productos", icon: Package, label: "Productos" },
  { to: "/admin/categorias", icon: FolderTree, label: "Categorías" },
  { to: "/admin/pedidos", icon: ShoppingCart, label: "Pedidos" },
  { to: "/admin/clientes", icon: Users, label: "Clientes" },
  { to: "/admin/precios-volumen", icon: Layers, label: "Precios por Volumen" },
  { to: "/admin/configuracion", icon: Settings, label: "Configuración" },
];

export function AdminLayout() {
  const { isAuthenticated, logout, toast, config } = useAdmin();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navigateToPublic = () => {
    window.location.hash = "/";
  };

  return (
    <div className="min-h-screen bg-slate-100 flex overflow-hidden">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-lg shadow-xl font-medium text-white animate-in slide-in-from-bottom-5 fade-in duration-300
          ${toast.type === 'success' ? 'bg-green-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
          {toast.message}
        </div>
      )}

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 z-50 transition-transform duration-300 lg:translate-x-0 lg:static lg:block
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="text-xl font-black text-white cursor-pointer" onClick={navigateToPublic}>
              Bebé<span className="text-brand-accent">Mayor</span>
              <span className="text-xs ml-2 uppercase text-slate-500 font-bold bg-slate-800 px-2 py-1 rounded">Admin</span>
            </div>
            <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setMobileOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 py-6 space-y-1 overflow-y-auto px-3">
            {ADMIN_LINKS.map(link => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors
                    ${isActive ? 'bg-brand-accent/20 text-brand-accent' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-brand-accent' : 'text-slate-400'}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button 
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium w-full text-left text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
          <button className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 focus:outline-none" onClick={() => setMobileOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1 lg:flex-none"></div>

          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-brand-blue relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-brand-accent rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-sm">
                A
              </div>
              <span className="text-sm font-medium text-slate-700 hidden sm:block">admin@bebemayor.com</span>
            </div>
          </div>
        </header>

        {config.modoMantenimiento && (
          <div className="bg-orange-100 text-orange-800 px-6 py-3 text-sm font-bold text-center border-b border-orange-200 shrink-0">
            ⚠ MODO MANTENIMIENTO ACTIVO - El sitio público está cerrado temporalmente.
          </div>
        )}

        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
