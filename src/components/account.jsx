import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Box } from '@mui/material';
import EmployeeDashboard from './employeedashboard';

const Account= () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:3001/user-info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserInfo(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '5rem' }}>
      <EmployeeDashboard/>
      <Paper elevation={3} style={{ padding: '1rem' }}>
        <Typography variant="h4" gutterBottom>
          User Information
        </Typography>
        <Box>
          <Typography variant="body1"><strong>Name:</strong> {userInfo.name}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {userInfo.email}</Typography>
          <Typography variant="body1"><strong>Role:</strong> {userInfo.role}</Typography>
          {/* Add more fields as needed */}
        </Box>
      </Paper>
    </Container>
  );
};

export default Account;
