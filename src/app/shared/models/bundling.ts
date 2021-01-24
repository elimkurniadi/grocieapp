import { Product } from './product';

export interface Bundling {
  bundling_id?: number;
  name?: string;
  description?: string;
  is_active?: boolean;
  start_date?: Date;
  end_date?: Date;
  image_url?: string;
  products?: Product[];
}
