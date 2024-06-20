import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authFB, firestoreDB } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authFB, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(firestoreDB, 'users', currentUser.uid));
          const userData = userDoc.exists() ? userDoc.data() : null;
          if (userData) {
            const userWithAvatar = { ...currentUser, avatar: userData.image || '' };
            setUser(userWithAvatar);
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
          } else {
            throw new Error('User data not found');
          }
        } catch (error) {
          console.error('Erro ao obter dados do usuário:', error);
          setAuthError('Erro ao obter dados do usuário.');
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(authFB, email, password);
      const userDoc = await getDoc(doc(firestoreDB, 'users', userCredential.user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;
      if (userData) {
        const userWithAvatar = { ...userCredential.user, avatar: userData.image || '' };
        setUser(userWithAvatar);
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      setAuthError('Falha ao fazer login. Verifique suas credenciais e tente novamente.');
      console.error('Falha ao fazer login:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      await signOut(authFB);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
    } catch (error) {
      setAuthError('Falha ao fazer logout. Tente novamente.');
      console.error('Falha ao fazer logout:', error);
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
