import { X, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/utils";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

export function CartDrawer() {
  const navigate = useNavigate();
  const { 
    items, 
    isCartOpen, 
    setIsCartOpen, 
    removeItem, 
    updateQuantity, 
    cartTotal, 
    minOrderReached, 
    MIN_ORDER_AMOUNT 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="relative z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 flex max-w-full w-full sm:w-[400px]">
        <div className="flex h-full w-full flex-col bg-white shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-6 border-b border-slate-100 sm:px-6">
            <h2 className="text-xl font-black text-brand-blue flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              Pedido Mayorista
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-md text-slate-400 hover:text-slate-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-4 py-4 sm:px-6 bg-slate-50 border-b border-slate-100">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span>Mínimo: {formatPrice(MIN_ORDER_AMOUNT)}</span>
              {minOrderReached ? (
                <span className="text-green-600">¡Alcanzado!</span>
              ) : (
                <span className="text-brand-red">Faltan {formatPrice(MIN_ORDER_AMOUNT - cartTotal)}</span>
              )}
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${minOrderReached ? 'bg-green-500' : 'bg-brand-accent'}`}
                style={{ width: `${Math.min((cartTotal / MIN_ORDER_AMOUNT) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                <ShoppingBag className="h-16 w-16 text-slate-300" />
                <p className="text-lg font-bold">Sin productos en el pedido</p>
                <Button onClick={() => setIsCartOpen(false)}>Ver Catálogo</Button>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.product.id} className="flex py-2 border-b border-slate-100 pb-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-200">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-bold text-brand-blue">
                          <h3 className="line-clamp-2 pr-4">{item.product.name}</h3>
                          <p className="ml-4 tabular-nums">
                            {formatPrice(item.product.unitPrice * item.product.boxQuantity * item.quantity)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">
                          Caja x{item.product.boxQuantity}u ({formatPrice(item.product.unitPrice)}/u)
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-slate-200 rounded-md">
                          <button 
                            className="px-3 py-1 font-bold text-slate-600 hover:bg-slate-100"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >-</button>
                          <span className="px-3 py-1 font-bold tabular-nums min-w-[3ch] text-center">{item.quantity}</span>
                          <button 
                            className="px-3 py-1 font-bold text-slate-600 hover:bg-slate-100"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >+</button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          className="font-medium text-brand-red hover:text-brand-red/80 flex items-center gap-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="hidden sm:inline">Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-slate-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-lg font-black text-brand-blue mb-4">
                <p>Total Estimado</p>
                <p className="tabular-nums">{formatPrice(cartTotal)}</p>
              </div>
              <p className="text-sm text-slate-500 mb-6">
                El envío y los impuestos se calculan en el siguiente paso.
              </p>
              <Button 
                size="lg" 
                className="w-full flex items-center justify-center gap-2"
                disabled={!minOrderReached}
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
              >
                {minOrderReached ? (
                  <>Ir al checkout <ArrowRight className="h-5 w-5" /></>
                ) : (
                  <>No alcanzas el mínimo de compra</>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
