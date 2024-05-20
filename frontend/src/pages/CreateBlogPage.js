import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from '@mui/material';
import axios from 'axios';

export const CreateBlogPage = () => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = { title, content, author: user.username };
    await axios.post('http://localhost:5000/blog/create', newBlog, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    navigate('/blogs'); // Redirect to the blogs page or another page after creating the blog
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper
        sx={{
          mt: 8,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Welcome {user.username}, create a blog
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="content"
            label="Content"
            name="content"
            multiline
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, bgcolor: 'black' }}
          >
            Post
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateBlogPage;
