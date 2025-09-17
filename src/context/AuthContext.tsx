import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  skipAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Login attempt:', email);

      // 简单的模拟登入验证
      if (email && password.length >= 6) {
        setUser({ email, name: email.split('@')[0] });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      console.log('Registration attempt:', userData);

      // 简单的模拟注册验证
      if (userData.email && userData.password && userData.name) {
        setUser({
          email: userData.email,
          name: userData.name,
          phone: userData.phone
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const skipAuth = () => {
    setUser({ email: 'guest@demo.com', name: '访客用户' });
    setIsAuthenticated(true);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    skipAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};