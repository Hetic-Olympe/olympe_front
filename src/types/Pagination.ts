export interface BasicFilters {
  page: number;
  limit: number;
  sorts: string | null;
  [key: string]: string | number | null; // To allow additional filter properties
}
