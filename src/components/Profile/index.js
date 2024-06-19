import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '../Button';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { authFB, firestoreDB } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


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
  const [favoriteAuthors, setFavoriteAuthors] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newBook, setNewBook] = useState('');
  const [newGenre, setNewGenre] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const user = authFB.currentUser;
    if (user) {
      const userProfileDocRef = doc(firestoreDB, `users/${user.uid}/profile/profileData`);
      getDoc(userProfileDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setSocialLink(userData.socialLink || '');
          setBio(userData.bio || '');
          setFavoriteAuthors(userData.favoriteAuthors || []);
          setFavoriteBooks(userData.favoriteBooks || []);
          setFavoriteGenres(userData.favoriteGenres || []);
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
          favoriteAuthors,
          favoriteBooks,
          favoriteGenres,
        });
        // Mostrar alerta apenas após o sucesso do setDoc
        setShowAlert(true);
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        alert('Erro ao atualizar perfil. Tente novamente.');
      }
    }
  };

  const handleAddAuthor = (author) => {
    setFavoriteAuthors((prevAuthors) => [...prevAuthors, author]);
    setNewAuthor(''); // limpar o campo de texto após adicionar o autor
  };

  const handleRemoveAuthor = (author) => {
    setFavoriteAuthors((prevAuthors) => prevAuthors.filter((a) => a !== author));
  };

  const handleAddBook = (book) => {
    setFavoriteBooks((prevBooks) => [...prevBooks, book]);
    setNewBook(''); // limpar o campo de texto após adicionar o livro
  };

  const handleRemoveBook = (book) => {
    setFavoriteBooks((prevBooks) => prevBooks.filter((b) => b !== book));
  };

  const handleAddGenre = (genre) => {
    setFavoriteGenres((prevGenres) => [...prevGenres, genre]);
    setNewGenre(''); // limpar o campo de texto após adicionar o gênero
  };

  const handleRemoveGenre = (genre) => {
    setFavoriteGenres((prevGenres) => prevGenres.filter((g) => g !== genre));
  };

  return (
    <div className='estilo-form'>
      <ThemeProvider theme={theme}>
        <div className="MuiPaper-root">
          <h1 className='title'>Editar Perfil</h1>
          <form onSubmit={handleSubmit}>
            
          <TextField
              id="outlined-bio"
              label="Bio"
              variant="outlined"
              value={bio}
              onChange={(event) => {
                if (event.target.value.length <= 500) {
                  setBio(event.target.value);
                }
              }}
              multiline
              rows={4}
              maxRows={8}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: '#dc8239' } }}
              InputProps={{
                sx: {
                  '&.MuiOutlinedInput-root': {
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
                  '&.MuiOutlinedInput-input': {
                    color: '#dc8239',
                  },
                },
                inputProps: {
                  maxLength: 500,
                },
              }}
            />
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
                  '&.MuiOutlinedInput-root': {
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
                  '&.MuiOutlinedInput-input': {
                    color: '#dc8239',
                  },
                },
              }}
            />
            <Stack direction="column" spacing={1} style={{ marginBottom: '20px' }}>
  <div>
    {favoriteAuthors.map((author, index) => (
      <Chip
        key={index}
        label={author}
        onDelete={() => handleRemoveAuthor(author)}
        variant="outlined"
        sx={{ bgcolor: '#fedcd2', color: '#dc8239', marginBottom: '5px' }}
      />
    ))}
  </div>
  <TextField
    id="outlined-new-author"
    label="Adicionar Autor Favorito"
    variant="outlined"
    value={newAuthor}
    onChange={(e) => setNewAuthor(e.target.value)}
    fullWidth
    InputLabelProps={{ style: { color: '#dc8239' } }}
    InputProps={{
      sx: {
        '&.MuiOutlinedInput-root': {
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
        '&.MuiOutlinedInput-input': {
          color: '#dc8239',
        },
      },
    }}
    onKeyPress={(e) => {
      if (e.key === 'Enter') {
        handleAddAuthor(newAuthor);
      }
    }}
  />
</Stack>

<Stack direction="column" spacing={1} style={{ marginBottom: '20px' }}>
  <div>
    {favoriteBooks.map((book, index) => (
      <Chip
        key={index}
        label={book}
        onDelete={() => handleRemoveBook(book)}
        variant="outlined"
        sx={{ bgcolor: '#fedcd2', color: '#dc8239', marginBottom: '5px' }}
      />
    ))}
  </div>
  <TextField
    id="outlined-new-book"
    label="Adicionar Livro Favorito"
    variant="outlined"
    value={newBook}
    onChange={(e) => setNewBook(e.target.value)}
    fullWidth
    InputLabelProps={{ style: { color: '#dc8239' } }}
    InputProps={{
      sx: {
        '&.MuiOutlinedInput-root': {
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
        '&.MuiOutlinedInput-input': {
          color: '#dc8239',
        },
      },
    }}
    onKeyPress={(e) => {
      if (e.key === 'Enter') {
        handleAddBook(newBook);
      }
    }}
  />
</Stack>

<Stack direction="column" spacing={1} style={{ marginBottom: '20px' }}>
  <div>
    {favoriteGenres.map((genre, index) => (
      <Chip
        key={index}
        label={genre}
        onDelete={() => handleRemoveGenre(genre)}
        variant="outlined"
        sx={{ bgcolor: '#fedcd2', color: '#dc8239', marginBottom: '5px' }}
      />
    ))}
  </div>
  <TextField
    id="outlined-new-genre"
    label="Adicionar Gênero Literário"
    variant="outlined"
    value={newGenre}
    onChange={(e) => setNewGenre(e.target.value)}
    fullWidth
    InputLabelProps={{ style: { color: '#dc8239' } }}
    InputProps={{
      sx: {
        '&.MuiOutlinedInput-root': {
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
        '&.MuiOutlinedInput-input': {
          color: '#dc8239',
        },
      },
    }}
    onKeyPress={(e) => {
      if (e.key === 'Enter') {
        handleAddGenre(newGenre);
      }
    }}
  />
</Stack>

            <Button className='button-form' type="submit">Salvar</Button>
          </form>
          {showAlert && (
            <div style={{ marginTop: '10px', color: 'green' }}>Perfil atualizado com sucesso!</div>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
}

export default EditProfileForm;
