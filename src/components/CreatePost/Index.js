import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../AuthContext';
import { firestoreDB } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Box } from '@mui/system';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const theme = createTheme({
  palette: {
    primary: {
      main: '#dc8239',
    },
  },
});

const genres = [
  "Ação",
  "Aventura",
  "Biografia",
  "Comédia",
  "Drama",
  "Fantasia",
  "Ficção Científica",
  "Mistério",
  "Romance",
  "Suspense",
  "Terror"
];

const CreatePostPopup = () => {
  const { user } = useAuth();

  if (!user) {
    return <Alert severity="warning">Você precisa estar autenticado para criar uma postagem.</Alert>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        overflowY: 'auto',
        position: 'relative',
        padding: '40px',
        width: 'auto',
      }}
    >
      <PopupWithTrigger buttonLabel="Faça sua Postagem" />
    </Box>
  );
};

const PopupWithTrigger = ({ buttonLabel }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [book, setBook] = useState('');
  const [authors, setAuthors] = useState('');
  const [genre, setGenre] = useState('');
  const [subject, setSubject] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      await addDoc(collection(firestoreDB, 'posts'), {
        title,
        book,
        authors: authors.split(',').map((author) => author.trim()),
        genre,
        subject,
        authorUID: user.uid,
        authorName: user.displayName || user.email,
        authorImage: user.photoURL || '',
        createdAt: serverTimestamp(),
      });

      resetForm();
      alert('Publicação adicionada com sucesso!');
      handleClose();
    } catch (error) {
      console.error('Erro ao adicionar publicação ao Firestore:', error);
      setError('Erro ao adicionar publicação. Tente novamente.');
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      setError('Título é obrigatório');
      return false;
    }

    if (!book.trim()) {
      setError('Nome do livro é obrigatório');
      return false;
    }

    if (subject.length > 500) {
      setError('Assunto deve ter no máximo 500 caracteres');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setTitle('');
    setBook('');
    setAuthors('');
    setGenre('');
    setSubject('');
  };

  return (
    <div>
      <Button
        type="button"
        onClick={handleClickOpen}
        variant="contained"
        sx={{
          backgroundColor: '#dc8239',
          color: '#FEF9F6',
          '&:hover': {
            backgroundColor: '#b65e2b',
          },
        }}
      >
        {buttonLabel}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Faça sua Postagem</DialogTitle>
        <DialogContent>
          <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-title"
                label="Título da Postagem"
                variant="outlined"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#dc8239' } }}
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#dc8239' },
                      '&:hover fieldset': { borderColor: '#dc8239' },
                      '&.Mui-focused fieldset': { borderColor: '#dc8239' },
                    },
                    '& .MuiOutlinedInput-input': { color: '#dc8239' },
                  },
                }}
              />
              <TextField
                id="outlined-book"
                label="Livro"
                variant="outlined"
                value={book}
                onChange={(event) => setBook(event.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#dc8239' } }}
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#dc8239' },
                      '&:hover fieldset': { borderColor: '#dc8239' },
                      '&.Mui-focused fieldset': { borderColor: '#dc8239' },
                    },
                    '& .MuiOutlinedInput-input': { color: '#dc8239' },
                  },
                }}
              />
              <TextField
                id="outlined-authors"
                label="Autor(es) - Separados por vírgula"
                variant="outlined"
                value={authors}
                onChange={(event) => setAuthors(event.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#dc8239' } }}
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#dc8239' },
                      '&:hover fieldset': { borderColor: '#dc8239' },
                      '&.Mui-focused fieldset': { borderColor: '#dc8239' },
                    },
                    '& .MuiOutlinedInput-input': { color: '#dc8239' },
                  },
                }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="genre-label" style={{ color: '#dc8239' }}>Gênero Literário</InputLabel>
                <Select
                  labelId="genre-label"
                  id="genre"
                  value={genre}
                  onChange={(event) => setGenre(event.target.value)}
                  label="Gênero Literário"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#dc8239' },
                      '&:hover fieldset': { borderColor: '#dc8239' },
                      '&.Mui-focused fieldset': { borderColor: '#dc8239' },
                    },
                    '& .MuiOutlinedInput-input': { color: '#dc8239' },
                  }}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="outlined-subject"
                label="Assunto"
                variant="outlined"
                value={subject}
                onChange={(event) => {
                  if (event.target.value.length <= 500) {
                    setSubject(event.target.value);
                  }
                }}
                multiline
                minRows={4}
                maxRows={8}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#dc8239' } }}
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#dc8239' },
                      '&:hover fieldset': { borderColor: '#dc8239' },
                      '&.Mui-focused fieldset': { borderColor: '#dc8239' },
                    },
                    '& .MuiOutlinedInput-input': { color: '#dc8239' },
                  },
                  inputProps: {
                    maxLength: 500,
                  },
                }}
              />
              {error && <Alert severity="error">{error}</Alert>}
            </form>
          </ThemeProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#dc8239',
              color: '#FEF9F6',
              '&:hover': { backgroundColor: '#b65e2b' },
            }}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PopupWithTrigger.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default CreatePostPopup;
