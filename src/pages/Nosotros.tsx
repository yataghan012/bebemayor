import { Building2, TrendingUp, Handshake, Truck } from "lucide-react";

export function Nosotros() {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* HEADER HERO */}
      <section className="bg-brand-blue pt-20 pb-32 text-center text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-brand-blue opacity-50"></div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-black mb-6">El socio estratégico de tu mostrador.</h1>
          <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed">
            Nacimos con un objetivo claro: democratizar el acceso a precios y volúmenes de mayoristas centrales a todos los comercios del país.
          </p>
        </div>
      </section>

      {/* STORY & MISSION */}
      <section className="py-20 -mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-200">
          <div className="md:w-1/2">
            <img 
              src="/regenerated_image_1777459476009.png" 
              alt="Centro Logístico BebéMayor" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-black text-brand-blue mb-6">Nuestra Historia</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Durante años, los grandes márgenes de ganancia estaban reservados para las cadenas de supermercados. El comerciante de barrio, la farmacia local y la pañalera independiente tenían que comprar a intermediarios que se quedaban con la mayor parte de la rentabilidad.
            </p>
            <p className="text-lg text-slate-600 font-bold leading-relaxed border-l-4 border-brand-accent pl-4">
              En BebéMayor centralizamos los grandes volúmenes de compra directo de fábrica y trasladamos ese poder de negociación a tus compras.
            </p>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-brand-blue">Por qué elegirnos</h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="h-14 w-14 bg-brand-blue rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Transparencia Total</h3>
              <p className="text-slate-600">Precios fijados y actualizados semanalmente en nuestro catálogo. Sin sorpresas al facturar.</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="h-14 w-14 bg-brand-blue rounded-xl flex items-center justify-center mb-6">
                <Truck className="h-6 w-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Logística Federal</h3>
              <p className="text-slate-600">Llegamos a todo el interior del país con transportes asociados para garantizar la entrega segura.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="h-14 w-14 bg-brand-blue rounded-xl flex items-center justify-center mb-6">
                <Handshake className="h-6 w-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Asesor Asignado</h3>
              <p className="text-slate-600">Cada cuenta opera con un agente de ventas personal que te asesora sobre oportunidades de stock.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="h-14 w-14 bg-brand-blue rounded-xl flex items-center justify-center mb-6">
                <Building2 className="h-6 w-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Marcas Líderes</h3>
              <p className="text-slate-600">Comercializamos en exclusiva modelos de rotación probada, asegurando ventas en tu mostrador.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
