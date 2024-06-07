import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '../Button';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { authFB} from '../../firebaseConfig';
import { firestoreDB } from '../../firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore'; 
import {  useNavigate } from 'react-router-dom';
import './SubscribeForm.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#dc8239',
    },
  },
});

function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
  
    try {
      // Criação de usuário com Email e Senha
      const userCredential = await createUserWithEmailAndPassword(authFB, email, password);
      const user = userCredential.user;
      console.log('User registered:', user);
  
      // Informações adicionais salvas no Firestore
      const usersRef = collection(firestoreDB, 'users');
      const newUserDoc = await addDoc(usersRef, {
        uid: user.uid,
        name,
        email,
        image,
        password, 
      });
      console.log('User data saved in Firestore', newUserDoc);
      alert('Cadastro realizado com sucesso!');
      navigate('/')
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Erro ao cadastrar usuário. Tente novamente.');
    }
  };
  

  return (
    <div className='estilo-form'>
      <ThemeProvider theme={theme}>
        <div className="MuiPaper-root">
          <h1 className='title'>Faça Parte do Clube</h1>
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
              id="outlined-image"
              label="Image URL"
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
              id="outlined-password"
              label="Senha"
              variant="outlined"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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
              id="outlined-confirm-password"
              label="Confirmar Senha"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
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
            <Button className='button-form'>Salvar</Button>
          </form>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default Form;
