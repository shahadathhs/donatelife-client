import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Dashboard from "../layouts/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import Funding from "../pages/private/Funding";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/funding",
        element: <PrivateRoutes><Funding /> </PrivateRoutes>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes><Dashboard /> </PrivateRoutes>,
    errorElement: <ErrorPage />,
    children: [
      
    ]
  }
]);