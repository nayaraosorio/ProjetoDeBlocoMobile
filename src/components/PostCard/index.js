// src/components/PostCard.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Avatar, Box, Link, IconButton, Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import { useAuth } from '../../AuthContext';

const PostCard = ({
  title,
  description = '',
  date,
  authorName,
  authorImage,
  book,
  authors,
  genre,
  commentsCount,
  likes,
  dislikes,
  onLike,
  onDislike,
  onComment,
}) => {
  const { user } = useAuth();
  const isOwnPost = user?.displayName === authorName;
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Converte o Timestamp para uma data legível
  const formatDate = (timestamp) => {
    if (timestamp && typeof timestamp.toDate === 'function') {
      const dateObj = timestamp.toDate();
      return `${dateObj.toLocaleDateString()} - ${dateObj.toLocaleTimeString()}`;
    }
    return 'Data inválida';
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: '20px auto',
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid #f0f0f0',
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
        <Link
          href="#"
          sx={{
            color: '#dc8239',
            fontWeight: 'bold',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
              color: '#b65e2b',
            },
          }}
        >
          Denunciar
        </Link>
      </Box>
      <CardContent sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Avatar
            src={authorImage}
            alt={authorName || 'Autor desconhecido'}
            sx={{
              width: 56,
              height: 56,
              marginRight: 2,
              backgroundColor: '#dc8239',
              color: '#FEF9F6',
            }}
          >
            {!authorImage && authorName ? authorName.charAt(0).toUpperCase() : 'A'}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
              {authorName || 'Autor desconhecido'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(date)}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h5" component="div" sx={{ marginBottom: 1, fontWeight: 'bold', color: '#333' }}>
          {title}
        </Typography>
        {book && (
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            <strong>Nome do Livro:</strong> {book}
          </Typography>
        )}
        {authors.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            <strong>Autor(es):</strong> {authors.join(', ')}
          </Typography>
        )}
        {genre && (
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            <strong>Gênero:</strong> {genre}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
          {showFullDescription ? description : description.slice(0, 100)}
          {description.length > 100 && (
            <Button onClick={toggleDescription} sx={{ color: '#dc8239' }}>
              {showFullDescription ? 'Ver menos' : 'Ver mais'}
            </Button>
          )}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          <IconButton onClick={onLike}>
            <ThumbUpIcon color="primary" /> {likes}
          </IconButton>
          <IconButton onClick={onComment}>
            <CommentIcon color="primary" /> {commentsCount}
          </IconButton>
          {isOwnPost && (
            <IconButton onClick={onDislike}>
              <ThumbDownIcon color="primary" /> {dislikes}
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  date: PropTypes.object.isRequired, // Espera-se que seja um objeto Timestamp do Firebase
  authorName: PropTypes.string,
  authorImage: PropTypes.string,
  book: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.string),
  genre: PropTypes.string,
  commentsCount: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired,
};

PostCard.defaultProps = {
  authorName: 'Autor desconhecido',
  authorImage: '',
  description: '', // Default value to ensure it's not undefined
  book: '', // Default value for book
  authors: [],
  genre: '',
};

export default PostCard;
