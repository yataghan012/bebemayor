import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { useCart } from "../context/CartContext";
import { formatPrice, cn, getAssetPath } from "../lib/utils";
import { Button } from "../components/ui/Button";
import { ShoppingCart, LayoutGrid, Package, ChevronDown } from "lucide-react";

export function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaParam = searchParams.get("categoria");
  
  const [activeCategory, setActiveCategory] = useState<string>(categoriaParam || "Todos");
  const { addItem, cartTotal, MIN_ORDER_AMOUNT } = useCart();

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Todos") return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "Todos") {
      searchParams.delete("categoria");
    } else {
      searchParams.set("categoria", cat);
    }
    setSearchParams(searchParams);
  };

  const progress = Math.min((cartTotal / MIN_ORDER_AMOUNT) * 100, 100);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Sticky Progress Bar */}
      <div className="sticky top-20 z-30 bg-slate-900 border-t border-slate-800 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-brand-accent/5" />
        <div 
          className="absolute left-0 top-0 bottom-0 bg-brand-accent/20 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between text-sm">
          <div className="flex items-center gap-2 font-bold text-white mb-2 sm:mb-0">
            <Package className="h-4 w-4 text-brand-accent" />
            Estado del Pedido:
          </div>
          <div className="font-bold flex items-center gap-4">
            <span className="text-white">Actual: {formatPrice(cartTotal)}</span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-brand-accent">Mínimo: {formatPrice(MIN_ORDER_AMOUNT)}</span>
            {cartTotal >= MIN_ORDER_AMOUNT && (
              <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs ml-2 uppercase tracking-wide">Mínimo OK</span>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER & FILTERS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-brand-blue tracking-tight mb-2">Catálogo Mayorista</h1>
            <p className="text-slate-600 font-medium">Precios exclusivos para comercios validados. Listas actualizadas.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR FILTERS */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-40">
              <h3 className="font-black text-brand-blue uppercase tracking-wider mb-4 flex items-center gap-2">
                <LayoutGrid className="h-5 w-5" /> Categorías
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleCategoryClick("Todos")}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md font-bold transition-all text-sm",
                      activeCategory === "Todos" 
                        ? "bg-brand-blue text-white" 
                        : "text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    Todos los productos
                  </button>
                </li>
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => handleCategoryClick(cat)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md font-bold transition-all text-sm",
                        activeCategory === cat 
                          ? "bg-brand-blue text-white" 
                          : "text-slate-600 hover:bg-slate-100"
                      )}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-8 border-t border-slate-100">
                <img src="https://images.unsplash.com/photo-1596489370836-e8d19d67db91?w=400&h=400&fit=crop" alt="Promo Promo" className="rounded-lg shadow-inner opacity-80 mix-blend-multiply" />
                <div className="mt-4 bg-brand-accent p-3 rounded-md text-brand-blue font-black text-center text-sm">
                  Llevando 50 cajas +10% DESC
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 group flex flex-col">
                  
                  {/* Image area */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100 p-4">
                    <span className="absolute top-4 left-4 z-10 bg-brand-blue text-white text-xs font-black px-2 py-1 uppercase tracking-wider rounded">
                      MAYORISTA
                    </span>
                    <img 
                      src={getAssetPath(product.imageUrl)} 
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content area */}
                  <div className="p-5 flex flex-col flex-1 border-t border-slate-100">
                    <div className="mb-1 text-xs font-bold text-slate-400 uppercase tracking-widest">{product.brand}</div>
                    <h3 className="text-lg font-bold text-brand-blue leading-tight mb-4 flex-1">
                      {product.name}
                    </h3>
                    
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-sm font-bold text-slate-500">Precio Unitario</span>
                        <span className="text-xl font-black text-brand-red">{formatPrice(product.unitPrice)}</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
                        <span className="text-sm font-bold text-slate-500">Caja cerrada ({product.boxQuantity}u)</span>
                        <span className="font-bold text-slate-900">{formatPrice(product.unitPrice * product.boxQuantity)}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full gap-2 text-base h-12" 
                      onClick={() => addItem(product, 1)}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Agregar x{product.boxQuantity}u
                    </Button>
                    <p className="text-center text-xs text-slate-400 mt-3 font-medium">
                      Mínimo {product.minQuantity} cajas
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-24 bg-white rounded-2xl border border-slate-200">
                <p className="text-xl font-bold text-slate-400">No hay productos en esta categoría.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
