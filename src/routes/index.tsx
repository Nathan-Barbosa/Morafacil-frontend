import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ConfirmedEmail, ForgotPassword, Home, Login, Register, Users } from '../views';
import { BaseLayout } from '../layout';
import { ProtectedRoute } from '../components';

const routes = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgotPassword',
    element: <ForgotPassword />,
  },
  {
    path: '/emailConfirmed',
    element: <ConfirmedEmail />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <BaseLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'users',
            element: <Users />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export { routes };
