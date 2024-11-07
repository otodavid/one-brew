import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CartItemProps } from './types';

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

export const getTotalAmount = (cart: CartItemProps[]): number => {
  const total = cart.reduce(
    (accumulator, item) => accumulator + item.totalPrice,
    0
  );
  return parseFloat(total.toFixed(2));
};
