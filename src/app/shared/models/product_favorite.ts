import { Product } from './product';

export interface ProductFavorite {
  favourite_id?: string;
  quantity?: number;
  created_at?: Date;
  updated_at?: Date;
  product?: Product;
  selected?: boolean;
}
