import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CartItem } from './types';

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

export const getTotalAmount = (cart: CartItem[]): number => {
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

export const clearlocalStorage = () => {
  try {
    localStorage.removeItem('cart');
  } catch (error) {
    console.log(error);
  }
};

export const getFormattedTime = (date: Date) => {
  const newDate = new Date(date);

  // Format date as "YYYY-MM-DD"
  return newDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getFormattedDate = (date: Date) => {
  const newDate = new Date(date);

  return newDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
