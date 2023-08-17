import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const MinimalLayout = lazy(() => import("@/layout/MinimalLayout"));
const Login = lazy(() => import("@/pages/Authentication/Login"));
const Register = lazy(() => import("@/pages/Authentication/Register"));

const LoginRoutes: RouteObject = {
    path: "/",
    element: <MinimalLayout />,
    children: [
        {
            path: "register",
            element: <Register />,
        },
        {
            path: "login",
            element: <Login />,
        },
    ],
};

export default LoginRoutes;
