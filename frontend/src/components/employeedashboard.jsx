
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, CssBaseline } from '@mui/material';
import { Dashboard as DashboardIcon, Work as WorkIcon, History as HistoryIcon, AccountCircle as AccountCircleIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
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
          <ListItem button component={NavLink} to="/dashboard" activeClassName="active">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={NavLink} to="/jobs" activeClassName="active">
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Jobs" />
          </ListItem>
          <ListItem button component={NavLink} to="/history" activeClassName="active">
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
          <ListItem button component={NavLink} to="/account" activeClassName="active">
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem button component={NavLink} to="/logout" activeClassName="active">
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Typography paragraph>
          Main content goes here.
        </Typography>
      </Box>
    </Box>
  );
};

export default EmployeeDashboard;
