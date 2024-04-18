import { Squares2X2Icon } from "@heroicons/react/16/solid";
import { ReactNode } from "react";

export type iRoute = {
    id: string;
    label: string;
    route: string;
    icon?: ReactNode;
    children?: iRoute[];
};

const sidebarLinks: iRoute[] = [
    {
        id: "home",
        label: "Home",
        route: "/",
        icon: <Squares2X2Icon />,
    },
    {
        id: "dashboard",
        label: "Dashboard",
        route: "/dashboard",
        icon: <Squares2X2Icon />,
    },
];

export { sidebarLinks };