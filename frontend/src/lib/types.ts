import { ReactNode } from 'react';
import { groups } from './constants';

export interface FocusTrapProps {
  isComponentOpen: boolean;
  closeComponent: () => void;
  trigger: HTMLButtonElement | HTMLAnchorElement | null;
}

export interface PopOverProps extends FocusTrapProps {
  className: string;
  children: ReactNode;
  portalId?: string;
}

export interface ICustomizeDetails {
  size: { name: string; price: number };
  addons: { name: string; quantity: number; price: number }[];
}

export interface ICategoryItem {
  id: number;
  name: string;
  image: string;
  type: string;
}

export interface ICategories {
  drinks: ICategoryItem[];
  food: ICategoryItem[];
}

export interface ProductSummary {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryName: string;
  categoryType: string;
}

export interface Categories {
  id: string;
  name: string;
  type: string;
  image: string;
}

export interface AddonItem {
  id: number;
  name: string;
  price: number;
}

export interface Addon {
  id: number;
  type: string;
  items: AddonItem[];
}

export interface Size {
  name: string;
  price: number;
}

export interface Product extends ProductSummary {
  addons: Addon[];
  sizes: Size[];
}
export interface CartItemProps extends ProductSummary {
  size: Size;
  addons: { name: string; quantity: number; price: number }[];
  quantity?: number;
  totalPrice: number;
}

export interface IContext {
  customizeDetails: ICustomizeDetails;
  setCustomizeDetails: React.Dispatch<React.SetStateAction<ICustomizeDetails>>;
  cartItem: CartItemProps;
  setCartItem: React.Dispatch<React.SetStateAction<CartItemProps>>;
}

export interface FormValues {
  [key: string]: {
    group: keyof typeof groups;
    value: string;
  };
}
