import { SignOut } from "@phosphor-icons/react";
import { usePostLogoutMutation } from "../../services";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers";

const Header = () => {
  const navigate = useNavigate();

  const { mutate } = usePostLogoutMutation(navigate);
  const { user } = useAuth();

  const handleLogout = () => {
    mutate();
  };

  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between w-full">
      <h1 className="text-lg font-bold text-gray-700">
        Olá, {user?.name?.split(" ")[0]}
      </h1>

      <div className="flex items-center gap-4">
      
        {/* <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all">
          <Bell size={24} weight="bold" />
        </button>
        <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all">
          <User size={24} weight="bold" />
        </button> */}
        <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all">
          <SignOut size={24} weight="bold" onClick={handleLogout} />
        </button>
      </div>
    </header>
  );
};

export { Header };
