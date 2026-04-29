export type Category = "Pañales" | "Leche y Fórmula" | "Ropa de Bebé" | "Higiene" | "Accesorios";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  unitPrice: number;
  boxQuantity: number; // e.g., 6 units per box
  minQuantity: number; // e.g., 5 boxes
  imageUrl: string;
}

export const CATEGORIES: Category[] = [
  "Pañales",
  "Leche y Fórmula",
  "Ropa de Bebé",
  "Higiene",
  "Accesorios",
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Pañales Huggies Natural Care M (68u)",
    brand: "Huggies",
    category: "Pañales",
    unitPrice: 5200,
    boxQuantity: 4,
    minQuantity: 5,
    imageUrl: "/regenerated_image_1777484328311.png",
  },
  {
    id: "p2",
    name: "Pañales Pampers Premium Care XG (58u)",
    brand: "Pampers",
    category: "Pañales",
    unitPrice: 6500,
    boxQuantity: 4,
    minQuantity: 5,
    imageUrl: "/regenerated_image_1777484451739.png",
  },
  {
    id: "p3",
    name: "Leche de Fórmula Etapa 1 800g",
    brand: "NutriBaby",
    category: "Leche y Fórmula",
    unitPrice: 12500,
    boxQuantity: 6,
    minQuantity: 3,
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&auto=format&fit=crop&q=80", // using baby bottle or powder img
  },
  {
    id: "p4",
    name: "Leche de Fórmula Etapa 2 Lata 400g",
    brand: "Sancorito",
    category: "Leche y Fórmula",
    unitPrice: 8200,
    boxQuantity: 12,
    minQuantity: 2,
    imageUrl: "https://images.unsplash.com/photo-1555529733-0e67056058ab?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "p5",
    name: "Toallitas Húmedas Aloe (120u)",
    brand: "JohnsonsBaby",
    category: "Higiene",
    unitPrice: 1800,
    boxQuantity: 24,
    minQuantity: 2,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "p6",
    name: "Shampoo Suave Bebé 400ml",
    brand: "JohnsonsBaby",
    category: "Higiene",
    unitPrice: 2400,
    boxQuantity: 12,
    minQuantity: 2,
    imageUrl: "https://images.unsplash.com/photo-1608248593842-886ec00508de?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "p7",
    name: "Óleo Calcáreo 500ml",
    brand: "Estrella",
    category: "Higiene",
    unitPrice: 1950,
    boxQuantity: 12,
    minQuantity: 3,
    imageUrl: "https://images.unsplash.com/photo-1625841443657-3f86eb8c8310?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "p8",
    name: "Bodys Algodón Surtidos (Pack x3)",
    brand: "Gamisé",
    category: "Ropa de Bebé",
    unitPrice: 6500,
    boxQuantity: 1, // unit is 1 pack
    minQuantity: 10,
    imageUrl: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "p9",
    name: "Medias Bebé Algodón (Docena)",
    brand: "Elemento",
    category: "Ropa de Bebé",
    unitPrice: 4800,
    boxQuantity: 12,
    minQuantity: 5,
    imageUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "p10",
    name: "Chupetes Anatómicos (Blister x2)",
    brand: "Aventi",
    category: "Accesorios",
    unitPrice: 4200,
    boxQuantity: 10,
    minQuantity: 2,
    imageUrl: "https://images.unsplash.com/photo-1555529733-0e67056058ab?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "p11",
    name: "Mamadera 240ml Cuello Ancho",
    brand: "Aventi",
    category: "Accesorios",
    unitPrice: 5800,
    boxQuantity: 6,
    minQuantity: 3,
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "p12",
    name: "Mordillo Refrigerante Surtido",
    brand: "Dispita",
    category: "Accesorios",
    unitPrice: 2100,
    boxQuantity: 24,
    minQuantity: 1,
    imageUrl: "https://images.unsplash.com/photo-1596489370836-e8d19d67db91?w=800&auto=format&fit=crop&q=80",
  }
];
