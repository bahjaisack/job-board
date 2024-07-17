import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, CssBaseline } from '@mui/material';
import { Dashboard as DashboardIcon, Work as WorkIcon, AccountCircle as AccountCircleIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';

const EmployeeDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#1976d2', // Blue background color
            boxSizing: 'border-box',
          },
        }}
      >
        <Typography variant="h6" component="h1" sx={{ color: '#fff', textAlign: 'center', my: 2 }}>
          Job Board
        </Typography>
        <List>
          <ListItem button component={NavLink} to="/dashboard2" activeClassName="active">
            <ListItemIcon sx={{ color: '#fff' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem button component={NavLink} to="/jobs" activeClassName="active">
            <ListItemIcon sx={{ color: '#fff' }}>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Jobs" sx={{ color: '#fff' }} />
          </ListItem>
        
          <ListItem button component={NavLink} to="/applicationstatus" activeClassName="active">
            <ListItemIcon sx={{ color: '#fff' }}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem button component={NavLink} to="/logout" activeClassName="active">
            <ListItemIcon sx={{ color: '#fff' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: '#fff' }} />
          </ListItem>
        </List>
      </Drawer>
      
    </Box>
  );
};

export default EmployeeDashboard;
