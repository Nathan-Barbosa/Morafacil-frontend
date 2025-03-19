import { Bell,User,SignOut } from "@phosphor-icons/react"

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between w-full">
      <h1 className="text-lg font-bold text-gray-700">CRM Dashboard</h1>

      {/* Área de Perfil e Notificações */}
      <div className="flex items-center gap-4">
        <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all">
          <Bell size={24} weight="bold" />
        </button>
        <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all">
          <User size={24} weight="bold" />
        </button>
        <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all">
          <SignOut size={24} weight="bold" />
        </button>
      </div>
    </header>
  );
};

export { Header };
