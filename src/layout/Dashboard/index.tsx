import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { DashboardAppBar } from '../index';
import { AuthGuard } from 'utils';

const DashboardLayout = () => {
  return (
    <AuthGuard>
      <DashboardAppBar />
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Outlet />
      </Box>
    </AuthGuard>
  );
}

export default DashboardLayout;