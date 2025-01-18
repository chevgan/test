import { Outlet } from 'react-router-dom';
import { GuestGuard } from 'utils';

const AuthLayout = () => {
  return (
    <GuestGuard>
      <Outlet />
    </GuestGuard>
  );
}

export default AuthLayout;
