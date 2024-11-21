import { ReactNode } from 'react';
import { groups } from './constants';

export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

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
export interface CartItem extends ProductSummary {
  size: Size;
  addons: { name: string; quantity: number; price: number }[];
  quantity?: number;
  totalPrice: number;
  cartProductID: string;
}

export interface FormValues {
  [key: string]: {
    group: keyof typeof groups;
    value: string;
  };
}

export interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  country: string;
}

export type UserFields =
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'phone'
  | 'address'
  | 'country'
  | 'province'
  | 'city'
  | 'postalCode';

export interface FormFieldDetails {
  name: UserFields;
  label: string;
}

export type GroupName = (typeof groups)[keyof typeof groups];

export type FormFieldsByGroup = Record<GroupName, FormFieldDetails[]>;

export interface OrderItem {
  userEmail: string;
  orderId: string;
  orderDate: Date;
  products: CartItem[];
  orderAmount: number;
  status: 'pending' | 'completed';
}

export interface OrderDataOptions {
  orderAmount: number;
  order: CartItem[];
  userEmail: string;
  orderId: string;
}
