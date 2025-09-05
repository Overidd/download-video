import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utilidad para unir clases de forma condicional
 * y evitar conflictos de Tailwind.
 */
export const cn = (...inputs: ClassValue[]) => {
   return twMerge(clsx(inputs))
}