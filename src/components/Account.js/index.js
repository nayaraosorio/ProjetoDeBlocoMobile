import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { updateEmail, updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { firestoreDB } from '../../firebaseConfig';
import TextField from '@mui/material/TextField';
import Button from '../Button';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { getAuth } from 'firebase/auth';
import "./Account.css";

const theme = createTheme({
  palette: {
    primary: {
      main: '#dc8239',
    },
  },
});

function Account() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setName(user.displayName || '');
        setEmail(user.email || '');
        setImage(user.photoURL || '');

        // Fetch additional user data from Firestore
        const userDoc = await getDoc(doc(firestoreDB, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name || '');
          setEmail(userData.email || '');
          setImage(userData.image || '');
        }
      }
    };

    fetchUserData();
  }, [user]);

  const auth = getAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email !== user.email) {
        await updateEmail(auth.currentUser, email);
      }

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image,
      });

      const userRef = doc(firestoreDB, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        await updateDoc(userRef, { name, email, image });
      } else {
        await setDoc(userRef, { name, email, image });
      }

      if (currentPassword && newPassword && confirmNewPassword) {
        if (newPassword !== confirmNewPassword) {
          alert('As senhas não coincidem. Tente novamente.');
          return;
        }

        // Reautenticar o usuário antes de atualizar a senha
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, newPassword);
      }

      alert('Informações atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar informações do usuário:', error);
      alert('Erro ao atualizar informações do usuário. Tente novamente.');
    }
  };

  return (
    <div className='account-container'>
      <ThemeProvider theme={theme}>
        <div className="MuiPaper-root">
          <h1 className='title'>Minha Conta</h1>
          {user ? (
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-name"
                label="Nome"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#dc8239' } }}
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#dc8239',
                      },
                      '&:hover fieldset': {
                        borderColor: '#dc8239',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#dc8239',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#dc8239',
                    },
                  },
                }}
              />
              <TextField
                id="outlined-email"
                label="E-mail"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#dc8239' } }}
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#dc8239',
                      },
                      '&:hover fieldset': {
                        borderColor: '#dc8239',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#dc8239',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#dc8239',
                    },
                  },
                }}
              />
              <TextField
                id="outlined-image"
                label="URL da Imagem"
                variant="outlined"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#dc8239' } }}
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#dc8239',
                      },
                      '&:hover fieldset': {
                        borderColor: '#dc8239',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#dc8239',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#dc8239',
                    },
                  },
                }}
              />
              <TextField
                id="outlined-current-password"
                label="Senha Atual"
                variant="outlined"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#dc8239' } }}
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#dc8239',
                      },
                      '&:hover fieldset': {
                        borderColor: '#dc8239',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#dc8239',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#dc8239',
                    },
                  },
                }}
              />
              <TextField
                id="outlined-new-password"
                label="Nova Senha"
                variant="outlined"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#dc8239' } }}
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#dc8239',
                      },
                      '&:hover fieldset': {
                        borderColor: '#dc8239',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#dc8239',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#dc8239',
                    },
                  },
                }}
              />
              <TextField
                id="outlined-confirm-new-password"
                label="Confirmar Nova Senha"
                variant="outlined"
                type="password"
                value={confirmNewPassword}
                onChange={(event) => setConfirmNewPassword(event.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#dc8239' } }}
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#dc8239',
                      },
                      '&:hover fieldset': {
                        borderColor: '#dc8239',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#dc8239',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#dc8239',
                    },
                  },
                }}
              />
              <Button className='button-form' type="submit">Salvar Alterações</Button>
            </form>
          ) : (
            <p>Carregando informações do usuário...</p>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
}

export default Account;
