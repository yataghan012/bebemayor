import { Link } from "react-router-dom";
import { Users2, MapPin, Mail, Phone } from "lucide-react";
import { getAssetPath } from "../../lib/utils";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand & Info */}
          <div className="space-y-6 xl:col-span-1">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-slate-800 p-2 rounded-lg">
                <Users2 className="h-6 w-6 text-brand-accent" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Bebé<span className="text-brand-accent">Mayor</span>
              </span>
            </Link>
            <p className="text-base leading-6">
              El distribuidor mayorista líder en productos para bebés. 
              Impulsando el crecimiento de farmacias, pañaleras y comercios en toda la Argentina.
            </p>
            <div className="flex gap-4">
              <img src={getAssetPath("/regenerated_image_1777425222751.png")} alt="Mercado Pago" className="h-8 object-contain bg-white rounded px-2" />
              <div className="h-8 px-2 bg-white rounded flex items-center justify-center text-xs font-bold text-slate-800">Transferencia</div>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Navegación</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-brand-accent transition-colors">Inicio</Link></li>
              <li><Link to="/catalogo" className="hover:text-brand-accent transition-colors">Catálogo Mayorista</Link></li>
              <li><Link to="/nosotros" className="hover:text-brand-accent transition-colors">Sobre Nosotros</Link></li>
              <li><Link to="/contacto" className="hover:text-brand-accent transition-colors">Contacto</Link></li>
              <li><Link to="/registro" className="hover:text-brand-accent transition-colors">Registrar Negocio</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-6">Contacto y Logística</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-brand-accent shrink-0" />
                <span>
                  Parque Industrial, Río Cuarto<br/>
                  Atención Exclusiva Mayoristas<br/>
                  Río Cuarto, Córdoba (Envíos a todo el país)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-brand-accent shrink-0" />
                <span>+54 9 358 412-3456 (Solo emergencias logística)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-brand-accent shrink-0" />
                <span>ventas@bebemayor.com.ar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} BebéMayor Distribuidora. Todos los derechos reservados.
          </p>
          <div className="text-sm">
            CUIT: 30-12345678-9 | Razón Social: BEBE MAYOR S.A.
          </div>
        </div>
      </div>
    </footer>
  );
}
