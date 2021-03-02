export interface PaymentSummary {
  final_price?: number;
  original_price?: number;
  saved_price?: number;
  service_fee?: number;
  delivery_fee?: number;
  discount?: number;
  raw_price?: number;
  voucher_error?: any;
}
