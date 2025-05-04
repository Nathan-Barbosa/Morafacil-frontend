import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../providers";
import {
  UserCircle,
  House,
  HouseSimple,
  List,
  NotePencil,
  Package,
  MicrosoftOutlookLogo,
  CaretLeft,
  FileText,
} from "@phosphor-icons/react";
import imglogo from "../../assets/logo-morar-facil-branco.png";
import { ROUTES } from "../../constants/paths";

const navItems = [
  {
    to: ROUTES.USERS,
    label: "Usuários",
    icon: <UserCircle size={20} />,
    roles: ["Admin"],
  },
  {
    to: ROUTES.CONDOMINIUM,
    label: "Condomínios",
    icon: <House size={20} />,
    roles: ["Admin"],
  },
  {
    to: ROUTES.RESIDENCE,
    label: "Residências",
    icon: <HouseSimple size={20} />,
    roles: ["Admin"],
  },
  {
    to: ROUTES.NOTICE_BOARD,
    label: "Avisos",
    icon: <NotePencil size={20} />,
    roles: ["Admin", "Usuario"],
  },
  {
    to: ROUTES.VOTING_BOARD,
    label: "Votação",
    icon: <MicrosoftOutlookLogo size={20} />,
    roles: ["Admin"],
  },
  {
    to: ROUTES.PARCELS,
    label: "Encomendas",
    icon: <Package size={20} />,
    roles: ["Admin","Porteiro", "Morador"],
  },
  {
    to: ROUTES.FINES,
    label: "Multas",
    icon: <FileText size={20} />,
    roles: ["Admin"],
  },
];

const Sidebar = () => {
  const { user } = useAuth();
  const roles = user?.roles ?? [];
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside
      className={`bg-blue-900 text-white h-screen p-4 transition-all duration-300 ${
        isOpen ? "w-60" : "w-20"
      }`}
    >
      <div className={`flex ${isOpen ? "justify-end" : "justify-center"} mb-4`}>
        <button onClick={toggleSidebar} className="text-white hover:text-blue-300 transition">
          {isOpen ? <CaretLeft size={24} /> : <List size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="flex justify-center mb-4">
          <img src={imglogo} alt="Logo Morar Fácil" className="h-20 w-auto" />
        </div>
      )}

      {isOpen && (
        <div className="text-center mb-6">
          <span className="text-xs font-bold">{roles.join(", ")}</span>
        </div>
      )}

      <nav>
        <ul className="flex flex-col gap-2">
          {navItems.map(({ to, label, icon, roles: itemRoles }) =>
            itemRoles.some((role) => roles.includes(role)) ? (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `block p-2 rounded ${isActive ? "bg-blue-700" : "hover:bg-blue-800"}`
                  }
                >
                  <div
                    className={`flex gap-2 items-center ${
                      isOpen ? "justify-start" : "justify-center"
                    }`}
                  >
                    {icon}
                    {isOpen && <span>{label}</span>}
                  </div>
                </NavLink>
              </li>
            ) : null,
          )}
        </ul>
      </nav>
    </aside>
  );
};

export { Sidebar };
