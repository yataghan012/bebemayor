/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { Registro } from "./pages/Registro";
import { Nosotros } from "./pages/Nosotros";
import { Contacto } from "./pages/Contacto";

export default function App() {
  return (
    <CartProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="catalogo" element={<Catalogo />} />
            <Route path="registro" element={<Registro />} />
            <Route path="nosotros" element={<Nosotros />} />
            <Route path="contacto" element={<Contacto />} />
          </Route>
        </Routes>
      </HashRouter>
    </CartProvider>
  );
}

