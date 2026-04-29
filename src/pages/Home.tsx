import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ArrowRight, Box, TrendingDown, Truck, ShieldCheck, CheckCircle2, ChevronRight, Users2 } from "lucide-react";
import { CATEGORIES } from "../data/products";
import { getAssetPath } from "../lib/utils";

export function Home() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-brand-blue py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-brand-blue to-brand-blue"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/20 text-brand-accent font-bold text-sm mb-6 border border-brand-accent/30">
                <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse"></span>
                Exclusivo Mayoristas y Comercios
              </span>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
                Multiplicá tus <span className="text-brand-accent">ganancias</span> en cada venta
              </h1>
              <p className="text-lg leading-8 text-slate-300 mb-8 font-medium">
                Pañales descartables primera marca desde <strong className="text-white">$5.200</strong> la unidad. Abastecemos farmacias, pañaleras y kioscos en toda la Argentina con los mejores márgenes del mercado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/registro">
                  <Button size="lg" className="w-full sm:w-auto text-lg gap-2 px-8">
                    Registrá tu negocio <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/catalogo">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg text-white border-slate-600 hover:bg-slate-800">
                    Ver Catálogo
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                Mínimo de compra: $150.000 ARS.
              </p>
            </div>
            
            {/* Hero Image / Badge */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-2xl bg-white p-2 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="absolute -top-6 -right-6 h-24 w-24 bg-brand-red rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg rotate-12 z-10 border-4 border-white">
                  -30%
                </div>
                <img 
                  src={getAssetPath("/pañales.webp")} 
                  alt="Pallets de pañales directo de fábrica" 
                  className="rounded-xl object-cover h-[400px] w-full"
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-brand-blue/90 backdrop-blur-sm rounded-lg p-4 text-white">
                  <p className="font-bold text-lg">Huggitos Mega Pack</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-brand-accent">$5.200</span>
                    <span className="text-sm pb-1 text-slate-300">/unidad llevando 5 cajas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-slate-900 border-b-4 border-brand-accent">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12 divide-x divide-slate-800">
            <div className="flex flex-col items-center justify-center text-center px-4">
              <ShieldCheck className="h-8 w-8 text-brand-accent mb-3" />
              <p className="text-2xl font-black text-white">+15 Años</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">En el mercado</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <Users2 className="h-8 w-8 text-brand-accent mb-3" />
              <p className="text-2xl font-black text-white">+4.500</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Comercios activos</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <Box className="h-8 w-8 text-brand-accent mb-3" />
              <p className="text-2xl font-black text-white">Top Marcas</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Stock permanente</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <Truck className="h-8 w-8 text-brand-accent mb-3" />
              <p className="text-2xl font-black text-white">Extrema</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Logística federal</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-brand-blue sm:text-4xl">Las categorías que más rotan.</h2>
            <p className="mt-4 text-lg text-slate-600 font-medium">Trabajamos el surtido exacto que tu mostrador necesita para maximizar rentabilidad.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATEGORIES.slice(0, 5).map((cat, i) => (
              <Link key={cat} to={`/catalogo?categoria=${cat}`} className="group block relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all border border-slate-100">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/40 to-transparent z-10"></div>
                <img 
                  src={getAssetPath([
                    "/regenerated_image_1777425120116.png", // panales
                    "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80", // leche
                    "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&auto=format&fit=crop&q=80", // ropa
                    "/regenerated_image_1777425121116.png", // higiene
                    "/regenerated_image_1777425121876.png"  // accesorios
                  ][i] || "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80")} 
                  alt={cat} 
                  className="h-64 w-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-black text-white mb-1">{cat}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-brand-accent font-bold">Ver Catálogo</span>
                    <ChevronRight className="h-6 w-6 text-white group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING HOOK */}
      <section className="bg-brand-blue text-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <TrendingDown className="h-16 w-16 text-brand-accent mb-6" />
              <h2 className="text-4xl font-black mb-6">El volumen manda. <br/>Tus costos bajan.</h2>
              <p className="text-xl text-slate-300 font-medium mb-8">
                Nuestro sistema de precios por escala está diseñado para premiar a los comerciantes que apuestan fuerte. Cuanto más comprás, más rápido crece tu rentabilidad.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-brand-accent">1</div>
                  <div>
                    <h4 className="text-lg font-bold">Comprá por caja cerrada</h4>
                    <p className="text-slate-400">Accedé al precio base mayorista.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-brand-accent">2</div>
                  <div>
                    <h4 className="text-lg font-bold">Volumen medio (+10 cajas)</h4>
                    <p className="text-slate-400">Descuento automático del 8% en el total de la línea.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-accent flex items-center justify-center font-bold text-brand-blue">3</div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-accent">Equipo Pallet (+50 cajas)</h4>
                    <p className="text-slate-400">Precio distribuidor. Máxima rentabilidad garantizada.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-slate-900 border-4 border-brand-accent transform lg:translate-x-8">
              <div className="text-center mb-8">
                <h3 className="text-md font-bold text-slate-500 uppercase tracking-wider">Ejemplo Real: Pañales Premium XG</h3>
                <p className="text-sm text-slate-400 mt-1">Rentabilidad estimada de venta al público: $9.500</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold">1 Caja (4 unidades)</div>
                  <div className="text-right">
                    <div className="text-xl font-black text-brand-blue">$6.500 <span className="text-sm font-normal text-slate-500">/u</span></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="font-bold text-blue-900">10 Cajas (40 unidades)</div>
                  <div className="text-right">
                    <div className="text-xl font-black text-blue-700">$5.980 <span className="text-sm font-normal text-slate-500">/u</span></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-6 rounded-xl bg-slate-900 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute right-0 top-0 bottom-0 bg-brand-accent w-2"></div>
                  <div>
                    <div className="font-black text-brand-accent text-lg">Pallet (100 Cajas)</div>
                    <div className="text-sm text-slate-400 font-medium mt-1">Margen extraordinario</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-white">$5.200 <span className="text-base font-normal text-slate-400">/u</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-brand-blue">Tu alta en 3 pasos simples.</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-200" />
            
            <div className="relative text-center">
              <div className="mx-auto h-24 w-24 bg-brand-blue text-white rounded-2xl flex items-center justify-center text-3xl font-black rotate-3 shadow-xl mb-6 relative z-10 border-4 border-white">
                1
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Registrá tu CUIT</h3>
              <p className="text-slate-600 font-medium">Completá el formulario con los datos de tu comercio. Solo operamos con responsables inscriptos y monotributistas.</p>
            </div>
            
            <div className="relative text-center">
              <div className="mx-auto h-24 w-24 bg-brand-accent text-brand-blue rounded-2xl flex items-center justify-center text-3xl font-black -rotate-3 shadow-xl mb-6 relative z-10 border-4 border-white">
                2
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Activamos tu cuenta</h3>
              <p className="text-slate-600 font-medium">En menos de 24hs un ejecutivo de cuentas validará tus datos y habilitará la vista de precios mayoristas completa.</p>
            </div>
            
            <div className="relative text-center">
              <div className="mx-auto h-24 w-24 bg-brand-red text-white rounded-2xl flex items-center justify-center text-3xl font-black rotate-6 shadow-xl mb-6 relative z-10 border-4 border-white">
                3
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Armá tu pedido</h3>
              <p className="text-slate-600 font-medium">Sumá al carrito (mínimo $150k), pagá por transferencia y recibí la mercadería en cualquier punto del país.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-24 bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center text-brand-blue mb-16">Lo que dicen los comerciantes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Desde que compro los pañales acá, pude bajar los precios en el mostrador y ganar más. La entrega en Córdoba capital siempre llega a tiempo.",
                author: "Martín R.",
                business: "Farmacias Central Córdoba"
              },
              {
                text: "Tengo una pañalera en zona oeste y la atención del ejecutivo de cuentas te salva. Siempre me avisan antes de los aumentos para que me estoquee.",
                author: "Lucía M.",
                business: "Pañalera El Bebé"
              },
              {
                text: "Los mejores precios en leches de fórmula lejos. Comprar por equipo cerrado me cambió el margen del negocio. Muy recomendables.",
                author: "Carlos P.",
                business: "Supermercito Rosario"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 relative">
                <div className="text-brand-accent text-6xl font-serif absolute top-4 left-6 opacity-30">"</div>
                <p className="text-slate-700 font-medium italic relative z-10 text-lg">"{t.text}"</p>
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="font-bold text-slate-900">{t.author}</p>
                  <p className="text-sm font-bold text-slate-500 uppercase">{t.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-brand-blue py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-blue pattern-diagonal-lines pattern-slate-800 pattern-bg-white pattern-size-4 pattern-opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-6">Dejá de pagar de más a intermediarios.</h2>
          <p className="text-xl text-slate-300 font-medium mb-10 max-w-2xl mx-auto">
            El 90% de los comercios que cotizan con nosotros, se transforman en clientes activos la misma semana.
          </p>
          <Link to="/registro">
            <Button size="lg" className="text-xl px-12 h-16 shadow-[0_0_40px_-10px_rgba(255,204,0,0.5)]">
              Abrir Cuenta Mayorista Ahora
            </Button>
          </Link>
          <p className="mt-6 text-sm font-bold text-slate-400">Totalmente gratuito. Sin costos de mantenimiento.</p>
        </div>
      </section>
    </div>
  );
}
