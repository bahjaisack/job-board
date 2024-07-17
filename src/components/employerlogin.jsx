import { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography,Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', credentials);
      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Check user role and redirect
      if (user.role === 'admin') {
        navigate('/employer-dashboard');
      } else {
        navigate('/employee-dashboard');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      toast.error('Login failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '5rem' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <Button
            size="small"
            sx={{ color: 'white', backgroundColor: '#1976d2' }}
            onClick={() => navigate("/forgot-password")}
          >
            Forget Password
          </Button>
        </Box>

      </form>
    </Container>
  );
};

export default Login;
