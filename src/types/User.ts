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
  fullname: string | undefined;
  email: string;
  firstname: string | undefined;
  lastname: string | undefined;
  phone: string | undefined;
  isConnected: boolean;
  isArchived: boolean;
  profileUrl: string | undefined;
  role: {
    id: number;
    label: RoleLabel;
  };
  interests: Interest[];
  likes: string[];
}
