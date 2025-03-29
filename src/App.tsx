import { RouterProvider } from "react-router-dom";

import "./styles/tailwind.css";
import { routes } from "./routes";
import { ReactQueryProvider } from "./providers";
import { ToastProvider } from "./providers/ToastProvider";

function App() {
  return (
    <ToastProvider duration={import.meta.env.VITE_TOAST_DURATION}>
      <ReactQueryProvider>
        <RouterProvider router={routes} />
      </ReactQueryProvider>
    </ToastProvider>
  );
}

export { App };
