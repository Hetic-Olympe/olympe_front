export interface Country {
  nicename: string;
  iso: string;
}

export interface AthleteSport {
  id: number;
  name: string;
}

export interface Athlete {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  pictureProfile: string;
  country: Country;
  athleteSports: AthleteSport;
}
