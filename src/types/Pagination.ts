export interface PaginationFilters {
  page: number;
  limit: number;
  [key: string]: string | number | null; // To allow additional filter properties
}
