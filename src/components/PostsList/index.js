// src/components/PostsList.js
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import PostCard from '../PostCard';

const PostsList = ({ posts, onLike, onDislike, onComment }) => {
  return (
    <Box sx={{ padding: 2 }}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          description={post.subject}
          date={post.createdAt}
          authorName={post.authorName}
          authorImage={post.authorImage}
          keywords={post.keywords || []}
          commentsCount={post.commentsCount || 0}
          likes={post.likes || 0}
          dislikes={post.dislikes || 0}
          onLike={() => onLike(post.id)}
          onDislike={() => onDislike(post.id)}
          onComment={() => onComment(post.id)}
        />
      ))}
    </Box>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      authorName: PropTypes.string,
      authorImage: PropTypes.string,
      keywords: PropTypes.arrayOf(PropTypes.string),
      commentsCount: PropTypes.number,
      likes: PropTypes.number,
      dislikes: PropTypes.number,
    })
  ).isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired,
};

export default PostsList;
