import { useState,useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import EmployeeDashboard from './employeedashboard';
const History = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleAccept = async (applicationId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.put(`http://localhost:3001/applications/${applicationId}/accept`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update application status locally
      const updatedApplications = applications.map((app) =>
        app._id === applicationId ? { ...app, status: 'accepted' } : app
      );
      setApplications(updatedApplications);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleDecline = async (applicationId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.put(`http://localhost:3001/applications/${applicationId}/decline`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update application status locally
      const declinedApplications = applications.map((app) =>
        app._id === applicationId ? { ...app, status: 'declined' } : app
      );
      setApplications(declinedApplications);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  // Similar logic for handleDecline function

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:3001/applications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '5rem' }}>
      <EmployeeDashboard/>
      <Typography variant="h4" gutterBottom>
        Application Status
      </Typography>
      <List>
        {applications.map((application) => (
          <ListItem key={application._id}>
            <ListItemText
              primary={`Job: ${application.jobId.job_title}`}
              secondary={`Status: ${application.status}`}s
            />
            {application.status === 'waiting' ||'accepted' && (
              <>
                <Button onClick={() => handleAccept(application._id)}>Accept</Button>
                <Button onClick={() => handleDecline(application._id)}>Decline</Button>
                {/* Add a button for declining as well */}
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default History;
