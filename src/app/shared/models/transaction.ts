import { Address } from './address';
import { PaymentMethod } from './payment_method';
import { Product } from './product';

export interface Transaction {
  transaction_id?: string;
  transaction_code?: string;
  transaction_status?: {
    transaction_status_id?: number;
    name?: string;
  };
  address?: Address;
  address_id?: string;
  cod_payment_amount?: string;
  delivered_date?: Date;
  expired_date?: Date;
  notes?: string;
  original_price?: string;
  payment_bank?: string;
  payment_image?: string;
  payment_method_id?: string;
  payment_method?: PaymentMethod;
  payment_name?: string;
  payment_status?: string;
  payment_url?: string;
  product_discount?: string;
  products?: Product[];
  total_price?: string;
  shipping_date?: string;
  shipping_receipt?: string;
  shipping_time?: string;
  total_weight?: number;
  voucher_discount?: string;
  voucher_code?: string;
  created_at?: Date;
  updated_at?: Date;
  service_fee?: string;
  delivery_fee?: string;
}
