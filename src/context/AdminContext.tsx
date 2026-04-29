import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS } from "../data/products";

// Types
export interface AdminConfig {
  nombreNegocio: string;
  cuit: string;
  emailContacto: string;
  telefono: string;
  direccion: string;
  montoMinimo: number;
  diasActualizacion: string;
  mensajeBienvenida: string;
  aceptarRegistros: boolean;
  mostrarPreciosSinLogin: boolean;
  modoMantenimiento: boolean;
}

export interface AdminClient {
  id: string;
  negocio: string;
  responsable: string;
  cuit: string;
  tipo: string;
  provincia: string;
  fechaRegistro: string;
  estado: "Activo" | "Suspendido" | "Pendiente";
}

export interface AdminOrder {
  id: string;
  cliente: string;
  negocio: string;
  cuit: string;
  provincia: string;
  montoTotal: number;
  metodoPago: string;
  estado: "Pendiente" | "Confirmado" | "Enviado" | "Cancelado";
  fecha: string;
  items: any[];
}

export interface AdminCategory {
  id: string;
  nombre: string;
  estado: "Activo" | "Inactivo";
}

interface AdminContextData {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  
  config: AdminConfig;
  updateConfig: (c: AdminConfig) => void;

  products: any[];
  addProduct: (p: any) => void;
  updateProduct: (id: string, p: any) => void;
  deleteProduct: (id: string) => void;

  categories: AdminCategory[];
  addCategory: (c: AdminCategory) => void;
  updateCategory: (id: string, c: AdminCategory) => void;
  deleteCategory: (id: string) => void;

  orders: AdminOrder[];
  updateOrderStatus: (id: string, status: AdminOrder["estado"]) => void;

  clients: AdminClient[];
  updateClientStatus: (id: string, status: AdminClient["estado"]) => void;

  // Simple toast
  toast: { message: string, type: "success" | "error" | "info" } | null;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const defaultConfig: AdminConfig = {
  nombreNegocio: "BebéMayor SRL",
  cuit: "30-12345678-9",
  emailContacto: "ventas@bebemayor.com",
  telefono: "11 1234-5678",
  direccion: "Av. Corrientes 1234, CABA",
  montoMinimo: 50000,
  diasActualizacion: "Lunes y Jueves",
  mensajeBienvenida: "¡Bienvenido a la red de BebéMayor!",
  aceptarRegistros: true,
  mostrarPreciosSinLogin: true,
  modoMantenimiento: false,
};

const defaultCategories: AdminCategory[] = [
  { id: "1", nombre: "Pañales", estado: "Activo" },
  { id: "2", nombre: "Leche y Fórmula", estado: "Activo" },
  { id: "3", nombre: "Ropa de Bebé", estado: "Activo" },
  { id: "4", nombre: "Higiene", estado: "Activo" },
  { id: "5", nombre: "Accesorios", estado: "Activo" },
];

const defaultClients: AdminClient[] = [
  { id: "C001", negocio: "Farmacia del Sol", responsable: "Carlos Pérez", cuit: "20123456789", tipo: "Farmacia", provincia: "Buenos Aires", fechaRegistro: "2023-11-10", estado: "Activo" },
  { id: "C002", negocio: "Pañalera BabyBoom", responsable: "Ana Gómez", cuit: "27876543219", tipo: "Pañalera", provincia: "Córdoba", fechaRegistro: "2023-12-05", estado: "Activo" },
  { id: "C003", negocio: "Kiosco Carlitos", responsable: "Juan Rodríguez", cuit: "20345678901", tipo: "Kiosco", provincia: "Santa Fe", fechaRegistro: "2024-01-15", estado: "Pendiente" },
  { id: "C004", negocio: "Farmacias Norte", responsable: "Luis Sánchez", cuit: "30112233445", tipo: "Farmacia", provincia: "Salta", fechaRegistro: "2024-02-20", estado: "Suspendido" },
  { id: "C005", negocio: "Almacén Los Abuelos", responsable: "Rosa Martínez", cuit: "27554433221", tipo: "Almacén", provincia: "Mendoza", fechaRegistro: "2024-03-01", estado: "Activo" },
  // ... more could be added
];

const defaultOrders: AdminOrder[] = [
  { id: "BM-2024-1001", cliente: "Ana Gómez", negocio: "Pañalera BabyBoom", cuit: "27876543219", provincia: "Córdoba", montoTotal: 154000, metodoPago: "Transferencia", estado: "Pendiente", fecha: "2024-04-28T10:30:00Z", items: [] },
  { id: "BM-2024-1002", cliente: "Carlos Pérez", negocio: "Farmacia del Sol", cuit: "20123456789", provincia: "Buenos Aires", montoTotal: 345000, metodoPago: "Mercado Pago", estado: "Confirmado", fecha: "2024-04-28T09:15:00Z", items: [] },
  { id: "BM-2024-1003", cliente: "Rosa Martínez", negocio: "Almacén Los Abuelos", cuit: "27554433221", provincia: "Mendoza", montoTotal: 85000, metodoPago: "Transferencia", estado: "Enviado", fecha: "2024-04-27T16:45:00Z", items: [] },
  { id: "BM-2024-1004", cliente: "Luis Sánchez", negocio: "Farmacias Norte", cuit: "30112233445", provincia: "Salta", montoTotal: 560000, metodoPago: "Mercado Pago QR", estado: "Cancelado", fecha: "2024-04-26T14:20:00Z", items: [] },
  { id: "BM-2024-1005", cliente: "Elena Costa", negocio: "MiniMarket Eco", cuit: "27998877665", provincia: "CABA", montoTotal: 120500, metodoPago: "Transferencia", estado: "Pendiente", fecha: "2024-04-28T11:05:00Z", items: [] },
];

for(let i = 0; i < 10; i++){
  defaultClients.push({
    id: `C00${6+i}`, negocio: `Cliente ${i+6}`, responsable: `Responsable ${i+6}`, cuit: `2000000000${i}`, tipo: ["Farmacia", "Pañalera", "Kiosco"][i%3], provincia: ["CABA", "Buenos Aires", "Córdoba", "Santa Fe"][i%4], fechaRegistro: "2024-04-01", estado: "Activo"
  });
  defaultOrders.push({
    id: `BM-2024-100${6+i}`, cliente: `Cliente ${6+i}`, negocio: `Negocio ${6+i}`, cuit: `20...`, provincia: "CABA", montoTotal: 10000 * (i+1), metodoPago: "Transferencia", estado: ["Pendiente", "Confirmado", "Enviado"][i%3] as any, fecha: "2024-04-28T12:00:00Z", items: []
  });
}

function loadState<T>(key: string, defaultVal: T): T {
  const saved = localStorage.getItem(`bm_admin_${key}`);
  if (saved) return JSON.parse(saved);
  return defaultVal;
}

function saveState(key: string, val: any) {
  localStorage.setItem(`bm_admin_${key}`, JSON.stringify(val));
}

const mappedProducts = PRODUCTS.map(p => ({
  ...p,
  categoryId: defaultCategories.find(c => c.nombre === p.category)?.id || "1",
  stock: 100,
  status: "Activo"
}));

const AdminContext = createContext<AdminContextData | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("bm_admin_token"));
  const [config, setConfigState] = useState<AdminConfig>(() => loadState("config", defaultConfig));
  const [products, setProductsState] = useState<any[]>(() => loadState("products", mappedProducts));
  const [categories, setCategoriesState] = useState<AdminCategory[]>(() => loadState("categories", defaultCategories));
  const [orders, setOrdersState] = useState<AdminOrder[]>(() => loadState("orders", defaultOrders));
  const [clients, setClientsState] = useState<AdminClient[]>(() => loadState("clients", defaultClients));
  
  const [toast, setToast] = useState<{message: string, type: "success"|"error"|"info"}|null>(null);

  const login = (token: string) => {
    localStorage.setItem("bm_admin_token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("bm_admin_token");
    setIsAuthenticated(false);
  };

  const showToast = (message: string, type: "success"|"error"|"info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateConfig = (c: AdminConfig) => {
    setConfigState(c);
    saveState("config", c);
    showToast("Configuración guardada");
  };

  const addProduct = (p: any) => {
    const next = [...products, { ...p, id: `PROD-${Date.now()}` }];
    setProductsState(next);
    saveState("products", next);
    showToast("Producto agregado");
  };

  const updateProduct = (id: string, p: any) => {
    const next = products.map(prod => prod.id === id ? { ...prod, ...p } : prod);
    setProductsState(next);
    saveState("products", next);
    showToast("Producto guardado");
  };

  const deleteProduct = (id: string) => {
    const next = products.filter(p => p.id !== id);
    setProductsState(next);
    saveState("products", next);
    showToast("Producto eliminado");
  };

  const addCategory = (c: AdminCategory) => {
    const next = [...categories, { ...c, id: `CAT-${Date.now()}` }];
    setCategoriesState(next);
    saveState("categories", next);
    showToast("Categoría agregada");
  };

  const updateCategory = (id: string, c: AdminCategory) => {
    const next = categories.map(cat => cat.id === id ? { ...cat, ...c } : cat);
    setCategoriesState(next);
    saveState("categories", next);
    showToast("Categoría guardada");
  };

  const deleteCategory = (id: string) => {
    const next = categories.filter(cat => cat.id !== id);
    setCategoriesState(next);
    saveState("categories", next);
    showToast("Categoría eliminada");
  };

  const updateOrderStatus = (id: string, status: AdminOrder["estado"]) => {
    const next = orders.map(o => o.id === id ? { ...o, estado: status } : o);
    setOrdersState(next);
    saveState("orders", next);
    showToast(`Pedido actualizado a ${status}`);
  };

  const updateClientStatus = (id: string, status: AdminClient["estado"]) => {
    const next = clients.map(c => c.id === id ? { ...c, estado: status } : c);
    setClientsState(next);
    saveState("clients", next);
    showToast(`Cliente actualizado a ${status}`);
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated, login, logout,
      config, updateConfig,
      products, addProduct, updateProduct, deleteProduct,
      categories, addCategory, updateCategory, deleteCategory,
      orders, updateOrderStatus,
      clients, updateClientStatus,
      toast, showToast
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
