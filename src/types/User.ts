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
  fullname: string | null;
  email: string;
  firstname: string | null;
  lastname: string | null;
  phone: string | null;
  isConnected: boolean;
  isArchived: boolean;
  profileUrl: string | null;
  role: {
    id: number;
    label: RoleLabel;
  };
  interests: Interest[];
  likes: string[];
}
