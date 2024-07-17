import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CardActions, Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmployeeDashboard from './employeedashboard';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:3001/jobs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <EmployeeDashboard />
      <Container maxWidth="md" style={{ marginTop: '5rem' }}>
        <Typography variant="h4" gutterBottom>
          Available Jobs
        </Typography>
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ color: 'black' }}>
                    {job.job_title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    {job.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    Requirements: {job.requirements}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    Location: {job.location}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    Salary: {job.salary}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    Type: {job.type}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    Employer: {job.employer_company_name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    Website: {job.employer_website}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button
                      size="small"
                      sx={{ color: 'white', backgroundColor: '#1976d2' }}
                      onClick={() => navigate(`/apply/${job._id}`)}
                    >
                      Apply
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Jobs;
