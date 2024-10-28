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
  sizes: Size[]
}
