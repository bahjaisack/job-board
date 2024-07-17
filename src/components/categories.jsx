// Jobs.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, Button, Box } from '@mui/material';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        console.log('Token:', token);

        const response = await axios.get('http://localhost:3001/jobs', { // Ensure this matches your backend route
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error.response || error.message || error);
        setError(error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (job) => {
    const userEmail = 'employee@example.com'; // Replace with the actual employee's email
    const mailtoLink = `mailto:${job.employerEmail}?subject=Job Application for ${job.title}&body=Dear ${job.employerName},%0D%0A%0D%0A I am interested in applying for the position of ${job.title}. Please find my resume attached.%0D%0A%0D%0A Regards,%0D%0A ${userEmail}`;

    window.location.href = mailtoLink;
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message || error}</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '5rem' }}>
      <Typography variant="h4" gutterBottom>
        Available Jobs
      </Typography>
      {jobs.map((job) => (
        <Paper key={job._id} elevation={3} style={{ padding: '1rem', marginBottom: '1rem' }}>
          <Typography variant="h6">{job.title}</Typography>
          <Typography>{job.description}</Typography>
          <Typography>Employer: {job.employerName}</Typography>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={() => handleApply(job)}>
              Apply
            </Button>
          </Box>
        </Paper>
      ))}
    </Container>
  );
};

export default Jobs;
