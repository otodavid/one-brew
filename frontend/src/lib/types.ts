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

export interface ICategories {
  id: number;
  name: string;
  type: string;
  image: string;
}

export interface IProduct {
  id: number;
  name: string;
  categoryName: string;
  description: string;
  image: string;
  price: number;
}

export interface IDetailedProduct extends IProduct {
  categoryId: number;
  sizes: ISizes[];
  addons: IAddons[];
  coffeeBlend: boolean;
}

export interface IProductCard extends IProduct {}

export interface IProductItem extends IProduct {}

interface ISizes {
  name: string;
  price: number;
}

interface IAddons {
  type: string;
  items: [{ name: string; price: number }];
}

export interface ICartItem {
  name: string;
  category: string;
  description: string;
  imageSrc: string;
  price: number;
  size: string;
  addons: IAddons[];
}
