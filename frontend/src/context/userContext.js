import React, { createContext, useState, useContext } from 'react';

// Create a context for user data
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    token: '',
  });

  const setUserData = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
