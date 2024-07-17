import { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeDashboard from './employeedashboard';
const ApplicationForm = () => {
  const userId = '6667fea5d9a3fda217f787ea';
  const jobId = '66758dc74d3c9042ebedb368';
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("userId:", userId); // Debug log
    console.log("jobId:", jobId);   // Debug log

    if (!userId || !jobId) {
      setError('User ID and Job ID must be provided');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('jobId', jobId);
    formData.append('coverLetter', coverLetter);
    if (resume) {
      formData.append('resume', resume);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.post('http://localhost:3001/applications', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        
      });

      toast.success('Application submitted successfully!');
      setError('');
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '5rem' }}>
        <EmployeeDashboard/>
      <Typography variant="h4" gutterBottom>
      <ToastContainer />

        Submit Job Application
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Cover Letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          fullWidth
          margin="normal"
          required
          multiline
          rows={4}
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          required
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
          Submit Application
        </Button>
      </form>
    </Container>
  );
};

ApplicationForm.propTypes = {
  userId: PropTypes.string.isRequired,
  jobId: PropTypes.string.isRequired,
};

export default ApplicationForm;