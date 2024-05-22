import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const zNotNullStringSchema = (field: string) => z.string().nullish().refine(value => value !== null, {
  message: `${field} cannot be null`,
});