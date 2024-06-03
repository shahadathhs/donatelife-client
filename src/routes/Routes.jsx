import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import PrivateRoutes from "./PrivateRoutes";
import Funding from "../pages/private/Funding";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Search from './../pages/public/Search';
import DonationRequest from './../pages/public/DonationRequest';
import Blogs from "../pages/public/Blogs";
import RequestDetails from "../pages/private/RequestDetails";
import MyDonationRequest from "../pages/dashboard/doner/MyDonationRequest";
import CreateDonationRequest from './../pages/dashboard/doner/CreateDonationRequest';
import AllUsers from "../pages/dashboard/admin/AllUsers";
import AllDonationRequest from "../pages/dashboard/AllDonationRequest";
import ContentManagement from "../pages/dashboard/ContentManagement";
import DashboardProfile from "../pages/dashboard/DashboardProfile";
import AdminRoute from "./AdminRoute";
import AdminVolunteerRoute from "./AdminVolunteerRoute";
import AddBlogs from "../pages/dashboard/AddBlogs";
import BlogDetails from "../pages/public/BlogDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      // public
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
        path: "/search",
        element: <Search />,
      },
      {
        path: "/donationRequests",
        element: <DonationRequest />,
      },
      {
        path: "/blogs",
        element: <Blogs />
      },
      {
        path: "/blogsDetails/:id",
        element: <BlogDetails />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/blogs/${params.id}`)
      },
      // private
      {
        path: "/requestDetails/:id",
        element: <PrivateRoutes><RequestDetails /> </PrivateRoutes>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/donationRequests/${params.id}`)
      },
      {
        path: "/funding",
        element: <PrivateRoutes><Funding /> </PrivateRoutes>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes><DashboardLayout /> </PrivateRoutes>,
    errorElement: <ErrorPage />,
    children: [
      // for all
      {
        path: "/dashboard",
        element: <PrivateRoutes><Dashboard /> </PrivateRoutes>,
      },
      {
        path: "/dashboard/profile",
        element: <PrivateRoutes><DashboardProfile /> </PrivateRoutes>,
      },
      // for donor
      {
        path: "/dashboard/my-donation-requests",
        element: <PrivateRoutes><MyDonationRequest /> </PrivateRoutes>,
      },
      {
        path: "/dashboard/create-donation-request",
        element: <PrivateRoutes><CreateDonationRequest /> </PrivateRoutes>,
      },
      // for admin
      {
        path: "/dashboard/all-users",
        element: <AdminRoute><AllUsers /> </AdminRoute>,
      },
      // for admin and volunteer
      {
        path: "/dashboard/all-blood-donation-request",
        element: <AdminVolunteerRoute><AllDonationRequest /> </AdminVolunteerRoute>,
      },
      {
        path: "/dashboard/content-management",
        element: <AdminVolunteerRoute><ContentManagement /> </AdminVolunteerRoute>,
      },
      {
        path: "/dashboard/content-management/add-blog",
        element: <AdminVolunteerRoute><AddBlogs /> </AdminVolunteerRoute>,
      }
    ]
  }
]);