import React, { createContext, useState, useContext, ReactNode } from 'react';
interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  auth: { username: string; role: string; token: string } | null;
  signIn: (username: string, role: string, token: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  // Initialize auth state from localStorage
  const storedAuth = localStorage.getItem('auth');
  const initialAuthState = storedAuth ? JSON.parse(storedAuth) : null;
  const [auth, setAuth] = useState<{ username: string; role: string; token: string } | null>(initialAuthState);

  const signIn = (username: string, role: string, token: string) => {
    const newAuth = { username, role, token };
    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
  };

  const signOut = () => {
    setAuth(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: auth !== null, role: auth?.role ?? null, auth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};