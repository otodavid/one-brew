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

export const handleProductSizeVolume = (size: string) => {
  let volume;

  switch (size.toLowerCase()) {
    case 'small':
      volume = '250ml';
      break;
    case 'medium':
      volume = '350ml';
      break;
    case 'large':
      volume = '550ml';
      break;
  }

  return volume;
};
