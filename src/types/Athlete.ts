export enum SportFieldEnum {
  ATH = "Athletics",
  SWI = "Swimming",
  GYM = "Gymnastics",
  FBL = "Football",
  BKB = "Basketball",
  TEN = "Tennis",
  VOL = "Volleyball",
  FHK = "Field hockey",
  RUG = "Rugby sevens",
  CYC = "Cycling",
  BOX = "Boxing",
  FEN = "Fencing",
  JUD = "Judo",
  TKW = "Taekwondo",
  WRE = "Wrestling",
  SHO = "Shooting",
  SAL = "Sailing",
  EQS = "Equestrian",
  CAN = "Canoeing",
  ROW = "Rowing",
  BAD = "Badminton",
  BSB = "Baseball",
  SFT = "Softball",
  ARC = "Archery",
  MOD = "Modern pentathlon",
  TRI = "Triathlon",
  SYN = "Synchronized swimming",
  DIV = "Diving",
  WLT = "Weightlifting",
  HBL = "Handball",
  GLF = "Golf",
  RBU = "Rugby union",
  SCL = "Sport climbing",
  SKB = "Skateboarding",
  SUR = "Surfing",
}
export const sportItems = Object.entries(SportFieldEnum).map(
  ([key, value]) => ({
    label: value,
    value: key.toLowerCase(),
  })
);
export interface Country {
  nicename: string;
  iso: string;
}

export interface Sport {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  gender: "M" | "F";
  isTeam: boolean;
  sportFieldId?: number | null;
  label: string;
  sportField: SportField;
}
export interface AthleteSport {
  id: number;
  athleteId?: string | null;
  sportId?: number | null;
  medalTypeType?: number | null;
  createdAt: Date;
  updatedAt: Date;
  sport: Sport;
}

export interface SportField {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  label: SportFieldEnum;
}

export interface Athlete {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  pictureProfile: string;
  country: Country;
  sportField: string;
  athleteSports?: AthleteSport;
}
