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
import { PendingApproval } from "../views/PendingApproval/PendingApproval";
import { PageTransition } from "../components/ui/pageTransition";


const routes = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: (
      <PageTransition>
        <Login />
      </PageTransition>
    ),
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <PageTransition>
        <Register />
      </PageTransition>
    ),
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: (
      <PageTransition>
        <ForgotPassword />
      </PageTransition>
    ),
  },
  {
    path: ROUTES.EMAIL_CONFIRMED,
    element: (
      <PageTransition>
        <ConfirmedEmail />
      </PageTransition>
    ),
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
          {
            path: ROUTES.PENDING_APPROVAL,
            element: <PendingApproval />,
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
