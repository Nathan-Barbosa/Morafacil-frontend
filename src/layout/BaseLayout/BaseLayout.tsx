import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

const BaseLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Sidebar /> {/* Agora no topo */}
      <div className="flex w-full flex-1">
        <Header /> {/* Agora na lateral */}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export { BaseLayout };
