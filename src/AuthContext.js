import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authFB, firestoreDB } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authFB, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(firestoreDB, 'users', currentUser.uid));
        const userData = userDoc.data();
        setIsAuthenticated(true);
        const userWithAvatar = { ...currentUser, avatar: userData?.image };
        console.log('User avatar URL:', userWithAvatar.avatar);
        setUser(userWithAvatar);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(authFB, email, password);
      const userDoc = await getDoc(doc(firestoreDB, 'users', userCredential.user.uid));
      const userData = userDoc.data();
      setIsAuthenticated(true);
      const userWithAvatar = { ...userCredential.user, avatar: userData?.image };
      console.log('User avatar URL:', userWithAvatar.avatar);
      setUser(userWithAvatar);
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(authFB);
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
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
