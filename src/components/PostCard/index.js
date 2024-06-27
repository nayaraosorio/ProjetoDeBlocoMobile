import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Avatar, Box, Link, IconButton, Button, Modal, TextareaAutosize } from '@mui/material';
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
  commentsCount,
  likes,
  dislikes,
  onLike,
  onDislike,
  onComment,
}) => {
  const { user } = useAuth();
  const isOwnPost = user?.uid === authorName;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [reportOpen, setReportOpen] = useState(false); // Estado para controlar o modal de denúncia

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

  const handleReport = () => {
    setReportOpen(true);
  };

  const handleCloseReport = () => {
    setReportOpen(false);
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
          onClick={handleReport}
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
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
          Livro: {book}
        </Typography>
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
          <IconButton onClick={onDislike}>
            <ThumbDownIcon color="primary" />
          </IconButton>
          {isOwnPost && (
            <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 1 }}>
              {dislikes} {dislikes === 1 ? 'dislike' : 'dislikes'}
            </Typography>
          )}
        </Box>
      </CardContent>

      <Modal
        open={reportOpen}
        onClose={handleCloseReport}
        className="report-modal"
        aria-labelledby="report-modal-title"
        aria-describedby="report-modal-description"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 4, backgroundColor: 'white', borderRadius: 1 }}>
          <Typography id="report-modal-title" variant="h6" component="h2">
            Denunciar Postagem
          </Typography>
          <TextareaAutosize
            minRows={3}
            placeholder="Explique o motivo da denúncia"
            style={{ width: '100%' }}
            id="report-modal-description"
          />
          <Button onClick={handleCloseReport} variant="contained" color="primary">
            Enviar
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  date: PropTypes.object.isRequired,
  authorName: PropTypes.string,
  authorImage: PropTypes.string,
  book: PropTypes.string.isRequired,
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
  description: '',
};

export default PostCard;
