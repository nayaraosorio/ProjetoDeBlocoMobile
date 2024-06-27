import './Login.css';
import Button from '../Button';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authFB } from '../../firebaseConfig';
import SubscribeModal from '../SubscribeModal';
import Alert from '@mui/material/Alert';

const theme = createTheme({
  palette: {
    primary: {
      main: '#dc8239',
    },
  },
});

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    signInWithEmailAndPassword(authFB, email, password)
      .then((userCredential) => {
        setLoading(false);
        const user = userCredential.user;
        console.log('User logged in:', user);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        setError('Erro ao logar. Tente novamente.');
        console.error('Error logging in:', error);
      });
  };

  const handleOpenSubscribeModal = () => {
    setSubscribeModalOpen(true);
  };

  const handleCloseSubscribeModal = () => {
    setSubscribeModalOpen(false);
  };

  return (
    <div className='estilo-form'>
      <ThemeProvider theme={theme}>
        <div className="MuiPaper-root">
          <h1 className='title'>Login</h1>
          <form onSubmit={handleSignIn}>
            <TextField
              id="email"
              label="E-mail"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              id="password"
              label="Senha"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? <CircularProgress /> : <Button type="submit">Entrar</Button>}
          </form>

          {error && <Alert severity="error" className="MuiAlert-message">{error}</Alert>}

          <p style={{ padding: '5px 0' }}>
            Não possui conta? <span onClick={handleOpenSubscribeModal} style={{ fontWeight: 'bold', cursor: 'pointer', color: '#dc8239' }}>Novo Cadastro</span>
          </p>
          <p style={{ padding: '5px 0' }}>
            Esqueceu a senha? <Link to="/" style={{ fontWeight: 'bold', color: '#dc8239' }}>Clique Aqui</Link>
          </p>
        </div>
      </ThemeProvider>

      <SubscribeModal open={isSubscribeModalOpen} onClose={handleCloseSubscribeModal} />
    </div>
  );
}

export default LoginPage;
