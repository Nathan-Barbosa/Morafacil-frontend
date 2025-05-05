import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { AnimatePresence } from "framer-motion";

const BaseLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full relative">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 p-6 bg-white-300 overflow-auto relative">
          <AnimatePresence mode="wait" initial={false}>
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export { BaseLayout };
