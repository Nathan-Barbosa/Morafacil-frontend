import { RouterProvider } from 'react-router-dom';

import './styles/tailwind.css';
import { routes } from './routes';

function App() {
  return <RouterProvider router={routes} />;
}

export { App };
