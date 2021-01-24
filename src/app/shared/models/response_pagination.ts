export interface ResponsePagination {
  code?: number;
  response?: {
    count?: number;
    rows?: any[];
  };
}
