import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home, Login} from "../views";
import { BaseLayout } from "../layout";
import { ProtectedRoute } from "./ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />, // Protege todas as rotas dentro deste grupo
    children: [
      {
        element: <BaseLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          }
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export { routes };
