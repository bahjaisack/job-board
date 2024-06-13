import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, CssBaseline, Box } from '@mui/material';
import EmployeeDashboard from './employeedashboard';

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/account', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <EmployeeDashboard />
      <Container maxWidth="lg" style={{ marginTop: '5rem' }}>
        <Paper elevation={3} style={{ padding: '2rem' }}>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography>Error: {error.message}</Typography>}
          {user && (
            <>
              <Typography variant="h4" align="center" gutterBottom>
                Account
              </Typography>
              <Typography variant="h6">
                Welcome, {user.userName}!
              </Typography>
              <Typography>Email: {user.userEmail}</Typography>
              <Typography>Profile Name: {user.profile_name}</Typography>
              <Typography>Profile Bio: {user.profile_bio}</Typography>
              <Typography>Contact Phone: {user.profile_contact_phone}</Typography>
              {/* Add more user activities and details here */}
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default DashboardLayout;
