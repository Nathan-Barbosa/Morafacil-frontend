import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Home, Login, Register } from '../views';
import { BaseLayout } from '../layout';
import { ProtectedRoute } from './ProtectedRoute';

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
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <BaseLayout />,
        children: [
          {
            index: true,
            element: <Home />,
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
