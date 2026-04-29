import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { CheckCircle2, ShieldCheck, Mail, Smartphone, User, FileText, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export function Registro() {
  const [formData, setFormData] = useState({
    nombreNegocio: "",
    nombreResponsable: "",
    cuit: "",
    tipoNegocio: "",
    telefono: "",
    email: "",
    provincia: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombreNegocio) newErrors.nombreNegocio = "El nombre es requerido";
    if (!formData.nombreResponsable) newErrors.nombreResponsable = "El responsable es requerido";
    
    // CUIT validation: exactly 11 digits
    const cleanedCuit = formData.cuit.replace(/[^0-9]/g, '');
    if (cleanedCuit.length !== 11) {
      newErrors.cuit = "El CUIT debe tener exactamente 11 números";
    }

    if (!formData.tipoNegocio) newErrors.tipoNegocio = "Seleccione un tipo de negocio";
    if (!formData.telefono) newErrors.telefono = "El teléfono es requerido";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email inválido";
    if (!formData.provincia) newErrors.provincia = "Seleccione una provincia";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // simulate API call
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-slate-50 min-h-screen py-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border-t-8 border-brand-accent">
          <CheckCircle2 className="mx-auto h-20 w-20 text-green-500 mb-6" />
          <h2 className="text-3xl font-black text-brand-blue mb-4">¡Solicitud Enviada!</h2>
          <p className="text-slate-600 mb-8 font-medium">
            Hemos recibido tus datos correctamente. Nuestro equipo de altas verificará tu CUIT y en menos de 24hs hábiles te contactaremos para activar tu clave mayorista.
          </p>
          <Link to="/">
            <Button size="lg" className="w-full h-14 text-lg">Volver al Inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-24">
          
          {/* INFO SECTION */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-black text-brand-blue leading-tight mb-6">
              Registrá tu negocio y accedé a la <span className="text-brand-accent">verdadera</span> lista de precios.
            </h1>
            <p className="text-lg text-slate-600 font-medium mb-10">
              Operamos estrictamente de forma mayorista B2B. Protegemos al comercio minorista no publicando nuestros precios finales al público general.
            </p>

            <div className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1"><ShieldCheck className="h-6 w-6 text-brand-accent" /></div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Validación CUIT Segura</h3>
                  <p className="text-slate-600 text-sm mt-1">Garantizamos que solo comercios del rubro accedan a la rentabilidad mayorista.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1"><CheckCircle2 className="h-6 w-6 text-green-500" /></div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Alta y Aprobación Rápida</h3>
                  <p className="text-slate-600 text-sm mt-1">En el día tenés tu cuenta activa y podés cursar tu primer pedido desde la web.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM SECTION */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border-4 border-slate-900 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent rounded-bl-full -mr-8 -mt-8 opacity-20"></div>
              
              <h2 className="text-2xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">
                Formulario de Alta Comercial
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Negocio */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                       <Building2 className="h-4 w-4 text-slate-400" /> Nombre del Comercio
                    </label>
                    <input
                      type="text"
                      className={`w-full bg-slate-50 border ${errors.nombreNegocio ? 'border-brand-red' : 'border-slate-200'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue`}
                      placeholder="Ej. Farmacia Central"
                      value={formData.nombreNegocio}
                      onChange={e => setFormData({...formData, nombreNegocio: e.target.value})}
                    />
                    {errors.nombreNegocio && <p className="text-brand-red text-xs font-bold">{errors.nombreNegocio}</p>}
                  </div>

                  {/* Responsable */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                       <User className="h-4 w-4 text-slate-400" /> Nombre del Responsable
                    </label>
                    <input
                      type="text"
                      className={`w-full bg-slate-50 border ${errors.nombreResponsable ? 'border-brand-red' : 'border-slate-200'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue`}
                      placeholder="Ej. Juan Pérez"
                      value={formData.nombreResponsable}
                      onChange={e => setFormData({...formData, nombreResponsable: e.target.value})}
                    />
                    {errors.nombreResponsable && <p className="text-brand-red text-xs font-bold">{errors.nombreResponsable}</p>}
                  </div>

                  {/* CUIT */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                       <FileText className="h-4 w-4 text-slate-400" /> CUIT (Numérico)
                    </label>
                    <input
                      type="text"
                      maxLength={11}
                      className={`w-full bg-slate-50 border ${errors.cuit ? 'border-brand-red' : 'border-slate-200'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue`}
                      placeholder="Sin guiones, 11 dígitos"
                      value={formData.cuit}
                      onChange={e => setFormData({...formData, cuit: e.target.value})}
                    />
                    {errors.cuit && <p className="text-brand-red text-xs font-bold">{errors.cuit}</p>}
                  </div>

                  {/* Tipo */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Tipo de Negocio</label>
                    <select
                      className={`w-full bg-slate-50 border ${errors.tipoNegocio ? 'border-brand-red' : 'border-slate-200'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer`}
                      value={formData.tipoNegocio}
                      onChange={e => setFormData({...formData, tipoNegocio: e.target.value})}
                    >
                      <option value="">Seleccione...</option>
                      <option value="Farmacia">Farmacia</option>
                      <option value="Pañalera">Pañalera</option>
                      <option value="Kiosco/Maxikiosco">Kiosco / Maxikiosco</option>
                      <option value="Almacén/Autoservicio">Almacén / Autoservicio</option>
                      <option value="Otro">Otro</option>
                    </select>
                    {errors.tipoNegocio && <p className="text-brand-red text-xs font-bold">{errors.tipoNegocio}</p>}
                  </div>

                  {/* Tel */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                       <Smartphone className="h-4 w-4 text-slate-400" /> Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      className={`w-full bg-slate-50 border ${errors.telefono ? 'border-brand-red' : 'border-slate-200'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue`}
                      placeholder="+54 9 11..."
                      value={formData.telefono}
                      onChange={e => setFormData({...formData, telefono: e.target.value})}
                    />
                    {errors.telefono && <p className="text-brand-red text-xs font-bold">{errors.telefono}</p>}
                  </div>

                  {/* Provincia */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                       Provincia
                    </label>
                    <select
                      className={`w-full bg-slate-50 border ${errors.provincia ? 'border-brand-red' : 'border-slate-200'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer`}
                      value={formData.provincia}
                      onChange={e => setFormData({...formData, provincia: e.target.value})}
                    >
                      <option value="">Seleccione provincia...</option>
                      <option value="Buenos Aires">Buenos Aires</option>
                      <option value="CABA">CABA</option>
                      <option value="Córdoba">Córdoba</option>
                      <option value="Santa Fe">Santa Fe</option>
                      <option value="Mendoza">Mendoza</option>
                      <option value="Otra">Otra</option>
                    </select>
                    {errors.provincia && <p className="text-brand-red text-xs font-bold">{errors.provincia}</p>}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" /> Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className={`w-full bg-slate-50 border ${errors.email ? 'border-brand-red' : 'border-slate-200'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue`}
                    placeholder="compras@midominio.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                  {errors.email && <p className="text-brand-red text-xs font-bold">{errors.email}</p>}
                </div>

                <div className="pt-6">
                  <Button type="submit" size="lg" className="w-full text-lg h-14 bg-brand-blue text-white hover:bg-slate-800">
                    Enviar Solicitud de Apertura
                  </Button>
                </div>
                
                <p className="text-center text-xs text-slate-400 font-medium">
                  Al enviar este formulario acepta los términos y condiciones de compra mayorista.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
