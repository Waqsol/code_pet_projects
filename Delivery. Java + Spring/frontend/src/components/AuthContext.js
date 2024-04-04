import React, { createContext, useState } from 'react';
import UsersService from '../services/UsersService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const id1 = localStorage.getItem("UserId");

  const login = async () => {
    const userFromBackend = await getUser();
  };
  
  const getUser = async () => {
    try {
      const response = await UsersService.getUser(id1);
      const userData = response.data;
      setUser(userData);
      return userData;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;