import { ReactNode } from 'react';

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
  size: string;
  addons: { name: string; quantity: number; price: number }[];
}

export interface ICartItem {
  name: string;
  categoryName: string;
  description: string;
  id: number;
  image: string;
  price: number;
  categoryId: number;
  size: { name: string; price: number };
  addons: { name: string; quantity: number; price: number }[];
  coffeeBlend: boolean;
  totalPrice: number;
}

export interface IContext {
  customizeDetails: ICustomizeDetails;
  setCustomizeDetails: React.Dispatch<React.SetStateAction<ICustomizeDetails>>;
  cartItem: ICartItem;
  setCartItem: React.Dispatch<React.SetStateAction<ICartItem>>;
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

interface AddonItem {
  id: number;
  name: string;
  price: number;
}

interface Addon {
  id: number;
  type: string;
  items: AddonItem[];
}

interface Size {
  name: string;
  price: number;
}

export interface Product extends ProductSummary {
  addons: Addon[];
  sizes: Size[];
}
