/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AdminProvider } from "./context/AdminContext";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { Registro } from "./pages/Registro";
import { Nosotros } from "./pages/Nosotros";
import { Contacto } from "./pages/Contacto";
import { Checkout } from "./pages/Checkout";

import { AdminLayout } from "./components/admin/AdminLayout";
import { Login as AdminLogin } from "./pages/admin/Login";
import { Dashboard as AdminDashboard } from "./pages/admin/Dashboard";
import { Productos as AdminProductos } from "./pages/admin/Productos";
import { Categorias as AdminCategorias } from "./pages/admin/Categorias";
import { Pedidos as AdminPedidos } from "./pages/admin/Pedidos";
import { Clientes as AdminClientes } from "./pages/admin/Clientes";
import { PreciosVolumen as AdminPreciosVolumen } from "./pages/admin/PreciosVolumen";
import { Configuracion as AdminConfiguracion } from "./pages/admin/Configuracion";

export default function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <HashRouter>
          <Routes>
            {/* Public Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="catalogo" element={<Catalogo />} />
              <Route path="registro" element={<Registro />} />
              <Route path="nosotros" element={<Nosotros />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>

            {/* Admin Layout - Login doesn't use the sidebar layout */}
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="productos" element={<AdminProductos />} />
              <Route path="categorias" element={<AdminCategorias />} />
              <Route path="pedidos" element={<AdminPedidos />} />
              <Route path="clientes" element={<AdminClientes />} />
              <Route path="precios-volumen" element={<AdminPreciosVolumen />} />
              <Route path="configuracion" element={<AdminConfiguracion />} />
            </Route>

          </Routes>
        </HashRouter>
      </CartProvider>
    </AdminProvider>
  );
}

