import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
var slug = require('slug')

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const priceFormatter= new Intl.NumberFormat("de-DE",{
  style: "currency",
  currency: "EUR"
})

export const slugify = (text: string) => {
  return slug(text);
}
