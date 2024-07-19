export interface Continent {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  iso: string;
  nicename: string;
  isParticipate: boolean;
  continent: Continent;
}

// Query data interface
export interface CountriesData {
  countries: Country[];
  totalPages: number;
  page: number;
  total: number;
}

// Mutate data interface
export interface ChangeParticipationData {
  success: string;
}
