import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

const BaseLayout = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar fixa à esquerda */}
      <Sidebar />

      {/* Container do conteúdo principal */}
      <div className="flex flex-col flex-1">
        {/* Header no topo */}
        <Header />

        {/* Conteúdo dinâmico (Outlet do React Router) */}
        <main className="flex-1 p-6 bg-white-300 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export { BaseLayout };
