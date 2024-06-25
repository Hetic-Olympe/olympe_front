import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const zNotNullStringSchema = (field: string) => z.string().nullish().refine(value => value !== null, {
  message: `${field} cannot be null`,
});

export const getCurrentDateInTimeZone = (timeZone: string) => {
  return new Date().toLocaleDateString('fr-FR', { timeZone });
}

export const formatDate = (date: Date, options: Intl.DateTimeFormatOptions, locale: string = 'en-US') => {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export const isToday = (date: Date, timeZone: string) => {
  return date.toLocaleDateString('fr-FR', { timeZone }) === getCurrentDateInTimeZone(timeZone);
}

export const formatTime = (date: Date, options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true }, locale: string = 'en-US') => {
  return date.toLocaleTimeString(locale, options);
}