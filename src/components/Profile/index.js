// src/components/EditProfileForm.js
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '../Button';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { authFB, firestoreDB } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#dc8239',
    },
  },
});

function EditProfileForm() {
  const [socialLink, setSocialLink] = useState('');
  const [bio, setBio] = useState('');
  const [favoriteAuthors, setFavoriteAuthors] = useState('');
  const [favoriteBooks, setFavoriteBooks] = useState('');
  const [favoriteGenres, setFavoriteGenres] = useState('');

  useEffect(() => {
    const user = authFB.currentUser;
    if (user) {
      const userProfileDocRef = doc(firestoreDB, `users/${user.uid}/profile/profileData`);
      getDoc(userProfileDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setSocialLink(userData.socialLink || '');
          setBio(userData.bio || '');
          setFavoriteAuthors(userData.favoriteAuthors.join(', ') || '');
          setFavoriteBooks(userData.favoriteBooks.join(', ') || '');
          setFavoriteGenres(userData.favoriteGenres.join(', ') || '');
        }
      });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = authFB.currentUser;
    if (user) {
      const userProfileDocRef = doc(firestoreDB, `users/${user.uid}/profile/profileData`);
      try {
        await setDoc(userProfileDocRef, {
          socialLink,
          bio,
          favoriteAuthors: favoriteAuthors.split(',').map(author => author.trim()),
          favoriteBooks: favoriteBooks.split(',').map(book => book.trim()),
          favoriteGenres: favoriteGenres.split(',').map(genre => genre.trim()),
        });
        alert('Perfil atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        alert('Erro ao atualizar perfil. Tente novamente.');
      }
    }
  };

  return (
    <div className='estilo-form'>
      <ThemeProvider theme={theme}>
        <div className="MuiPaper-root">
          <h1 className='title'>Editar Perfil</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-social-link"
              label="Link de Rede Social"
              variant="outlined"
              value={socialLink}
              onChange={(event) => setSocialLink(event.target.value)}
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
              id="outlined-bio"
              label="Bio"
              variant="outlined"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
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
              id="outlined-favorite-authors"
              label="Autores Favoritos"
              variant="outlined"
              value={favoriteAuthors}
              onChange={(event) => setFavoriteAuthors(event.target.value)}
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
              id="outlined-favorite-books"
              label="Livros Favoritos"
              variant="outlined"
              value={favoriteBooks}
              onChange={(event) => setFavoriteBooks(event.target.value)}
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
              id="outlined-favorite-genres"
              label="Gêneros Favoritos"
              variant="outlined"
              value={favoriteGenres}
              onChange={(event) => setFavoriteGenres(event.target.value)}
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

export default EditProfileForm;
