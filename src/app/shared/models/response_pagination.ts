export interface ResponsePagination {
  code?: number;
  response?: {
    image_url?: string;
    count?: number;
    rows?: any[];
  };
}
