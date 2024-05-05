import { Squares2X2Icon } from "@heroicons/react/16/solid";
import { ReactNode } from "react";

export type iRoute = {
    id: any;
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
];

export { sidebarLinks };
