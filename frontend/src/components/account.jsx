import { useEffect, useState } from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import fetchUserInfo from './fetchuserinfo'

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserInfo();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message || error}</Typography>;
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '5rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Account
        </Typography>
        <Typography variant="h6">Welcome, {user.userName}!</Typography>
        <Typography>Email: {user.userEmail}</Typography>
        <Typography>Profile Name: {user.profile_name}</Typography>
        <Typography>Profile Bio: {user.profile_bio}</Typography>
        <Typography>Contact Phone: {user.profile_contact_phone}</Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={() => navigate('/post-job')}>
            Post Job
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/applicants')} style={{ marginLeft: '1rem' }}>
            View Applicants
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Account;
