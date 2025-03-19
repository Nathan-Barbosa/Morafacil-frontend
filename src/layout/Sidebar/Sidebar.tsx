import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-blue-400 w-64 p-4">
      <nav>
        <ul>
          <li className="mb-2">
            <NavLink to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export { Sidebar };
