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
import background from '../assets/createblogbackground.png';

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
    navigate('/'); // Redirect to the blogs page or another page after creating the blog
  };

  const handleHomepageClick = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Paper
          sx={{
            mt: 8,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent background
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
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
              sx={{ backgroundColor: 'white' }}
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
              sx={{ backgroundColor: 'white' }}
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, bgcolor: 'black' }}
              onClick={handleHomepageClick}
            >
              Back to Homepage
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateBlogPage;
