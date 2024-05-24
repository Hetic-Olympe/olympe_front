import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie'

interface AuthDataType {
  username: string | null;
  email: string | null;
  role: string | null;
  token: string | null;
  id: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  user: AuthDataType | null;
  signIn: (username: string, email: string, role: string, token: string, id: string) => void;
  signOut: () => void;
}

const AUTH_COOKIE_KEYS = ['username', 'role', 'token', 'id'];

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {

  const username = Cookies.get('username');
  const email = Cookies.get('email');
  const role = Cookies.get('role');
  const token = Cookies.get('token');
  const id = Cookies.get('id');

  const initialAuthState = useMemo(() => ({
    username: username || null,
    email: email || null,
    role: role || null,
    token: token || null,
    id: id || null,
  }), [username, role, token, id]);


  const [user, setUser] = useState<AuthDataType | null>(initialAuthState.token ? initialAuthState : null);

  const signIn = (username: string, email: string,  role: string, token: string, id: string) => {
    setUser({ username, email, role, token, id });
    AUTH_COOKIE_KEYS.forEach(key => Cookies.set(key, eval(key), { expires: 7, secure: true, sameSite: 'Strict' }));
  };

  const signOut = () => {
    setUser(null);
    AUTH_COOKIE_KEYS.forEach(key => Cookies.remove(key));
  };

  useEffect(() => {
    if (!user && initialAuthState.token) setUser(initialAuthState);
  }, [user, initialAuthState]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, role: user?.role ?? null, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};