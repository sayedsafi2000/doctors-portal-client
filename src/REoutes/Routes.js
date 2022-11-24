import { createBrowserRouter } from "react-router-dom";
import AddDoctors from "../DashBoard/AddDoctors/AddDoctors";
import MyAppoinment from "../DashBoard/DashBoard/MyAppoinment";
import Payment from "../DashBoard/DashBoard/Payment";
import ManageDoctor from "../DashBoard/ManageDoctors/ManageDoctor";
import AllUsers from "../Layout/AllUsers";
import DashBoardLayout from "../Layout/DashBoardLayout";
import Main from "../Layout/Main";
import Appoinment from "../Pages/Appoinment/Appoinment";
import Home from "../Pages/Home/Home/Home";
import DisplayError from "../Pages/Home/Home/Shared/DisplayError/DisplayError";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Main></Main>,
        errorElement:<DisplayError></DisplayError>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: "/appoinment",
                element: <Appoinment></Appoinment>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute>
            <DashBoardLayout></DashBoardLayout>
        </PrivateRoute>,
        errorElement:<DisplayError></DisplayError>,
        children: [
            {
                path: "/dashboard",
                element: <MyAppoinment></MyAppoinment>
            },
            {
                path: "/dashboard/allusers",
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: "/dashboard/adddoctor",
                element: <AdminRoute><AddDoctors></AddDoctors></AdminRoute>
            },
            {
                path: "/dashboard/managedoctors",
                element: <AdminRoute><ManageDoctor></ManageDoctor></AdminRoute>
            },
            {
                path: "/dashboard/payment/:id",
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://doctors-portal-server-two-omega.vercel.app/bookings/${params.id}`)
            },

        ]
    }
])
export default router;