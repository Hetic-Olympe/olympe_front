import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie'

interface AuthDataType {
  username: string | null;
  role: string | null;
  token: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  auth: AuthDataType | null;
  signIn: (username: string, role: string, token: string) => void;
  signOut: () => void;
}

const AUTH_COOKIE_KEYS = ['username', 'role', 'token'];

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {

  const username = Cookies.get('username');
  const role = Cookies.get('role');
  const token = Cookies.get('token');

  const initialAuthState = useMemo(() => ({
    username: username || null,
    role: role || null,
    token: token || null,
  }), [username, role, token]);


  const [auth, setAuth] = useState<AuthDataType | null>(initialAuthState.token ? initialAuthState : null);

  const signIn = (username: string, role: string, token: string) => {
    setAuth({ username, role, token });
    AUTH_COOKIE_KEYS.forEach(key => Cookies.set(key, eval(key), { expires: 7, secure: true, sameSite: 'Strict' }));
  };

  const signOut = () => {
    setAuth(null);
    AUTH_COOKIE_KEYS.forEach(key => Cookies.remove(key));
  };

  useEffect(() => {
    if (!auth && initialAuthState.token) setAuth(initialAuthState);
  }, [auth, initialAuthState]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!auth, role: auth?.role ?? null, auth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};