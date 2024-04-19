import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  auth: { username: string; role: string; token: string } | null;
  signIn: (username: string, password: string, role: string) => void;
  signOut: () => void;
}

// Create the authentication context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the authentication provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<{ username: string; role: string; token: string } | null>(null);

  const signIn = (username: string, password: string, role: string) => {
    // Simulate a successful authentication
    setAuth({ username, role, token: 'fake-jwt-token' });
  };

  const signOut = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};