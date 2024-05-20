import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, CssBaseline, Typography, Button, Box } from '@mui/material';
import Blog from '../components/Blog';
import axios from 'axios';

export const HomePage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const handleCreateButtonClick = () => {
    navigate('/create-blog');
  };

  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/blog/getall', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [token]);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          Homepage
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={handleCreateButtonClick}
        >
          Create a New Blog
        </Button>
        <Box sx={{ mt: 4, width: '100%' }}>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Blog
                key={blog.id}
                title={blog.title}
                content={blog.content}
                author={blog.author}
              />
            ))
          ) : (
            <Typography>No blogs available</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
