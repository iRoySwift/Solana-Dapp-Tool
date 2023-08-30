import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import Loadable from "@/components/Loadable";

import MainLayout from "@/layout/MainLayout";

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
const Tutorial = Loadable(lazy(() => import("@/pages/Tutorial")));
const BaseTransfer = Loadable(
    lazy(() => import("@/pages/Tutorial/BaseTransfer"))
);
const WalletAdapter = Loadable(
    lazy(() => import("@/pages/Tutorial/WalletAdapter"))
);
const AirdropToken = Loadable(lazy(() => import("@/pages/AirdropToken")));
const ContractCall = Loadable(
    lazy(() => import("@/pages/Tutorial/ContractCall"))
);
const BaseTokenAirdrop = Loadable(
    lazy(() => import("@/pages/Tutorial/BaseTokenAirdrop"))
);
const MintToken = Loadable(lazy(() => import("@/pages/Tutorial/MintToken")));

const TransferToken = Loadable(
    lazy(() => import("@/pages/Tutorial/TransferToken"))
);

const MainRoute: RouteObject = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            index: true,
            element: <DashBoard />,
        },
        {
            path: "airdropToken",
            element: <AirdropToken />,
        },
        {
            path: "tutorial",
            element: <Tutorial />,
            children: [
                {
                    path: "baseTransfer",
                    element: <BaseTransfer />,
                },
                {
                    path: "walletAdapter",
                    element: <WalletAdapter />,
                },
                {
                    path: "contractCall",
                    element: <ContractCall />,
                },
                {
                    path: "mintToken",
                    element: <MintToken />,
                },
                {
                    path: "baseTokenAirdrop",
                    element: <BaseTokenAirdrop />,
                },
                {
                    path: "transferToken",
                    element: <TransferToken />,
                },
            ],
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
