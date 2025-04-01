import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../providers";
import { UserCircle, House, HouseSimple } from "@phosphor-icons/react";
import { List, X } from "@phosphor-icons/react"; // Ícones de abrir/fechar
import imglogo from "../../assets/logo-morar-facil.png";

const Sidebar = () => {
  const { user } = useAuth();
  const roles = user?.roles;
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside
      className={`bg-blue-900 text-white h-screen p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
        <div className="relative mb-4 h-10">
          {/* Botão sempre à esquerda */}
          <button
            onClick={toggleSidebar}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-white"
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </button>

          {/* Logo centralizada, visível só quando aberto */}
          {isOpen && (
            <div className="flex justify-center">
              <img
                src={imglogo}
                alt="Logo Morar Fácil"
                className="h-20 w-auto mx-auto"
              />
            </div>
          )}
        </div>
        
        {/* retirar esse cara */}
        <div className="flex flex-col items-center mt-10">
            {isOpen && (
            <h4 className="text-xs font-bold h-10 flex justify-center mb-4">
              {roles ?? ""}
            </h4>
          )}
        </div>

      <nav>
        <ul className="space-y-4">
          {roles?.includes("Admin") && (
            <ul className="flex flex-col gap-2">
              <li>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    `block p-2 rounded ${isActive ? "bg-blue-700" : "hover:bg-blue-800"}`
                  }
                >
                  <div className={`flex gap-2 items-center ${isOpen ? "justify-start" : "justify-center"}`}>
                    <UserCircle size={20} />
                    {isOpen && <span>Usuários</span>}
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/condominium"
                  className={({ isActive }) =>
                    `block p-2 rounded ${isActive ? "bg-blue-700" : "hover:bg-blue-800"}`
                  }
                >
                  <div className={`flex gap-2 items-center ${isOpen ? "justify-start" : "justify-center"}`}>
                    <House size={20} />
                    {isOpen && <span>Condomínios</span>}
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/residence"
                  className={({ isActive }) =>
                    `block p-2 rounded ${isActive ? "bg-blue-700" : "hover:bg-blue-800"}`
                  }
                >
                  <div className={`flex gap-2 items-center ${isOpen ? "justify-start" : "justify-center"}`}>
                    <HouseSimple size={20} />
                    {isOpen && <span>Residências</span>}
                  </div>
                </NavLink>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export { Sidebar };
