import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-blue-900 text-white w-64 h-screen p-6">
      <h2 className="text-xl font-bold h-10 flex justify-center">MoraFacil</h2>

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
        </ul>
      </nav>
    </aside>
  );
};

export { Sidebar };
