import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userEmail: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', formData);
      const { token } = response.data;

      // Store the token and user information in local storage
      localStorage.setItem('token', token);

      // Navigate to the account page
      navigate('/employee');

      toast.success("Successfully logged in");
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      toast.error("Failed to login");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '5rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="userEmail"
            variant="outlined"
            value={formData.userEmail}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
          />
          <Box mt={2}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Box>
        </form>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography variant="body2">
            <NavLink to="/register">Register</NavLink>
          </Typography>
          <Typography variant="body2">
            <NavLink to="/reset">Reset</NavLink>
          </Typography>
        </Box>
      </Paper>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
}

export default Login;
