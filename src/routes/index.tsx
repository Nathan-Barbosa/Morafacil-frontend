// src/routes.tsx

import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  Condominium,
  ConfirmedEmail,
  Fines,
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
import { ROUTES } from "../constants";

const routes = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: ROUTES.EMAIL_CONFIRMED,
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
        path: ROUTES.HOME,
        element: <BaseLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: ROUTES.USERS,
            element: <Users />,
          },
          {
            path: ROUTES.CONDOMINIUM,
            element: <Condominium />,
          },
          {
            path: ROUTES.RESIDENCE,
            element: <Residence />,
          },
          {
            path: ROUTES.NOTICE_BOARD,
            element: <NoticeBoard />,
          },
          {
            path: ROUTES.PARCELS,
            element: <Parcels />,
          },
          {
            path: ROUTES.VOTING_BOARD,
            element: <VotingBoard />,
          },
          {
            path: ROUTES.FINES,
            element: <Fines />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.HOME} replace />,
  },
]);

export { routes };
