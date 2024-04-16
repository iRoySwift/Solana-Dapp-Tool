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

const routes: iRoute[] = [
    {
        id: "tutorial",
        title: "Tutorial",
        group: "Tutorial",
        icon: <Squares2X2Icon />,
        children: [
            {
                id: "baseTransfer",
                title: "Base Transfer",
                url: "/tutorial/baseTransfer",
            },
        ],
    },
];

export { routes };
