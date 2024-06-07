import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CommentCard({ comment, isAuthenticated }) {
  if (!comment) {
    return null; // Return null if comment is undefined or null
  }

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', marginBottom: 2 }}>
      <Paper elevation={2} sx={{ padding: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ marginRight: 1 }}>{comment.userInitial}</Avatar>
            <span>{comment.userName}</span>
          </Box>
          {isAuthenticated && (
            <Button variant="text" color="secondary" size="small">Denunciar</Button>
          )}
        </Box>
        <Box sx={{ marginTop: 1 }}>
          <Typography variant="body2">
            {comment.message}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
