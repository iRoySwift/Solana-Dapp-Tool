import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import Loadable from "@/components/Loadable";

import MainLayout from "@/layout/MainLayout";
const Airdrop = Loadable(lazy(() => import("@/pages/Airdrop")));
const DashBoard = Loadable(lazy(() => import("@/pages/dashboard")));
const Colors = Loadable(
    lazy(() => import("@/pages/OverviewComponents/Colors"))
);
const Typography = Loadable(
    lazy(() => import("@/pages/OverviewComponents/Typography"))
);
const MuiIcon = Loadable(
    lazy(() => import("@/pages/OverviewComponents/MuiIcon"))
);

const MainRoute: RouteObject = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <DashBoard />,
        },
        {
            path: "airdrop",
            element: <Airdrop />,
        },
        {
            path: "typography",
            element: <Typography />,
        },
        {
            path: "color",
            element: <Colors />,
        },
        {
            path: "MuiIcon",
            element: <MuiIcon />,
        },
    ],
};
export default MainRoute;
