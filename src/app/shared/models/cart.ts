import { Product } from './product';

export interface Cart {
  cart_id?: string;
  local_subtotal_price?: string;
  quantity?: string;
  product?: Product;
  created_at?: Date;
}
