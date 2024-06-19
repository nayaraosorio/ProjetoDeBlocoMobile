// src/components/PostCard.js
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Avatar, Box, Link, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import { useAuth } from '../../AuthContext';

const PostCard = ({
  title,
  description,
  date,
  authorName,
  authorImage,
  keywords,
  commentsCount,
  likes,
  dislikes,
  onLike,
  onDislike,
  onComment,
}) => {
  const { user } = useAuth();
  const isOwnPost = user?.displayName === authorName;

  const handleLike = () => {
    if (user) {
      onLike();
    } else {
      alert('Você precisa estar logado para curtir.');
    }
  };

  const handleDislike = () => {
    if (user) {
      onDislike();
    } else {
      alert('Você precisa estar logado para descurtir.');
    }
  };

  const handleComment = () => {
    if (user) {
      onComment();
    } else {
      alert('Você precisa estar logado para comentar.');
    }
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
              {new Date(date).toLocaleDateString()} - {new Date(date).toLocaleTimeString()}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h5" component="div" sx={{ marginBottom: 1, fontWeight: 'bold', color: '#333' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
          {description.length > 100 ? `${description.slice(0, 100)}...` : description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ marginRight: 1 }}>
            <strong>Palavras chave:</strong> {keywords.join(', ')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          <IconButton onClick={handleLike}>
            <ThumbUpIcon color="primary" /> {likes}
          </IconButton>
          <IconButton onClick={handleComment}>
            <CommentIcon color="primary" /> {commentsCount}
          </IconButton>
          {isOwnPost && (
            <IconButton onClick={handleDislike}>
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
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  authorName: PropTypes.string,
  authorImage: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
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
};

export default PostCard;
