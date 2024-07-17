import { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Alert } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/forgot-password', { userEmail: email });
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      setMessage('');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '5rem' }}>
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Send Reset Link
        </Button>
      </form>
    </Container>
  );
};

export default ForgotPassword;
