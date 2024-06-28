export enum RoleLabel {
  USER = "user",
  ADMIN = "admin",
}
export interface SportField {
  id: string;
  label: string;
}

export interface Interest {
  sportField: SportField;
}

export interface User {
  id: string;
  createdAt: string;
  nicename: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  isConnected: boolean;
  role: {
    id: number;
    label: RoleLabel;
  };
  interests: Interest[];
  likes: string[];
}
