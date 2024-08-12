import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [trainer, setTrainer] = useState(null);
  const [userId, setUserId] = useState(null);
  const [trainerId, setTrainerId] = useState(null); // Added trainerId state

  const loginUser = (userData) => {
    setUser(userData);
    setUserId(userData.id); // Set userId when user logs in
    setAdmin(null);
    setTrainer(null);
    setTrainerId(null); // Clear trainerId on user login
  };

  const logoutUser = () => {
    setUser(null);
    setUserId(null); // Clear userId on logout
  };

  const loginAdmin = (adminData) => {
    setAdmin(adminData);
    setUser(null);
    setTrainer(null);
    setTrainerId(null); // Clear trainerId on admin login
  };

  const logoutAdmin = () => {
    setAdmin(null);
  };

  const loginTrainer = (trainerData) => {
    setTrainer(trainerData);
    setTrainerId(trainerData.id); // Set trainerId when trainer logs in
    setUser(null);
    setAdmin(null);
  };

  const logoutTrainer = () => {
    setTrainer(null);
    setTrainerId(null); // Clear trainerId on logout
  };

  const logout = () => {
    if (user) {
      logoutUser();
    }
    if (admin) {
      logoutAdmin();
    }
    if (trainer) {
      logoutTrainer();
    }
  };

  return (
    <AuthContext.Provider value={{ user, userId, admin, trainer, trainerId, loginUser, logout, loginAdmin, logoutAdmin, loginTrainer, logoutTrainer }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
