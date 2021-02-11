export interface Voucher {
  voucher_id?: string;
  voucher_code?: string;
  value?: string;
  type?: string;
  percentage_limit?: string;
  quota?: number;
  description?: string;
  image_url?: string;
  start_date?: Date;
  end_date?: Date;
}
