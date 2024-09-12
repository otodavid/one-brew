import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeData(text: string) {
  return text.replaceAll('-', ' ');
}

export function convertToLink(text: string) {
  return text.replaceAll(' ', '-').toLowerCase();
}
