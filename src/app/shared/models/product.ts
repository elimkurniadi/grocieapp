import { Unit } from './unit';

export interface Product {
  product_id?: number;
  brand? : {
    brand_id : string,
    name: string
  },
  name?: string;
  description?: string;
  weight?: string;
  price?: string;
  discounted_price?: string;
  primary_price?: string;
  secondary_price?: string;
  image_url?: string;
  brand_id?: number;
  category_id?: number;
  unit?: Unit;
}
