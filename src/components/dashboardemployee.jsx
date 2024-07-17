import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import EmployerDashboard from './employerdashboard';
const DashboardEmployee = () => {
  const [jobCount, setJobCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

     

        const jobResponse = await axios.get('http://localhost:3001/jobs/count', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobCount(jobResponse.data.count);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
      <EmployerDashboard/>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
        
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total Jobs
                </Typography>
                <Typography variant="h4" component="div">
                  {jobCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardEmployee;
