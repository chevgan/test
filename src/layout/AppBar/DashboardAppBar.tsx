import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAuth } from 'hooks';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const DashboardAppBar = () => {
  const { logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Button startIcon={<DashboardIcon />} component={Link} to="/dashboard" color="inherit">
            Dashboard
          </Button>
          <Button startIcon={<ReportGmailerrorredIcon />} component={Link} to="/report-page" color="inherit">
            Reports
          </Button>
        </Box>
        <Button endIcon={<LoginIcon />} onClick={logout} color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default DashboardAppBar;
