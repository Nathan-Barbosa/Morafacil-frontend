import { NavLink } from 'react-router-dom';
import { useAuth } from '../../providers';
import { UserCircle } from '@phosphor-icons/react';
const Sidebar = () => {
  const { user } = useAuth();

  const roles = user?.roles;

  return (
    <aside className="bg-blue-900 text-white w-64 h-screen p-6">
      <h2 className="text-xl font-bold h-10 flex justify-center">MoraFacil</h2>

      <h4 className="text-xs font-bold h-10 flex justify-center">{roles ?? ''}</h4>

      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block p-3 rounded-md ${isActive ? 'bg-blue-700' : 'hover:bg-blue-800'}`
              }
            >
              🏠 Dashboard
            </NavLink>
          </li>
          {roles?.find((r) => r === 'Admin') && (
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `block p-3 rounded-md ${isActive ? 'bg-blue-700' : 'hover:bg-blue-800'}`
                }
              >
                <div className="flex gap-2 items-center">
                  <UserCircle size={16} /> Usuários
                </div>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export { Sidebar };
