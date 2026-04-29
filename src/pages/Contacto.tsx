import { Button } from "../components/ui/Button";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";

export function Contacto() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-black text-brand-blue mb-4">¿Dudas sobre operaciones?</h1>
          <p className="text-lg text-slate-600 font-medium">Nuestro canal principal de atención a comercios es vía WhatsApp para garantizar velocidad operativa.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* INFO & WHATSAPP */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-100">
                <MessageCircle className="h-8 w-8 text-[#25D366] mt-1" />
                <div>
                  <h3 className="font-black text-2xl text-slate-900 mb-2">Canal Mayoristas</h3>
                  <p className="text-slate-600 mb-4">Respuesta INMEDIATA durante horario comercial.</p>
                  <a href="https://wa.me/5493584123456" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-[#25D366] hover:bg-[#20BE5C] text-white w-full sm:w-auto text-lg gap-2">
                       Abrir Chat WhatsApp
                    </Button>
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-slate-400" />
                  <div>
                    <p className="font-bold text-slate-900">Email Administrativo</p>
                    <p className="text-slate-600">ventas@bebemayor.com.ar</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Clock className="h-6 w-6 text-slate-400" />
                  <div>
                    <p className="font-bold text-slate-900">Horario de Atención (Ventas)</p>
                    <p className="text-slate-600">Lunes a Viernes de 8:00 a 17:00 hs.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-slate-400" />
                  <div>
                    <p className="font-bold text-slate-900">Centro Logístico (Solo Retiros)</p>
                    <p className="text-slate-600">Parque Industrial, Río Cuarto, Córdoba</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-brand-blue text-white p-8 rounded-2xl">
              <h3 className="font-black text-xl mb-2 text-brand-accent">Aviso Importante</h3>
              <p className="text-slate-300">
                No realizamos atenciones al por menor en nuestra planta. El acceso al predio es exclusivo para transportistas y clientes mayoristas con turno previo de retiro asignado.
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="font-black text-2xl text-slate-900 mb-6">Dejanos un mensaje</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Mensaje enviado"); }}>
              <div>
                <label className="text-sm font-bold text-slate-700">Nombre / Negocio</label>
                <input type="text" className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="Tu nombre" required />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700">Teléfono</label>
                <input type="tel" className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="Tu contacto" required />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700">Asunto</label>
                <select className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue">
                  <option>Consulta de Stock</option>
                  <option>Estado de mi Pedido</option>
                  <option>Problema con Facturación</option>
                  <option>Oportunidad Comercial</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700">Mensaje</label>
                <textarea rows={4} className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="¿En qué te podemos ayudar?" required></textarea>
              </div>
              <Button type="submit" size="lg" className="w-full text-lg">Enviar Mensaje</Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
