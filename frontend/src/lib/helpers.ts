import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToText(text: string) {
  return text.replaceAll('-', ' ').toLowerCase();
}

export function convertToLink(text: string) {
  return text.replaceAll(' ', '-').toLowerCase();
}