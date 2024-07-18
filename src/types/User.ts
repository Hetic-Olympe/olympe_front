// Enums
export enum RoleLabel {
  USER = "user",
  ADMIN = "admin",
}

// Linked interfaces
export interface SportField {
  id: string;
  label: string;
}

export interface Interest {
  sportField: SportField;
}

// Interface
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

// Query data interface
export interface UsersKpis {
  totalUsers: number;
  totalUsersActive: number;
  totalNewUsers: number;
}

export interface UsersData {
  users: User[];
  totalPages: number;
}

// Mutate data interface
export interface ArchiveUsersData {
  success: string;
}
