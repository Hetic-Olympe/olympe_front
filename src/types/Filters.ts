export interface BasicFilters {
  page: number;
  limit: number;
  sorts: string | null;
  [key: string]: string | number | null; // To allow additional filter properties
}

export interface CountryFilters extends BasicFilters {
  name: string | null;
  continentId: string | null;
  isParticipate: string | null;
}

export interface UserFilters extends BasicFilters {
  fullname: string | null;
  roleId: string | null;
  isConnected: string | null;
}
