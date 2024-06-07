import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [user, setUser] = useState({ username: '' });

 const login = (username, password) => {
     setIsAuthenticated(true);
     setUser({ username, password });
 };

 const logout = () => {
     setIsAuthenticated(false);
     setUser({ username: '' });
 };

 return (
     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
       {children}
     </AuthContext.Provider>
 );
};

export const useAuth = () => {
 return useContext(AuthContext);
};
