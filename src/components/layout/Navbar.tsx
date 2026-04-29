import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Users2 } from "lucide-react";
import { Button } from "../ui/Button";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { cn } from "../../lib/utils";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount, setIsCartOpen } = useCart();

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Catálogo", path: "/catalogo" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-brand-blue text-white shadow-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-brand-accent p-2 rounded-lg group-hover:scale-105 transition-transform">
                <Users2 className="h-6 w-6 text-brand-blue" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Bebé<span className="text-brand-accent">Mayor</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "font-bold text-sm tracking-wide transition-colors",
                  location.pathname === link.path
                    ? "text-brand-accent"
                    : "text-slate-200 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <Link to="/registro">
              <Button className="font-bold">Registrá tu negocio</Button>
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:text-brand-accent transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-brand-blue transform translate-x-1/4 -translate-y-1/4 bg-brand-accent rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:text-brand-accent transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-brand-blue transform translate-x-1/4 -translate-y-1/4 bg-brand-accent rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-brand-accent"
            >
              {isMobileMenuOpen ? (
                <X className="block h-8 w-8" />
              ) : (
                <Menu className="block h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-blue border-t border-slate-800">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-bold",
                  location.pathname === link.path
                    ? "bg-slate-800 text-brand-accent"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/registro"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-md px-3 py-3 mt-4 text-center text-base font-bold bg-brand-accent text-brand-blue"
            >
              Registrá tu negocio
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
