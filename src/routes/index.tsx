import { createBrowserRouter } from 'react-router-dom';
import { Home, Login } from '../views';
import { BaseLayout } from '../layout';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

export { routes };
