import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  Condominium,
  ConfirmedEmail,
  ForgotPassword,
  Home,
  Login,
  NoticeBoard,
  Parcels,
  Register,
  Users,
} from "../views";
import { BaseLayout } from "../layout";
import { ProtectedRoute } from "../components";
import { AuthProvider } from "../providers";
import { Residence } from "../views/Residence";
import { VotingBoard } from "../views/Voting";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/emailConfirmed",
    element: <ConfirmedEmail />,
  },
  {
    element: (
      <AuthProvider>
        <ProtectedRoute />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <BaseLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "condominium",
            element: <Condominium />,
          },
          {
            path: "residence",
            element: <Residence />,
          },
          {
            path: "noticeBoard",
            element: <NoticeBoard />,
          },
          {
            path: "parcels",
            element: <Parcels />,
          },
          {
            path: "votingBoard",
            element: <VotingBoard />,
          },
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
