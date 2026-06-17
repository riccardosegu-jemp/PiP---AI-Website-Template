import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * cn() — unisce classi Tailwind condizionali risolvendo i conflitti.
 * clsx gestisce condizioni/array; twMerge fa vincere l'ultima classe in caso
 * di conflitto (es. cn("p-2", "p-4") → "p-4"). Usata in tutti i componenti UI.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
