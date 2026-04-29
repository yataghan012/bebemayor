import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

export function getAssetPath(path: string | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const base = import.meta.env.BASE_URL || '/';
  // Remove leading slash from path and trailing slash from base if needed
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${normalizedPath}`;
}
