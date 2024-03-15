import { Squares2X2Icon } from "@heroicons/react/16/solid";
import { ReactNode } from "react";

export type iRoute = {
    id: string;
    title: string;
    icon?: ReactNode;
    group?: string;
    url?: string;
    children?: iRoute[];
};

const dashboard: iRoute[] = [
    {
        id: "navigation",
        title: "Navigation",
        group: "Navigation",
        icon: <Squares2X2Icon />,
        children: [
            {
                id: "home",
                title: "Home",
                url: "/",
            },
            {
                id: "dashboard",
                title: "Dashboard",
                url: "/dashboard",
            },
        ],
    },
    {
        id: "nextjs",
        title: "NextJS",
        group: "NextJS",
        icon: <Squares2X2Icon />,
        children: [
            {
                id: "intercepting",
                title: "Intercepting Route",
                url: "/photos",
            },
        ],
    },
    {
        id: "navigation3",
        title: "Navigation",
        group: "Navigation",
        icon: <Squares2X2Icon />,
        children: [
            {
                id: "home3",
                title: "Home",
                url: "/3",
            },
            {
                id: "dashboard3",
                title: "Dashboard",
                url: "/dashboard3",
            },
        ],
    },
];

export { dashboard };
