import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Check, ChevronRight, CreditCard, Landmark, QrCode, ShoppingBag, Truck, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/utils";
import { Button } from "../components/ui/Button";
import confetti from "canvas-confetti";

const PROVINCES = [
  "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
  "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza",
  "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
  "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: "Resumen" },
    { num: 2, label: "Envío" },
    { num: 3, label: "Pago" },
    { num: 4, label: "Confirmación" }
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-3xl mx-auto relative">
        {/* Progress line background */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0" />
        {/* Active progress line */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-brand-accent transition-all duration-500 ease-in-out -translate-y-1/2 z-0" 
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        />

        {steps.map((step) => {
          const isActive = step.num === currentStep;
          const isCompleted = step.num < currentStep;

          return (
            <div key={step.num} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2
                  ${isActive ? "bg-brand-blue border-brand-accent text-white shadow-lg" : 
                    isCompleted ? "bg-brand-accent border-brand-accent text-brand-blue" : 
                    "bg-white border-slate-300 text-slate-400"}`}
              >
                {isCompleted ? <Check className="w-6 h-6" /> : step.num}
              </div>
              <span className={`absolute top-12 text-sm font-bold w-32 text-center
                ${isActive || isCompleted ? "text-brand-blue" : "text-slate-400"}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Checkout() {
  const navigate = useNavigate();
  const { items, cartTotal, minOrderReached, MIN_ORDER_AMOUNT, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    negocio: "",
    responsable: "",
    cuit: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    cp: "",
    telefono: ""
  });
  
  const [paymentMethod, setPaymentMethod] = useState<"mp" | "transfer" | "qr">("mp");

  // Validate Step 2
  const isEnvioValid = 
    formData.negocio.trim() !== "" &&
    formData.responsable.trim() !== "" &&
    /^\d{11}$/.test(formData.cuit) &&
    formData.direccion.trim() !== "" &&
    formData.ciudad.trim() !== "" &&
    formData.provincia !== "" &&
    formData.cp.trim() !== "" &&
    formData.telefono.trim() !== "";

  useEffect(() => {
    // If step 4, trigger confetti
    if (step === 4) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#003366', '#FFD700', '#F3F4F6']
      });
      clearCart();
    }
  }, [step, clearCart]);

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const year = new Date().getFullYear();
      const randomId = Math.floor(Math.random() * 9000) + 1000;
      setOrderNumber(`#BM-${year}-${randomId}`);
      setStep(4);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (items.length === 0 && step !== 4) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <ShoppingCartIcon className="w-24 h-24 text-slate-300 mx-auto mb-6" />
        <h2 className="text-3xl font-black text-brand-blue mb-4">No hay productos en tu pedido</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Para iniciar el proceso de checkout necesitas agregar productos a tu carrito mayorista.</p>
        <Link to="/catalogo">
          <Button size="lg">Volver al catálogo</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-24">
      {/* Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand-accent border-t-transparent mb-6"></div>
          <h2 className="text-2xl font-bold text-white">Procesando tu pedido...</h2>
          <p className="text-slate-300 mt-2">Por favor no cierres esta ventana.</p>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <StepIndicator currentStep={step} />

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 mt-16 p-6 sm:p-10">
          
          {/* STEP 1: RESUMEN */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-brand-blue mb-6 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-brand-accent" />
                Resumen del pedido
              </h2>
              
              <div className="space-y-4 mb-8">
                {items.map(item => (
                  <div key={item.product.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-slate-100 last:border-0 gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-brand-blue line-clamp-1">{item.product.name}</h4>
                      <p className="text-sm text-slate-500 mt-1">
                        Caja x{item.product.boxQuantity}u — {item.quantity} cajas a {formatPrice(item.product.unitPrice)}/u
                      </p>
                      {item.quantity >= 10 && (
                        <span className="inline-block mt-2 text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Precio por 10+ unidades aplicado
                        </span>
                      )}
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <p className="font-bold text-lg tabular-nums text-brand-blue">
                        {formatPrice(item.product.unitPrice * item.product.boxQuantity * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3 mb-8">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Envío</span>
                  <span className="italic">Envío a calcular según destino</span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between font-black text-xl text-brand-blue">
                  <span>Total Estimado</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {!minOrderReached ? (
                <div className="bg-red-50 border-l-4 border-brand-red p-4 rounded-r-xl">
                  <p className="font-bold text-brand-red mb-2">No alcanzas el mínimo de compra</p>
                  <p className="text-sm text-brand-red/80 mb-4">El monto mínimo para pedidos mayoristas es de {formatPrice(MIN_ORDER_AMOUNT)}.</p>
                  <Link to="/catalogo">
                    <Button variant="outline" className="w-full sm:w-auto">Volver al catálogo</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-end gap-4">
                  <Button variant="outline" onClick={() => navigate("/catalogo")}>Seguir comprando</Button>
                  <Button size="lg" onClick={() => setStep(2)}>
                    Continuar con los datos de envío <ChevronRight className="w-5 h-5 ml-1 -mr-1" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: ENVÍO */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-brand-blue mb-6 flex items-center gap-2">
                <Truck className="w-6 h-6 text-brand-accent" />
                Datos de envío
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-blue">Nombre del negocio</label>
                  <input name="negocio" value={formData.negocio} onChange={handleChange} className="form-input" placeholder="Farmacia del Centro" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-blue">Nombre del responsable</label>
                  <input name="responsable" value={formData.responsable} onChange={handleChange} className="form-input" placeholder="Juan Pérez" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-blue">CUIT (solo números, 11 dígitos)</label>
                  <input name="cuit" value={formData.cuit} onChange={handleChange} className="form-input" placeholder="20123456789" maxLength={11} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-blue">Teléfono (con área)</label>
                  <input name="telefono" value={formData.telefono} onChange={handleChange} className="form-input" placeholder="11 2345-6789" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-brand-blue">Dirección exacta</label>
                  <input name="direccion" value={formData.direccion} onChange={handleChange} className="form-input" placeholder="Av. Rivadavia 1234, Local 3" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-blue">Ciudad</label>
                  <input name="ciudad" value={formData.ciudad} onChange={handleChange} className="form-input" placeholder="Ciudad Autónoma de Buenos Aires" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-blue">Provincia</label>
                  <select name="provincia" value={formData.provincia} onChange={handleChange} className="form-input bg-white cursor-pointer">
                    <option value="">Seleccionar Provincia...</option>
                    {PROVINCES.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-blue">Código Postal</label>
                  <input name="cp" value={formData.cp} onChange={handleChange} className="form-input" placeholder="C1033AAV" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between pt-6 border-t border-slate-100 gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>Volver</Button>
                <Button 
                  size="lg" 
                  disabled={!isEnvioValid} 
                  onClick={() => setStep(3)}
                >
                  Continuar con el pago <ChevronRight className="w-5 h-5 ml-1 -mr-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: PAGO */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-brand-blue mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-brand-accent" />
                Método de pago
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Mercado Pago */}
                <label className={`relative cursor-pointer rounded-2xl border-2 p-6 flex flex-col items-start transition-all
                  ${paymentMethod === 'mp' ? 'border-brand-accent bg-blue-50/50' : 'border-slate-200 hover:border-brand-blue hover:bg-slate-50'}`}>
                  <input type="radio" className="sr-only" checked={paymentMethod === 'mp'} onChange={() => setPaymentMethod('mp')} />
                  <div className="w-full flex justify-between items-center mb-4">
                    <img src="https://logos-marcas.com/wp-content/uploads/2020/10/Mercado-Pago-Logo.png" className="h-6 object-contain" alt="Mercado Pago" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${paymentMethod === 'mp' ? 'border-brand-accent bg-brand-accent' : 'border-slate-300'}`}>
                      {paymentMethod === 'mp' && <div className="w-2.5 h-2.5 bg-brand-blue rounded-full" />}
                    </div>
                  </div>
                  <h3 className="font-bold text-brand-blue mb-1">Mercado Pago</h3>
                  <p className="text-sm text-slate-500 font-medium">Tarjetas de crédito o débito</p>
                  <div className="mt-auto pt-4 w-full">
                    <span className="inline-block text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">Hasta 12 cuotas</span>
                    <p className="text-xs text-slate-400 mt-2">Comisión del 4.99% incluida en el portal</p>
                  </div>
                </label>

                {/* Transferencia */}
                <label className={`relative cursor-pointer rounded-2xl border-2 p-6 flex flex-col items-start transition-all
                  ${paymentMethod === 'transfer' ? 'border-brand-accent bg-blue-50/50' : 'border-slate-200 hover:border-brand-blue hover:bg-slate-50'}`}>
                  <input type="radio" className="sr-only" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} />
                  <div className="w-full flex justify-between items-center mb-4">
                    <Landmark className="h-6 w-6 text-brand-blue" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${paymentMethod === 'transfer' ? 'border-brand-accent bg-brand-accent' : 'border-slate-300'}`}>
                      {paymentMethod === 'transfer' && <div className="w-2.5 h-2.5 bg-brand-blue rounded-full" />}
                    </div>
                  </div>
                  <h3 className="font-bold text-brand-blue mb-1">Transferencia</h3>
                  <p className="text-sm text-slate-500 font-medium">Bancaria o billeteras</p>
                  <div className="mt-auto pt-4 w-full">
                    <span className="inline-block text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Sin comisión</span>
                  </div>
                </label>

                {/* QR MP */}
                <label className={`relative cursor-pointer rounded-2xl border-2 p-6 flex flex-col items-start transition-all
                  ${paymentMethod === 'qr' ? 'border-brand-accent bg-blue-50/50' : 'border-slate-200 hover:border-brand-blue hover:bg-slate-50'}`}>
                  <input type="radio" className="sr-only" checked={paymentMethod === 'qr'} onChange={() => setPaymentMethod('qr')} />
                  <div className="w-full flex justify-between items-center mb-4">
                    <QrCode className="h-6 w-6 text-[#009EE3]" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${paymentMethod === 'qr' ? 'border-brand-accent bg-brand-accent' : 'border-slate-300'}`}>
                      {paymentMethod === 'qr' && <div className="w-2.5 h-2.5 bg-brand-blue rounded-full" />}
                    </div>
                  </div>
                  <h3 className="font-bold text-brand-blue mb-1">Mercado Pago QR</h3>
                  <p className="text-sm text-slate-500 font-medium">Escaneá desde tu app</p>
                  <div className="mt-auto pt-4 w-full">
                    <span className="inline-block text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">Cargar dinero</span>
                  </div>
                </label>
              </div>

              {/* Dynamic Payment info */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 text-sm">
                {paymentMethod === 'transfer' && (
                  <div>
                    <h4 className="font-bold text-brand-blue mb-2 text-base">Datos para la transferencia</h4>
                    <div className="space-y-1 mb-4 text-slate-600">
                      <p><strong>CBU/CVU:</strong> 0000003100012345678901</p>
                      <p><strong>Alias:</strong> BEBEMAYOR.PAGOS</p>
                      <p><strong>Titular:</strong> BebéMayor SRL</p>
                    </div>
                    <p className="text-brand-accent font-bold bg-blue-900 text-white inline-block px-3 py-1 rounded">
                      Importante: Tu pedido se confirmará una vez acreditado el pago. Tiempo estimado: 1-2 horas hábiles.
                    </p>
                  </div>
                )}
                {paymentMethod === 'mp' && (
                  <p className="text-slate-600 font-medium">Serás redirigido de forma segura a Mercado Pago para completar la transacción. Una vez finalizada, volverás al sitio para ver la confirmación.</p>
                )}
                {paymentMethod === 'qr' && (
                  <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6">
                    <div className="w-32 h-32 bg-slate-200 rounded-xl border-2 border-dashed border-slate-400 flex items-center justify-center text-slate-500 text-center font-bold text-xs p-2">
                       [ REPLACE: QR code ]
                    </div>
                    <p className="text-slate-600 font-medium flex-1">
                      En el siguiente paso verás el código QR completo para escanear con la app de Mercado Pago o tu billetera favorita. El pago se procesará al instante.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between pt-6 border-t border-slate-100 gap-4">
                <Button variant="outline" onClick={() => setStep(2)}>Volver</Button>
                <Button size="lg" className="px-8" onClick={handleConfirmOrder}>Confirmar pedido</Button>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMACIÓN */}
          {step === 4 && (
            <div className="animate-in zoom-in-95 fade-in duration-700 text-center py-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-4xl font-black text-brand-blue mb-4">¡Pedido recibido!</h2>
              <p className="text-xl text-slate-600 mb-2">Orden <span className="font-bold text-brand-blue">{orderNumber}</span></p>
              
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mt-8 mb-8 max-w-md mx-auto text-left space-y-4">
                <h3 className="font-bold text-brand-blue mb-2">Resumen</h3>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-600">Total</span>
                  <span className="font-bold">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Método</span>
                  <span className="font-bold">
                    {paymentMethod === 'mp' ? 'Mercado Pago' : paymentMethod === 'transfer' ? 'Transferencia' : 'QR Mercado Pago'}
                  </span>
                </div>
              </div>

              <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 max-w-2xl mx-auto mb-8 text-brand-blue">
                <h4 className="font-bold mb-2">Próximos pasos</h4>
                {paymentMethod === 'mp' && <p>Tu pago está siendo procesado exitosamente. Recibirás una confirmación por email en los próximos minutos con la factura correspondiente y el estado de tu envío.</p>}
                {paymentMethod === 'transfer' && <p>Realizá la transferencia al CBU indicado en el paso anterior y enviá el comprobante a pagos@bebemayor.com. Tu pedido se activará dentro de 1-2 horas hábiles.</p>}
                {paymentMethod === 'qr' && <p>Hemos verificado tu pago por código QR al instante. Nos estamos comunicando para coordinar el envío de tu mercadería.</p>}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="outline" size="lg" onClick={() => navigate("/")}>Volver al inicio</Button>
                <Button size="lg" onClick={() => alert("Simulación: Iría a un portal del cliente (/mi-cuenta)")}>Ver mis pedidos</Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
  );
}
