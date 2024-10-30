import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(s: string | undefined) {
  return s && String(s[0]).toUpperCase() + String(s).slice(1);
}
