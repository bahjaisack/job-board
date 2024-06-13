
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === 'employer') {
      navigate('/register-employer');
    } else {
      navigate('/register-employee');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Choose Your Role</Typography>
        <Button variant="contained" color="primary" onClick={() => handleRoleSelection('employer')} sx={{ m: 2 }}>
          Employer
        </Button>
        <Button variant="contained" color="secondary" onClick={() => handleRoleSelection('employee')} sx={{ m: 2 }}>
          Employee
        </Button>
      </Paper>
    </Box>
  );
};

export default RoleSelection;
