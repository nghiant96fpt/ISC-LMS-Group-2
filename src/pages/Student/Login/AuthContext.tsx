import React, { createContext, ReactNode, useEffect, useState } from 'react';
import createAxiosInstance from '../../../utils/axiosInstance';
import { Cookies, useCookies } from 'react-cookie';

interface AuthContextType {
  role: number | null;
  loading: boolean;
  setRole: (role: number | null) => void
}

export const AuthContext = createContext<AuthContextType>({
  role: null,
  loading: true,
  setRole: () => {}
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const axiosInstance = createAxiosInstance(true);

  useEffect(() => {
    axiosInstance
      .get('api/auth/verify-token')
      .then((response) => {
        setRole(response?.data?.data?.roleId);
      })
      .catch((err) => {
        console.error('Lấy quyền thất bại', err);
        setRole(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <AuthContext.Provider value={{ role, loading, setRole }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
