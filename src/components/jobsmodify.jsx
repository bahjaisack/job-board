import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CardActions, Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmployeeDashboard from './employeedashboard';
// import JobForm from './ApplicationStatus';
const Jobsmody = () => {
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

  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://localhost:3001/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted job from the state
      setJobs(jobs.filter(job => job._id !== jobId));
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    }
  };

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
          <Typography variant="h4" gutterBottom>

          <Button
                      size="small"
                      sx={{ color: 'white', backgroundColor: '#1976d2' }}
                      onClick={() => navigate("/jobpost")}
                    >
                      Add
                    </Button>
        </Typography>

        <Typography variant="h4" gutterBottom>
        </Typography>
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ color: 'black' }}>
                    {job.job_title}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ color: 'black' }}>
                    {job.discription}
                  </Typography>  <Typography variant="h5" component="div" sx={{ color: 'black' }}>
                    {job.requirements}
                  </Typography>  <Typography variant="h5" component="div" sx={{ color: 'black' }}>
                    {job.location}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ color: 'black' }}>
                    {job.salary}
                  </Typography>  <Typography variant="h5" component="div" sx={{ color: 'black' }}>
                    {job.type}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ color: 'black' }}>
                    {job.employer_company_name}
                  </Typography> 
                   <Typography variant="h5" component="div" sx={{ color: 'black' }}>
                    {job.employer_website}
                  </Typography>  
                  {/* Other job details here */}
                </CardContent>
                <CardActions>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  
                    <Button
                      size="small"
                      sx={{ color: 'white', backgroundColor: '#d32f2f' }}
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
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

export default Jobsmody;
