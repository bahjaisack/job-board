import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Alert } from '@mui/material';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3001/reset-password/:${token}`, { password });
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
        Reset Password
      </Typography>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Reset Password
        </Button>
      </form>
    </Container>
  );
};

export default ResetPassword;
