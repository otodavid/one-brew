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

export const loadLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const saveTolocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (error) {
    console.log(error);
  }
};
