import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout, DashboardLayout } from 'layout';
import { Dashboard, Login, ReportPage, ResetPassword } from 'pages';

const Routes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: '/',
          element: <Login />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'reset-password',
          element: <ResetPassword />
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'report-page',
          element: <ReportPage />
        }
      ]
    }
  ]
};

const router = createBrowserRouter([Routes], { basename: '/' });

export default router;
