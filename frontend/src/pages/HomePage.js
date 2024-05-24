import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, CssBaseline, Typography, Button, Box } from '@mui/material';
import Blog from '../components/Blog';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import background from '../assets/homepagebackground.jpg';

export const HomePage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const { logout } = useContext(AuthContext);

  const handleCreateButtonClick = () => {
    navigate('/create-blog');
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to the login page or any other page after logout
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
        <Box
          sx={{
            mt: 4,
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 1,
            padding: 3,
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateButtonClick}
            >
              Create Blog
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
          <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
            Latest Rattles
          </Typography>
          <Box sx={{ width: '100%' }}>
            {blogs.length > 0 ? (
              blogs
                .slice()
                .reverse()
                .map((blog) => (
                  <Box key={blog.id} sx={{ mb: 2 }}>
                    <Blog
                      title={blog.title}
                      content={blog.content}
                      author={blog.author}
                      sx={{ boxShadow: 3 }}
                    />
                  </Box>
                ))
            ) : (
              <Typography>No blogs available</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
