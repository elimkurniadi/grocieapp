export interface Address {
  address?: string;
  address_detail?: string;
  address_id?: string;
  address_name?: string;
  formatted_address?: string;
  city?: {
    name?: string;
  };
  district?: {
    name?: string;
  };
  email?: string;
  is_default?: boolean;
  latitude?: string;
  longitude?: string;
  phone?: string;
  postal_code?: string;
  province?: {
    name?: string;
  };
  receiver_name?: string;
  sub_district?: {
    name?: string;
  };
  sub_district_id?: string;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;
}
