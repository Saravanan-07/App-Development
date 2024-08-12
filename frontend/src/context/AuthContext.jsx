import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [userId, setUserId] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
    setUserId(userData.id); // Set userId when user logs in
    setAdmin(null);
  };

  const logoutUser = () => {
    setUser(null);
    setUserId(null); // Clear userId on logout
  };

  const loginAdmin = (adminData) => {
    setAdmin(adminData);
    setUser(null);
  };

  const logoutAdmin = () => {
    setAdmin(null);
  };

  const logout = () => {
    if (user) {
      logoutUser();
    }
    if (admin) {
      logoutAdmin();
    }
  };

  return (
    <AuthContext.Provider value={{ user, userId, admin, loginUser, logout, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
