import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Link,
  CssBaseline,
} from '@mui/material';
import background from '../assets/loginbackground.png';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/');
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={6}
          style={{
            padding: '20px',
            backgroundSize: 'cover',
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 2 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, bgcolor: 'black' }}
              >
                Login
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="body2">
                    {"Don't have an account? "}
                    <Link
                      component={RouterLink}
                      to="/signup"
                      variant="body2"
                      sx={{ fontWeight: 'bold', textDecoration: 'underline' }}
                    >
                      Sign up
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
