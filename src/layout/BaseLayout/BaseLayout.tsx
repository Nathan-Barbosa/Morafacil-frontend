import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

const BaseLayout = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 p-6 bg-white-300 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export { BaseLayout };
