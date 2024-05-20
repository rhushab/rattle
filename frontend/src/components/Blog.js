import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const Blog = ({ title, content, author }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
      <Typography variant="h5" component="div" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        by {author}
      </Typography>
      <Typography variant="body1">{content}</Typography>
    </Paper>
  );
};

export default Blog;
