import React, { useMemo, useState, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext, IAuthContext } from '../context/AuthContext';
import { TUser, clearUserData, getUserData, setUserData } from '../utils/auth';

interface LocationState {
  from: { pathname: string };
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<TUser | null>(getUserData);

  const handleLogin = (userData: Partial<TUser>) => {
    setUserData(userData);
    setUser(userData as TUser);
    const origin = (location.state as LocationState)?.from?.pathname || '/dashboard';
    navigate(origin);
  };

  const handleLogout = () => {
    clearUserData();
    setUser(null);
    navigate('/login');
  };

  const value: IAuthContext = useMemo(() => ({
    user,
    token: user?.token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
