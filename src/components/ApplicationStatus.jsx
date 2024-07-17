import { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeDashboard from './employeedashboard';
const JobForm = () => {
  const [jobData, setJobData] = useState({
    job_title: '',
    discription: '',
    requirements: '',
    location: '',
    salary: '',
    type: '',
    employer_company_name: '',
    employer_website: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Decode the token to get the employerId (if your token contains user data)
      
      const employerId = "66692d55b963a9be4b876ea0" // Assuming the token contains user data

      const jobDataWithEmployerId = { ...jobData, employerId };

      await axios.post('http://localhost:3001/job', jobDataWithEmployerId, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      toast.success('Job posted successfully!');
      setJobData({
        job_title: '',
        discription: '',
        requirements: '',
        location: '',
        salary: '',
        type: '',
        employer_company_name: '',
        employer_website: '',
      });
      setError('');
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      toast.error('Error posting job: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '5rem' }}>
        <EmployeeDashboard/>
      <Typography variant="h4" gutterBottom>
        Post a Job
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Job Title"
          name="job_title"
          value={jobData.job_title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="discription"
          value={jobData.discription}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          multiline
          rows={4}
        />
        <TextField
          label="Requirements"
          name="requirements"
          value={jobData.requirements}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Location"
          name="location"
          value={jobData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Salary"
          name="salary"
          value={jobData.salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Job Type"
          name="type"
          value={jobData.type}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Employer Company Name"
          name="employer_company_name"
          value={jobData.employer_company_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Employer Website"
          name="employer_website"
          value={jobData.employer_website}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
          Post Job
        </Button>
      </form>
    </Container>
  );
};

export default JobForm;
