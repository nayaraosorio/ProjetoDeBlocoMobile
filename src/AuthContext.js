// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authFB, firestoreDB } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Adicionado estado de carregamento
  const [authError, setAuthError] = useState(null); // Estado para armazenar erros de autenticação

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authFB, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(firestoreDB, 'users', currentUser.uid));
        const userData = userDoc.data();
        const userWithAvatar = { ...currentUser, avatar: userData?.image };
        setUser(userWithAvatar);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false); // Atualizar o estado de carregamento
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(authFB, email, password);
      const userDoc = await getDoc(doc(firestoreDB, 'users', userCredential.user.uid));
      const userData = userDoc.data();
      const userWithAvatar = { ...userCredential.user, avatar: userData?.image };
      setUser(userWithAvatar);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } catch (error) {
      setAuthError('Falha ao fazer login. Verifique suas credenciais e tente novamente.');
      console.error('Failed to login:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(authFB);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
    } catch (error) {
      setAuthError('Falha ao fazer logout. Tente novamente.');
      console.error('Failed to logout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, authError, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
